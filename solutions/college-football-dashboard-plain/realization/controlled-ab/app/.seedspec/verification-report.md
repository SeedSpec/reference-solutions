# SeedSpec verification report

Status: verified

## Realized use cases

- Open directly into a useful 2026 Week 6 overview with four team snapshots, freshness, current/recent fixture games, next games, and a focused comparison.
- Change season/week while records, results, rankings, and statistics stay season-scoped.
- Open a stable team detail and return with season, week, poll, metric, and scroll context preserved.
- Filter schedule/results by watched team, week/stage, and every declared game status.
- Switch among AP, Coaches, and CFP fixture histories while preserving unranked and unavailable gaps.
- Focus one same-unit metric, inspect tied values, definitions, units, season scope, source, and update time.
- Inspect normal, loading/updating, stale, unavailable, partial-provider, provider-conflict, empty-week, empty-watchlist, and unknown-mapping states.

## Realization and outcome evidence

| SeedSpec criterion | Subject | Result | Evidence | Notes |
| --- | --- | --- | --- | --- |
| CFD-01 | realization | pass | Render test; overview team grid | Four configured snapshots render once; Texas is first and explicitly labeled Favorite without changing values. |
| CFD-02 | realization | pass | Team IDs and mapping scenario | Stable configured IDs drive all data; unknown `NDU-IRE` is isolated for review. |
| CFD-03 | realization | pass | Season control and typed season maps | 2025/2026 records, games, ranks, and metrics switch together; 2025 games retain a historical season label. |
| CFD-04 | realization | pass | Server-render test | Initial view includes season/week, freshness, all snapshots, live/recent games, next games, and comparison. |
| CFD-05 | realization | pass | Team-detail navigation handlers | View state persists and Back restores saved scroll position. |
| CFD-06 | realization | pass | Global and surface controls | Season/week/state, team/status, poll, and metric controls all display current values. |
| CFD-07 | realization | pass | Fixture schedule and status filter | Scheduled, delayed, in-progress, halftime, final, postponed, and canceled all use explicit text badges. |
| CFD-08 | realization | pass | Game card conditional score rendering | Only in-progress, halftime, and final fixtures carry scores; other states never show zero. |
| CFD-09 | realization | pass | Game cards | Scheduled fixtures include date, CT time, and venue or explicit “Location unavailable.” |
| CFD-10 | realization | pass | Final-state protection explainer | Protected final flow retains ORE 31 through failure; corrections are explicitly labeled. |
| CFD-11 | realization | pass | Ranking context, tables, team cards | Poll source and poll date accompany current and historical observations. |
| CFD-12 | realization | pass | `displayRanking` and tables | `UR` becomes “Unranked”; `null` becomes “Unavailable.” |
| CFD-13 | realization | pass | Ranking trend and adjacent table | Gap cells remove connecting markers/lines; critical values remain in a table. |
| CFD-14 | realization | pass | Metric glossary and focused panel | All four metrics expose label, definition, unit, season, value, source, and update time. |
| CFD-15 | realization | pass | Focused metric view | Bars compare exactly one selected metric/unit; the full table labels every unit. |
| CFD-16 | realization | pass | Metric leader logic | Equal Oregon/Ohio State values are explicitly “Tied leader”; favorite status does not break the tie. |
| CFD-17 | realization | pass | Source lines and freshness card | Schedule, score, ranking, and statistical sources remain separate with last update times. |
| CFD-18 | realization | pass | State selector and banners | Current, stale, updating, and unavailable states are explicit; stale/loading keep last-known values and time. |
| CFD-19 | realization | pass | Partial-provider scenario | Statistics failure withholds comparison values while schedules, scores, and rankings remain available. |
| CFD-20 | realization | pass | Conflict scenario | Both score values remain visible and Scorebook A is declared source of record; no average/overwrite. |
| CFD-21 | realization | pass | Native controls and CSS | All interactions use buttons/selects with `:focus-visible`; team/detail and Back are keyboard reachable. |
| CFD-22 | realization | pass | Text labels throughout | Team initials/names, status words, freshness words, ranking text, and leader text carry meaning beyond color. |
| CFD-23 | realization | pass | Ranking and comparison tables | Data-critical visual treatments have adjacent accessible tables or full textual values. |
| CFD-24 | realization | pass | Reduced-motion media query | Animation, transition, and smooth scroll durations collapse without removing content or controls. |
| CFD-25 | realization | pass | 380px/720px responsive rules; semantic source review | At 320px the layout becomes one column with bottom navigation; identity, status, score, freshness, and source text remain in content. |
| CFD-26 | realization | pass | State-control test and source review | Loading, empty, stale, unavailable, and partial states are directly selectable in addition to normal; conflict/config/mapping are also included. |

## Automated checks

- `npm run build` — pass; production route and Worker output generated.
- `node --test tests/rendered-html.test.mjs` — pass; 4 tests, 0 failures.
- `npm run lint` — pass; 0 errors.
- `npx tsc --noEmit` — pass; 0 errors.
- `npx --yes @seedspec/cli@0.2.2 completion <app>` — run after this evidence update.

## Manual checks

- Reviewed all initial server-rendered text for explicit fixture/not-live labeling, attribution, freshness, favorite priority, game state semantics, and comparison units.
- Reviewed every scenario branch and every navigation/filter control in source for preserved React state and native keyboard semantics.
- Reviewed responsive rules down through 380px, which apply to the required 320px width, ensuring source and status information are not `display: none`.
- Browser screenshots, automated clicks, and resizing were intentionally not performed in this delegated/background workflow.

## Remaining gaps

- No live-provider outcome is claimed; all data behavior is deterministic fixture behavior.
- No browser-level visual regression suite is included.
