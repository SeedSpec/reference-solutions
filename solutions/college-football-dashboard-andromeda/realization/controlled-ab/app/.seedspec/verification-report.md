# SeedSpec verification report

Status: verified

## Realized use cases

- Open the first useful overview and immediately see season/week, source freshness, all four watched-team snapshots, watched live/recent games, next-game context, and a comparison metric.
- Navigate among Overview, Schedule, Rankings, Compare, and team detail while retaining season, week, ranking source, comparison metric, and filters in React state.
- Change seasons and observe records, rankings, schedule dates/source labels, and statistics move together to the selected fixture season.
- Filter schedule rows by watched team, week, and every authored game status.
- Inspect AP, Coaches, and unavailable CFP observations without converting unranked/unavailable gaps into rank zero.
- Compare one metric at a time with definition, unit, season scope, source, update time, accessible value table, and explicit ties.
- Select loading, empty, stale, unavailable, conflicting, and partial-provider demonstrations without any state being implied as live.

## Realization and outcome evidence

| SeedSpec criterion | Subject | Result | Evidence | Notes |
| --- | --- | --- | --- | --- |
| CFD-01 Configured watchlist | realization | pass | Rendered HTML test | Exactly four snapshot cards; Texas spans two desktop grid tracks and is labeled Favorite without changing other values. |
| CFD-02 Stable team mapping | realization | pass | Fixture model and team detail review | Canonical configured IDs key every observation; detail identifies the configured ID and states the verified mapping. |
| CFD-03 Season isolation | realization | pass | Static acceptance test | 2025 and 2026 switch records, ranking observations, schedule dates/attribution, and metric values together. |
| CFD-04 First useful view | realization | pass | Production HTTP render test | Initial SSR contains selected season/week, freshness, four teams, current/recent games, next-game context, and comparison signal. |
| CFD-05 Preserved working context | realization | pass | State-flow review | Team detail only sets `teamDetail`; returning clears it without replacing season/week/source/metric/filter state. |
| CFD-06 Visible controls | realization | pass | Rendered HTML test | Persistent labeled control deck exposes season, week, ranking source, comparison metric, and demonstration state; schedule exposes team/status filters. |
| CFD-07 Status distinctions | realization | pass | Fixture-model test and UI review | Scheduled, delayed, in-progress, halftime, final, postponed, and canceled values have text labels and distinct badge variants. |
| CFD-08 Score honesty | realization | pass | Fixture and game-row review | Scores exist only on meaningful live/halftime/final fixtures; other rows render “Score not applicable,” never zero. |
| CFD-09 Time and venue | realization | pass | Fixture review | Every game has CT-labeled date/time and either a named venue or “Unknown location.” |
| CFD-10 Final-state protection | realization | pass | `game-state.test.mjs` | Ordinary regressions preserve the final status/score; explicit corrections are accepted only with a correction label. |
| CFD-11 Ranking-source identity | realization | pass | Rankings UI review | Source, season, poll date, and update time accompany ranking values. |
| CFD-12 Unranked versus unavailable | realization | pass | Fixture-model and table review | Notre Dame can be explicitly `UR`; missing CFP/AP provider data is labeled Unavailable and rendered as “—.” |
| CFD-13 Honest ranking gaps | realization | pass | Fixture-model and chart review | Gap observations are `null`; TrendChart does not opt into connecting null values; the adjacent table spells out every gap. |
| CFD-14 Defined comparison metrics | realization | pass | Compare view review | All four configured metrics include label, definition, unit, season, value, source, and update time. |
| CFD-15 Comparable scales | realization | pass | Compare view review | Only the focused metric appears in the bar scale; unlike metrics remain in a unit-labeled table. |
| CFD-16 Ties remain ties | realization | pass | Compare view review | Equal values produce explicit tie notes and identical bar lengths; favorite status is not a tiebreaker. |
| CFD-17 Data attribution | realization | pass | Freshness ledger and source lines | Scores, schedules, rankings, and statistics each expose provider labels and last successful update times. |
| CFD-18 Stale and unavailable states | realization | pass | State-selector render test and UI review | Normal/current, stale, loading/updating, unavailable, and partial states are separately named; stale values retain prior timestamps. |
| CFD-19 Partial provider failure | realization | pass | Partial/unavailable mode review | AP or schedule failure explains the affected class while preserving independent schedule/ranking/statistics surfaces. |
| CFD-20 Provider disagreement | realization | pass | Conflict mode review | The conflict names both reported scores and declares Demo Sports feed as source of record; no averaging occurs. |
| CFD-21 Keyboard operation | realization | pass | Semantic/control source review | Native buttons, selects, tab-role controls, chart legend buttons, and team-detail controls are keyboard reachable with explicit `:focus-visible` treatments. |
| CFD-22 Non-color meaning | realization | pass | UI copy review | Team identity, status, freshness, ranking state, and comparison ties all have text; color only reinforces them. |
| CFD-23 Accessible chart alternative | realization | pass | Static acceptance test | Ranking chart has the adjacent “Accessible poll values” table; comparison bars have labeled values and a complete table. |
| CFD-24 Reduced motion | realization | pass | CSS and component review | Global reduced-motion rules collapse animations; selected Andromeda interactive/chart components use reduced-motion hooks. |
| CFD-25 Narrow-screen completeness | realization | pass | Responsive static test | Desktop-first `mq.md`/`mq.sm` reflow stacks grids and game rows; wide tables remain internally scrollable; page root blocks horizontal overflow at a 320px minimum. |
| CFD-26 State coverage | realization | pass | Rendered HTML and state-control tests | Populated, loading, empty, stale, unavailable, conflict, and partial-provider demonstrations are user-selectable. |

## Manual checks

- Reviewed default SSR output from the production server for fixture disclosure, useful first view, team-card count, working context controls, and source attribution.
- Reviewed game fixtures for score/status/venue/timezone honesty.
- Reviewed ranking observations for `null` gaps and distinct unranked/unavailable states.
- Reviewed responsive CSS source for desktop-first breakpoints, single-column faithful stacks, internal table scrolling, coarse-pointer targets, and no horizontal page scroll.
- Reviewed interactive elements for native semantics, labels, focus-visible styles, and preserved local context.
- Reviewed bundled output for removal of the starter preview, no AI Canvas runtime/account requirement, and no simulated data-refresh timer.

## Commands and results

- `npx --yes @seedspec/cli@0.2.2 begin <package>` — package valid.
- `npx --yes @seedspec/cli@0.2.2 resolve ... -i andromeda-reference --output <app>` — project ready.
- `npx --yes @seedspec/cli@0.2.2 resolve-resources .` — two bundled resources resolved.
- `npm run build` — pass; only a non-fatal client chunk-size warning.
- `npm run lint` — pass for application-authored source and tests.
- `node --test tests/*.test.mjs` — 9/9 pass.
- Production HTTP request to `127.0.0.1` — 200 with complete default dashboard markup.

## Remaining gaps

- No current sports provider is connected; all data is clearly labeled deterministic fixture content.
- No browser screenshot/DOM-driving visual QA was performed because the Sites background-preview rules prohibit it unless explicitly requested. Responsive acceptance was checked through product CSS, component contracts, and automated source assertions.
- The preserved Andromeda v1 snapshot is intentionally untyped (`@ts-nocheck`); application build success is not represented as proof of type safety for those files.
