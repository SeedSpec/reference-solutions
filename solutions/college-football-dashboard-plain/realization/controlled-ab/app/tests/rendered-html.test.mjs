import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: {
        accept: "text/html",
        host: "localhost",
        "x-forwarded-proto": "http",
      },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the complete first useful view", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Saturday Signal — College Football Watchlist<\/title>/i);
  assert.match(html, /Illustrative fixture data · not live/);
  assert.match(html, /2026(?:<!-- -->)? season · (?:<!-- -->)?Week 6/);
  assert.match(html, /Data freshness/);
  assert.match(html, /Team snapshots/);
  assert.match(html, /Live or recently final/);
  assert.match(html, /Quick compare/);
  assert.match(html, /Fixture Scorebook A/);
  assert.match(html, /Skip to dashboard/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("renders four configured snapshots with favorite priority", async () => {
  const html = await (await render()).text();
  assert.equal((html.match(/<article class="team-card\b/g) ?? []).length, 4);
  assert.equal((html.match(/class="team-card favorite-card"/g) ?? []).length, 1);

  for (const team of [
    "Texas Longhorns",
    "Ohio State Buckeyes",
    "Oregon Ducks",
    "Notre Dame Fighting Irish",
  ]) {
    assert.match(html, new RegExp(team));
  }
});

test("includes accessible controls and explicit state demonstrations", async () => {
  const [page, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  for (const expected of [
    "Loading / updating",
    "Stale refresh",
    "Rankings unavailable",
    "Partial provider failure",
    "Provider conflict",
    "Week with no games",
    "Empty watchlist error",
    "Unknown team mapping",
  ]) {
    assert.match(page, new RegExp(expected.replaceAll("/", "\\/")));
  }

  for (const status of [
    "Scheduled",
    "Delayed",
    "In progress",
    "Halftime",
    "Final",
    "Postponed",
    "Canceled",
  ]) {
    assert.match(page, new RegExp(`status: "${status}"`));
  }

  assert.match(page, /Accessible table:/);
  assert.match(page, /aria-live="polite"/);
  assert.match(page, /aria-current=/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@media \(max-width:\s*380px\)/);
});

test("ships bespoke social metadata and no starter artifacts", async () => {
  const [layout, packageJson, imageStats] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    stat(new URL("../public/og.png", import.meta.url)),
  ]);

  assert.match(layout, /generateMetadata/);
  assert.match(layout, /x-forwarded-host/);
  assert.match(layout, /summary_large_image/);
  assert.match(layout, /\/og\.png/);
  assert.ok(imageStats.size > 100_000);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview", projectRoot)));
});
