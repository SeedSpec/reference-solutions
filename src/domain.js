export class DomainError extends Error {
  constructor(message, { code = "INVALID_OPERATION", status = 400 } = {}) {
    super(message);
    this.name = "DomainError";
    this.code = code;
    this.status = status;
  }
}

function requireText(value, field) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new DomainError(`${field} is required`, { code: "INVALID_INPUT" });
  }
  return value.trim();
}

function requireNonNegativeInteger(value, field) {
  if (!Number.isInteger(value) || value < 0) {
    throw new DomainError(`${field} must be a non-negative integer`, { code: "INVALID_INPUT" });
  }
  return value;
}

function copy(value) {
  return structuredClone(value);
}

function localDateKey(value, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date(value));
  const fields = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${fields.year}-${fields.month}-${fields.day}`;
}

function dayOrdinal(key) {
  const [year, month, day] = key.split("-").map(Number);
  return Math.floor(Date.UTC(year, month - 1, day) / 86_400_000);
}

function calculateStreak(assignments, childId, {
  now,
  timeZone,
  dailyTarget,
  includeZeroReward
}) {
  const counts = new Map();
  for (const assignment of assignments) {
    if (assignment.childId !== childId || assignment.state !== "approved" || !assignment.approvedAt) continue;
    if (!includeZeroReward && assignment.approvedAmountCents === 0) continue;
    const key = localDateKey(assignment.approvedAt, timeZone);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const qualifying = [...counts.entries()]
    .filter(([, count]) => count >= dailyTarget)
    .map(([key]) => dayOrdinal(key))
    .sort((left, right) => left - right);
  const days = new Set(qualifying);

  let longest = 0;
  let run = 0;
  let previous = null;
  for (const day of qualifying) {
    run = previous !== null && day === previous + 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
    previous = day;
  }

  const today = dayOrdinal(localDateKey(now, timeZone));
  let cursor = days.has(today) ? today : days.has(today - 1) ? today - 1 : null;
  let current = 0;
  while (cursor !== null && days.has(cursor)) {
    current += 1;
    cursor -= 1;
  }

  return {
    current,
    longest,
    qualifyingDays: qualifying.length,
    dailyTarget,
    timeZone
  };
}

export class AllowanceTracker {
  constructor({
    clock = () => new Date(),
    timeZone = "America/Chicago",
    dailyTarget = 1,
    includeZeroReward = true,
    seedDemo = true
  } = {}) {
    this.clock = clock;
    this.configuration = {
      approvalRequired: true,
      currencyCode: "USD",
      currencyName: "dollars",
      decimalPlaces: 2,
      timeZone,
      dailyTarget,
      includeZeroReward
    };
    this.household = {
      id: "household-1",
      name: "The SeedSpec Household",
      timeZone
    };
    this.actors = [
      { id: "guardian-1", householdId: this.household.id, name: "Alex", role: "guardian", state: "active" },
      { id: "child-1", householdId: this.household.id, name: "Mia", role: "child", state: "active" }
    ];
    this.bhores = [];
    this.assignments = [];
    this.transactions = [];
    this.counters = { actor: 2, bhore: 1, assignment: 1, transaction: 1 };

    if (seedDemo) {
      const bhore = this.createBhore({
        actorId: "guardian-1",
        title: "Clear the dinner table",
        instructions: "Bring dishes to the sink and wipe the table.",
        rewardCents: 250
      });
      this.createAssignment({
        actorId: "guardian-1",
        bhoreId: bhore.id,
        childId: "child-1",
        dueDate: localDateKey(this.clock(), timeZone)
      });
    }
  }

  nowIso() {
    return new Date(this.clock()).toISOString();
  }

  actor(actorId) {
    const actor = this.actors.find((item) => item.id === actorId && item.state === "active");
    if (!actor) throw new DomainError("Active actor not found", { code: "ACTOR_NOT_FOUND", status: 404 });
    return actor;
  }

  requireGuardian(actorId) {
    const actor = this.actor(actorId);
    if (actor.role !== "guardian") {
      throw new DomainError("A guardian is required for this action", { code: "FORBIDDEN", status: 403 });
    }
    return actor;
  }

  child(childId) {
    const child = this.actors.find((actor) => actor.id === childId && actor.role === "child" && actor.state === "active");
    if (!child) throw new DomainError("Active child not found", { code: "CHILD_NOT_FOUND", status: 404 });
    return child;
  }

  addChild({ actorId, name }) {
    this.requireGuardian(actorId);
    const child = {
      id: `child-${this.counters.actor++}`,
      householdId: this.household.id,
      name: requireText(name, "name"),
      role: "child",
      state: "active"
    };
    this.actors.push(child);
    return copy(child);
  }

  createBhore({ actorId, title, instructions = "", rewardCents }) {
    this.requireGuardian(actorId);
    const bhore = {
      id: `bhore-${this.counters.bhore++}`,
      householdId: this.household.id,
      title: requireText(title, "title"),
      instructions: typeof instructions === "string" ? instructions.trim() : "",
      rewardCents: requireNonNegativeInteger(rewardCents, "rewardCents"),
      state: "active",
      createdAt: this.nowIso(),
      updatedAt: this.nowIso()
    };
    this.bhores.push(bhore);
    return copy(bhore);
  }

  updateBhore({ actorId, bhoreId, title, instructions, rewardCents }) {
    this.requireGuardian(actorId);
    const bhore = this.bhores.find((item) => item.id === bhoreId);
    if (!bhore) throw new DomainError("Bhore not found", { code: "BHORE_NOT_FOUND", status: 404 });
    if (bhore.state !== "active") throw new DomainError("Archived bhores cannot be edited", { code: "BHORE_ARCHIVED" });
    if (title !== undefined) bhore.title = requireText(title, "title");
    if (instructions !== undefined) bhore.instructions = typeof instructions === "string" ? instructions.trim() : "";
    if (rewardCents !== undefined) bhore.rewardCents = requireNonNegativeInteger(rewardCents, "rewardCents");
    bhore.updatedAt = this.nowIso();
    return copy(bhore);
  }

  archiveBhore({ actorId, bhoreId }) {
    this.requireGuardian(actorId);
    const bhore = this.bhores.find((item) => item.id === bhoreId);
    if (!bhore) throw new DomainError("Bhore not found", { code: "BHORE_NOT_FOUND", status: 404 });
    bhore.state = "archived";
    bhore.updatedAt = this.nowIso();
    return copy(bhore);
  }

  createAssignment({ actorId, bhoreId, childId, dueDate }) {
    this.requireGuardian(actorId);
    const child = this.child(childId);
    const bhore = this.bhores.find((item) => item.id === bhoreId);
    if (!bhore) throw new DomainError("Bhore not found", { code: "BHORE_NOT_FOUND", status: 404 });
    if (bhore.state !== "active") throw new DomainError("Archived bhores cannot create assignments", { code: "BHORE_ARCHIVED" });
    const assignment = {
      id: `assignment-${this.counters.assignment++}`,
      householdId: this.household.id,
      bhoreId: bhore.id,
      childId: child.id,
      bhoreTitle: bhore.title,
      proposedRewardCents: bhore.rewardCents,
      dueDate: requireText(dueDate, "dueDate"),
      state: "available",
      createdAt: this.nowIso(),
      submittedAt: null,
      approvedAt: null,
      approvedAmountCents: null,
      feedback: null,
      transactionId: null
    };
    this.assignments.push(assignment);
    return copy(assignment);
  }

  submitAssignment({ actorId, assignmentId }) {
    const actor = this.actor(actorId);
    const assignment = this.assignments.find((item) => item.id === assignmentId);
    if (!assignment) throw new DomainError("Assignment not found", { code: "ASSIGNMENT_NOT_FOUND", status: 404 });
    if (actor.role === "child" && assignment.childId !== actor.id) {
      throw new DomainError("A child can submit only their own assignment", { code: "FORBIDDEN", status: 403 });
    }
    if (!["available", "rejected"].includes(assignment.state)) {
      if (assignment.state === "submitted") return copy(assignment);
      throw new DomainError("Only available or rejected assignments can be submitted", { code: "INVALID_ASSIGNMENT_STATE" });
    }
    assignment.state = "submitted";
    assignment.submittedAt = this.nowIso();
    assignment.feedback = null;
    return copy(assignment);
  }

  approveAssignment({ actorId, assignmentId, amountCents }) {
    const guardian = this.requireGuardian(actorId);
    const assignment = this.assignments.find((item) => item.id === assignmentId);
    if (!assignment) throw new DomainError("Assignment not found", { code: "ASSIGNMENT_NOT_FOUND", status: 404 });
    if (assignment.state === "approved") {
      return {
        assignment: copy(assignment),
        transaction: copy(this.transactions.find((item) => item.id === assignment.transactionId)),
        duplicate: true
      };
    }
    if (assignment.state !== "submitted") {
      throw new DomainError("Only submitted assignments can be approved", { code: "INVALID_ASSIGNMENT_STATE" });
    }
    const approvedAmountCents = amountCents === undefined
      ? assignment.proposedRewardCents
      : requireNonNegativeInteger(amountCents, "amountCents");
    const approvedAt = this.nowIso();
    const transaction = {
      id: `transaction-${this.counters.transaction++}`,
      householdId: this.household.id,
      childId: assignment.childId,
      assignmentId: assignment.id,
      type: "earning",
      amountCents: approvedAmountCents,
      reason: `Approved: ${assignment.bhoreTitle}`,
      actorId: guardian.id,
      effectiveAt: approvedAt
    };
    this.transactions.push(transaction);
    assignment.state = "approved";
    assignment.approvedAt = approvedAt;
    assignment.approvedAmountCents = approvedAmountCents;
    assignment.transactionId = transaction.id;
    return { assignment: copy(assignment), transaction: copy(transaction), duplicate: false };
  }

  rejectAssignment({ actorId, assignmentId, feedback }) {
    this.requireGuardian(actorId);
    const assignment = this.assignments.find((item) => item.id === assignmentId);
    if (!assignment) throw new DomainError("Assignment not found", { code: "ASSIGNMENT_NOT_FOUND", status: 404 });
    if (assignment.state !== "submitted") {
      throw new DomainError("Only submitted assignments can be rejected", { code: "INVALID_ASSIGNMENT_STATE" });
    }
    assignment.state = "rejected";
    assignment.feedback = requireText(feedback, "feedback");
    return copy(assignment);
  }

  adjustBalance({ actorId, childId, amountCents, reason }) {
    const guardian = this.requireGuardian(actorId);
    this.child(childId);
    if (!Number.isInteger(amountCents) || amountCents === 0) {
      throw new DomainError("amountCents must be a non-zero integer", { code: "INVALID_INPUT" });
    }
    const resultingBalance = this.balanceFor(childId) + amountCents;
    if (resultingBalance < 0) {
      throw new DomainError("This adjustment would make the balance negative", { code: "NEGATIVE_BALANCE" });
    }
    const transaction = {
      id: `transaction-${this.counters.transaction++}`,
      householdId: this.household.id,
      childId,
      assignmentId: null,
      type: "adjustment",
      amountCents,
      reason: requireText(reason, "reason"),
      actorId: guardian.id,
      effectiveAt: this.nowIso()
    };
    this.transactions.push(transaction);
    return copy(transaction);
  }

  balanceFor(childId) {
    return this.transactions
      .filter((transaction) => transaction.childId === childId)
      .reduce((sum, transaction) => sum + transaction.amountCents, 0);
  }

  streakFor(childId, now = this.clock()) {
    this.child(childId);
    return calculateStreak(this.assignments, childId, {
      now,
      timeZone: this.configuration.timeZone,
      dailyTarget: this.configuration.dailyTarget,
      includeZeroReward: this.configuration.includeZeroReward
    });
  }

  stateFor(actorId) {
    const actor = this.actor(actorId);
    const isGuardian = actor.role === "guardian";
    const visibleChildren = isGuardian
      ? this.actors.filter((item) => item.role === "child" && item.state === "active")
      : [actor];
    const childIds = new Set(visibleChildren.map((child) => child.id));
    const assignments = this.assignments.filter((assignment) => childIds.has(assignment.childId));
    const transactions = this.transactions.filter((transaction) => childIds.has(transaction.childId));

    return copy({
      household: this.household,
      configuration: this.configuration,
      currentActor: actor,
      actors: isGuardian ? this.actors : this.actors.filter((item) => item.id === actor.id || item.role === "guardian"),
      children: visibleChildren,
      bhores: isGuardian ? this.bhores : this.bhores.filter((bhore) => (
        assignments.some((assignment) => assignment.bhoreId === bhore.id)
      )),
      assignments,
      transactions: [...transactions].sort((left, right) => right.effectiveAt.localeCompare(left.effectiveAt)),
      balances: Object.fromEntries(visibleChildren.map((child) => [child.id, this.balanceFor(child.id)])),
      streaks: Object.fromEntries(visibleChildren.map((child) => [child.id, this.streakFor(child.id)]))
    });
  }
}

export function createAllowanceTracker(options) {
  return new AllowanceTracker(options);
}
