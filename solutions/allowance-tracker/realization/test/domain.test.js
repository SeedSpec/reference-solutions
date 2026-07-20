import assert from "node:assert/strict";
import test from "node:test";
import { createAllowanceTracker, DomainError } from "../src/domain.js";

test("guardian to child to approval is one auditable allowance workflow", () => {
  let now = "2026-07-16T15:00:00.000Z";
  const tracker = createAllowanceTracker({ clock: () => now, seedDemo: false });

  const bhore = tracker.createBhore({
    actorId: "guardian-1",
    title: "Sweep the porch",
    instructions: "Sweep all the way to the steps.",
    rewardCents: 500
  });
  const assignment = tracker.createAssignment({
    actorId: "guardian-1",
    bhoreId: bhore.id,
    childId: "child-1",
    dueDate: "2026-07-16"
  });

  tracker.updateBhore({ actorId: "guardian-1", bhoreId: bhore.id, title: "Sweep both porches" });
  assert.equal(tracker.assignments[0].bhoreTitle, "Sweep the porch", "the occurrence retains its snapshot");

  tracker.submitAssignment({ actorId: "child-1", assignmentId: assignment.id });
  assert.equal(tracker.balanceFor("child-1"), 0, "submission creates no earning before approval");
  now = "2026-07-16T16:00:00.000Z";
  const firstApproval = tracker.approveAssignment({ actorId: "guardian-1", assignmentId: assignment.id });
  const retriedApproval = tracker.approveAssignment({ actorId: "guardian-1", assignmentId: assignment.id });

  assert.equal(firstApproval.duplicate, false);
  assert.equal(retriedApproval.duplicate, true);
  assert.equal(firstApproval.transaction.id, retriedApproval.transaction.id);
  assert.equal(tracker.transactions.length, 1, "retrying approval cannot duplicate an earning");
  assert.equal(tracker.balanceFor("child-1"), 500);
  assert.deepEqual(tracker.streakFor("child-1"), {
    current: 1,
    longest: 1,
    qualifyingDays: 1,
    dailyTarget: 1,
    timeZone: "America/Chicago"
  });
});

test("role and ownership boundaries protect household work", () => {
  const tracker = createAllowanceTracker({ seedDemo: false });
  assert.throws(
    () => tracker.createBhore({ actorId: "child-1", title: "Nope", rewardCents: 100 }),
    (error) => error instanceof DomainError && error.code === "FORBIDDEN"
  );

  const secondChild = tracker.addChild({ actorId: "guardian-1", name: "Nora" });
  const bhore = tracker.createBhore({ actorId: "guardian-1", title: "Feed the cat", rewardCents: 100 });
  const assignment = tracker.createAssignment({
    actorId: "guardian-1",
    bhoreId: bhore.id,
    childId: secondChild.id,
    dueDate: "2026-07-16"
  });

  assert.throws(
    () => tracker.submitAssignment({ actorId: "child-1", assignmentId: assignment.id }),
    (error) => error instanceof DomainError && error.code === "FORBIDDEN"
  );
  assert.equal(tracker.stateFor("child-1").assignments.length, 0);
});

test("streaks derive deterministically from distinct approved assignments", () => {
  let now = "2026-07-14T18:00:00.000Z";
  const tracker = createAllowanceTracker({ clock: () => now, seedDemo: false });
  const bhore = tracker.createBhore({ actorId: "guardian-1", title: "Read for twenty minutes", rewardCents: 0 });

  function approveOn(isoDate) {
    now = `${isoDate}T18:00:00.000Z`;
    const assignment = tracker.createAssignment({
      actorId: "guardian-1",
      bhoreId: bhore.id,
      childId: "child-1",
      dueDate: isoDate
    });
    tracker.submitAssignment({ actorId: "child-1", assignmentId: assignment.id });
    tracker.approveAssignment({ actorId: "guardian-1", assignmentId: assignment.id });
  }

  approveOn("2026-07-14");
  approveOn("2026-07-14");
  approveOn("2026-07-15");
  now = "2026-07-16T16:00:00.000Z";
  assert.equal(tracker.streakFor("child-1").current, 2, "an unfinished today does not break yesterday's streak");
  assert.equal(tracker.streakFor("child-1").longest, 2);
  assert.equal(tracker.streakFor("child-1").qualifyingDays, 2, "several assignments produce one qualifying day");

  approveOn("2026-07-17");
  assert.equal(tracker.streakFor("child-1").current, 1);
  assert.equal(tracker.streakFor("child-1").longest, 2);
  assert.equal(tracker.streakFor("child-1").qualifyingDays, 3);
});

test("archived bhores remain recognizable but cannot create assignments", () => {
  const tracker = createAllowanceTracker({ seedDemo: false });
  const bhore = tracker.createBhore({ actorId: "guardian-1", title: "Sort recycling", rewardCents: 125 });
  const assignment = tracker.createAssignment({
    actorId: "guardian-1",
    bhoreId: bhore.id,
    childId: "child-1",
    dueDate: "2026-07-16"
  });
  tracker.archiveBhore({ actorId: "guardian-1", bhoreId: bhore.id });

  assert.equal(tracker.assignments.find((item) => item.id === assignment.id).bhoreTitle, "Sort recycling");
  assert.throws(
    () => tracker.createAssignment({
      actorId: "guardian-1",
      bhoreId: bhore.id,
      childId: "child-1",
      dueDate: "2026-07-17"
    }),
    (error) => error instanceof DomainError && error.code === "BHORE_ARCHIVED"
  );
});
