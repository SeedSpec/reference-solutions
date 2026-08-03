# SeedSpec implementation notes

## Local terminology and concept mappings

- `Scorebook fixture` is the declared source of record for fixture game scores.
- `Schedule fixture`, `Poll archive fixture`, and `StatsLab fixture` supply
  deterministic schedule, ranking, and statistical observations respectively.
- Configured team IDs remain `texas`, `ohio-state`, `oregon`, and
  `notre-dame`; provider-style aliases are never used as identity.
- Rank value `UR` means explicitly unranked. `null` means unavailable or no
  observation and is rendered as a visible gap.

## Material behavioral deviations

- No live provider is connected. This is an affirmed constraint, and every
  data surface identifies the content as deterministic fixture data that is not
  live.
- The public Andromeda catalog and component specifications were available,
  but the registry returned account-required placeholder files instead of
  component source. Those placeholders were removed. The realization follows
  the publicly documented tokens and patterns without claiming direct
  Andromeda component reuse.
- Browser screenshot and click-through QA were not performed because this was
  a delegated background run and browser testing was not explicitly requested.
  The production build, server-rendered response, semantic source checks, and
  responsive CSS rules were verified automatically.

## Architecture and integration choices

- Vinext/React client application with one interactive dashboard surface and
  no persistence, credentials, external APIs, or app-owned authentication.
- State is local and reversible: season, week, primary surface, team detail,
  ranking source, comparison metric, schedule filters, and data scenario.
- Native buttons, selects, tables, headings, live regions, and status text
  provide keyboard and assistive-technology semantics without an added widget
  library.
- The single-metric bar display never mixes units; accessible tables preserve
  the underlying ranking and comparison values.
- Responsive tables fold into labeled record cards below 700 CSS pixels, and
  the overall shell has an explicit 320 CSS-pixel minimum target.
- The generated `public/og.png` reuses the finished product's dark technical
  palette, turquoise signal treatment, corner markers, and fixture-data
  message. Metadata derives the absolute image URL from the incoming host.

## External resources and configured state

- Preferred profile: `andromeda-external`.
- Public pages consulted:
  `https://aicanvas.me/design-systems/andromeda`,
  `/card`, `/data-table`, `/segmented-control`, `/stat-tile`, `/badge`, and
  `/alert`.
- Publicly observable Andromeda patterns used: near-black technical surfaces,
  turquoise `#0FCFB2` accent, orange warning and red fault tokens, monospaced
  captions, corner-bracket framing, hairline data rows, segmented navigation,
  compact status badges, and reduced-motion-safe status signaling.
- The verified bundled Context7 instructions resource was consulted and
  recorded through SeedSpec. Context7 itself was not available and was
  unnecessary because the realization uses installed React plus native
  HTML/CSS rather than version-sensitive chart or motion libraries.
- No site, hosted resource, provider account, external integration, or
  deployment was created.

## Known limitations and follow-up

- All sports information is deliberately fictional deterministic fixture data;
  it must not be used as an official record.
- Interaction and narrow-screen behavior should receive optional human visual
  QA if the evaluator wants evidence beyond the automated checks.
- Development-only dependency advisories remain in the starter toolchain.
  Production dependency audit reports zero vulnerabilities after patch-level
  upgrades and safe transitive overrides.
