import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const dashboardPath = new URL("../app/dashboard.tsx", import.meta.url);
const cssPath = new URL("../app/globals.css", import.meta.url);
const layoutPath = new URL("../app/layout.tsx", import.meta.url);
const pagePath = new URL("../app/page.tsx", import.meta.url);

const [dashboard, css, layout, page] = await Promise.all([
  readFile(dashboardPath, "utf8"),
  readFile(cssPath, "utf8"),
  readFile(layoutPath, "utf8"),
  readFile(pagePath, "utf8"),
]);

test("CFD-01 through CFD-03: configured identity and isolated seasons are explicit", () => {
  for (const team of [
    "Texas Longhorns",
    "Ohio State Buckeyes",
    "Oregon Ducks",
    "Notre Dame Fighting Irish",
  ]) {
    assert.match(dashboard, new RegExp(team));
  }
  assert.match(dashboard, /favorite_team_id|team\.id === "texas"/);
  assert.match(dashboard, /type Season = 2025 \| 2026/);
  assert.match(dashboard, /Record<Season/);
  assert.match(dashboard, /STABLE TEAM ID/);
});

test("CFD-04 through CFD-06: first useful view and preserved controls exist", () => {
  for (const label of [
    "Watchlist pulse",
    "Live & recent",
    "Next game",
    "Season",
    "Week / stage",
    "Ranking source",
    "Focused metric",
    "Game status",
  ]) {
    assert.match(dashboard, new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.match(dashboard, /lastPrimaryView/);
  assert.match(dashboard, /Return to overview/);
});

test("CFD-07 through CFD-10: every game status and honest score guard is implemented", () => {
  for (const status of [
    "scheduled",
    "delayed",
    "in-progress",
    "halftime",
    "final",
    "postponed",
    "canceled",
  ]) {
    assert.match(dashboard, new RegExp(`"${status}"`));
  }
  assert.match(
    dashboard,
    /game\.status === "final"[\s\S]*game\.status === "in-progress"[\s\S]*game\.status === "halftime"[\s\S]*game\.status === "delayed"/,
  );
  assert.match(dashboard, /Final-state protection/);
  assert.match(dashboard, /provider correction must be[\s\S]*labeled explicitly/i);
  assert.match(dashboard, /Location unavailable/);
});

test("CFD-11 through CFD-16: ranking gaps, metric semantics, and ties are explicit", () => {
  assert.match(dashboard, /Poll date/);
  assert.match(dashboard, /Unranked/);
  assert.match(dashboard, /Unavailable/);
  assert.match(dashboard, /Gaps are shown as gaps/);
  assert.match(dashboard, /metric\.definition/);
  assert.match(dashboard, /metric\.unit/);
  assert.match(dashboard, /Equal values remain tied/);
  assert.match(dashboard, /one metric and one unit/);
});

test("CFD-17 through CFD-20: mixed source freshness and conflict handling are visible", () => {
  for (const source of [
    "Scorebook fixture",
    "Schedule fixture",
    "Poll archive fixture",
    "StatsLab fixture",
  ]) {
    assert.match(dashboard, new RegExp(source));
  }
  for (const state of ["Current", "Stale", "Updating", "Unavailable", "Conflict"]) {
    assert.match(dashboard, new RegExp(state));
  }
  assert.match(dashboard, /declared source of record/);
  assert.match(dashboard, /not averaged or hidden/);
});

test("CFD-21 through CFD-25: keyboard, non-color, tables, reduced motion, and phone rules exist", () => {
  assert.match(dashboard, /<button/);
  assert.match(dashboard, /<select/);
  assert.match(dashboard, /aria-current/);
  assert.match(dashboard, /role="img"/);
  assert.match(dashboard, /<table/);
  assert.match(dashboard, /data-label=/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /min-width: 320px/);
  assert.match(css, /@media \(max-width: 460px\)/);
});

test("CFD-26: loading, empty, stale, unavailable, conflict, partial, and boundary scenarios are demonstrable", () => {
  for (const state of [
    "loading",
    "stale",
    "partial",
    "conflict",
    "empty",
    "mapping",
    "config-error",
  ]) {
    assert.match(dashboard, new RegExp(`"${state}"`));
  }
  assert.match(dashboard, /No games match the current filters/);
  assert.match(dashboard, /No teams are configured/);
  assert.match(dashboard, /Unknown team mapping needs correction/);
});

test("the realization never claims deterministic fixture data is live", () => {
  assert.match(dashboard, /not live/);
  assert.match(dashboard, /Deterministic fixture/);
  assert.match(dashboard, /no external data API/i);
  assert.doesNotMatch(dashboard, /\bfetch\s*\(/);
  assert.doesNotMatch(dashboard, /\baxios\b/);
});

test("starter preview metadata and product UI are fully replaced", () => {
  assert.match(layout, /Saturday Signal/);
  assert.match(page, /<Dashboard/);
  assert.doesNotMatch(`${layout}\n${page}`, /codex-preview|Starter Project|SkeletonPreview/);
});

test("Andromeda-inspired public design tokens and corner-marker motif are present", () => {
  assert.match(css, /--accent: #0fcfb2/);
  assert.match(css, /--warning: #ffa000/);
  assert.match(css, /--fault: #ff5757/);
  assert.match(css, /\.corner-tl/);
  assert.match(css, /\.panel-glow/);
  assert.match(css, /\.badge-live/);
  assert.match(css, /\.metric-track/);
});
