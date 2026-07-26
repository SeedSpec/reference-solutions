import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const dashboard = await readFile(
  new URL("../app/dashboard/Dashboard.tsx", import.meta.url),
  "utf8",
);
const fixtures = await readFile(
  new URL("../app/dashboard/fixtures.ts", import.meta.url),
  "utf8",
);
const css = await readFile(
  new URL("../app/globals.css", import.meta.url),
  "utf8",
);
const trendChart = await readFile(
  new URL(
    "../app/components/andromeda/components/TrendChart.tsx",
    import.meta.url,
  ),
  "utf8",
);

test("fixture model carries every explicit game and ranking state", () => {
  for (const status of [
    "scheduled",
    "delayed",
    "in-progress",
    "halftime",
    "final",
    "postponed",
    "canceled",
  ]) {
    assert.match(fixtures, new RegExp(`status: "${status}"`));
  }
  assert.match(fixtures, /"notre-dame": "unranked"/);
  assert.match(fixtures, /texas: "unavailable"/);
  assert.match(fixtures, /oregon: null/);
});

test("every responsive surface uses the Andromeda desktop-first breakpoint helpers", () => {
  assert.match(dashboard, /\$\{mq\.md\}/);
  assert.match(dashboard, /\$\{mq\.sm\}/);
  assert.match(dashboard, /\$\{mq\.coarse\}/);
  assert.match(css, /min-width: 320px/);
  assert.match(css, /overflow-x: hidden/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});

test("critical visualizations and stateful controls have accessible text paths", () => {
  assert.match(dashboard, /Accessible poll values/);
  assert.match(trendChart, /aria-pressed/);
  assert.match(dashboard, /aria-label=\{`Open \$\{team\.name\} team detail`\}/);
  assert.match(dashboard, /“UR” means the poll explicitly left the team unranked/);
  assert.match(dashboard, /Equal values remain equal/);
});

test("season changes affect records, rankings, schedules, and statistics together", () => {
  assert.match(dashboard, /historicalMetricValues/);
  assert.match(dashboard, /recordForSeason/);
  assert.match(dashboard, /Number\(value\) \+ 1/);
  assert.match(dashboard, /replace\("Oct 10", "Sep 27"\)/);
});
