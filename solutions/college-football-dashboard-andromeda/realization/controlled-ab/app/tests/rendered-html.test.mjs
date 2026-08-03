import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import test, { after, before } from "node:test";

let server;
let html;

before(async () => {
  server = spawn("npm", ["run", "start", "--", "--port", "4173"], {
    cwd: process.cwd(),
    env: process.env,
    stdio: ["ignore", "pipe", "pipe"],
  });

  await new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error("Production server did not become ready")),
      15_000,
    );
    const onData = (chunk) => {
      if (String(chunk).includes("Production server running")) {
        clearTimeout(timeout);
        resolve();
      }
    };
    server.stdout.on("data", onData);
    server.stderr.on("data", onData);
    server.on("exit", (code) => {
      clearTimeout(timeout);
      reject(new Error(`Production server exited early with code ${code}`));
    });
  });

  const response = await fetch("http://127.0.0.1:4173/");
  assert.equal(response.status, 200);
  html = await response.text();
});

after(() => {
  server?.kill("SIGTERM");
});

test("renders the first useful dashboard view with explicit fixture labeling", () => {
  assert.match(html, /Saturday Signal/);
  assert.match(html, /Fixture data · not live/);
  assert.match(html, /deterministic fixture data/);
  assert.match(html, /2026 demo season/);
  assert.match(html, /Week 7/);
  assert.match(html, /Last successful update/);
  assert.match(html, /Live &amp; recently final/);
  assert.match(html, /Comparison signal/);
});

test("renders exactly four watched-team snapshot cards with favorite priority", () => {
  const snapshotCards =
    html.match(/class="[^"]* team-card(?: favorite-team)?"/g) ?? [];
  assert.equal(snapshotCards.length, 4);
  assert.match(html, /favorite-team/);
  for (const team of [
    "Texas Longhorns",
    "Ohio State Buckeyes",
    "Oregon Ducks",
    "Notre Dame Fighting Irish",
  ]) {
    assert.match(html, new RegExp(team));
  }
});

test("exposes all required failure-state demonstrations and working context controls", () => {
  for (const state of [
    "Normal populated",
    "Loading / updating",
    "Empty week",
    "Stale refresh",
    "Provider unavailable",
    "Provider conflict",
    "Partial provider",
  ]) {
    assert.match(html, new RegExp(state.replace("/", "\\/")));
  }
  for (const control of [
    "Season",
    "Week",
    "Ranking source",
    "Comparison metric",
    "Demonstrated data state",
  ]) {
    assert.match(html, new RegExp(control));
  }
});
