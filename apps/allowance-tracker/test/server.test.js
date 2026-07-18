import assert from "node:assert/strict";
import test from "node:test";
import { createAllowanceTracker } from "../src/domain.js";
import { createAllowanceServer } from "../src/server.js";

async function jsonRequest(baseUrl, path, body) {
  const response = await fetch(`${baseUrl}${path}`, body === undefined ? {} : {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  });
  const payload = await response.json();
  assert.equal(response.ok, true, JSON.stringify(payload));
  return payload;
}

test("HTTP interface completes the seeded allowance use case", async (t) => {
  const tracker = createAllowanceTracker({ seedDemo: true });
  const server = createAllowanceServer({ tracker });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;

  const health = await jsonRequest(baseUrl, "/health");
  assert.deepEqual(health, { ok: true });

  const guardianState = await jsonRequest(baseUrl, "/api/state?actor=guardian-1");
  const assignment = guardianState.assignments[0];
  assert.equal(assignment.state, "available");
  assert.equal(guardianState.bhores[0].title, "Clear the dinner table");

  await jsonRequest(baseUrl, `/api/assignments/${assignment.id}/submit`, { actorId: "child-1" });
  await jsonRequest(baseUrl, `/api/assignments/${assignment.id}/approve`, { actorId: "guardian-1" });
  const childState = await jsonRequest(baseUrl, "/api/state?actor=child-1");

  assert.equal(childState.assignments[0].state, "approved");
  assert.equal(childState.transactions.length, 1);
  assert.equal(childState.balances["child-1"], 250);
  assert.equal(childState.streaks["child-1"].current, 1);
});
