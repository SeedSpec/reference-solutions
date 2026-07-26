# SeedSpec verification report

Status: verified

## Realized use cases

- Open directly into a useful 2026 Week 7 overview for all four watched teams.
- Select a team and inspect its snapshot, season-scoped games, ranking history,
  recent form, metrics, source, and freshness details.
- Filter the schedule by team, week, and all seven declared game states.
- Switch ranking source and inspect dated observations with explicit unranked
  and unavailable gaps.
- Focus one comparison metric while retaining all teams' underlying values and
  visible definitions, units, scope, source, and update time.
- Change season without mixing 2025 and 2026 schedules, records, rankings, or
  statistics.
- Demonstrate loading, empty-week, stale, unavailable-provider,
  source-conflict, partial-provider, mapping-error, and empty-watchlist states.

## Realization and outcome evidence

| SeedSpec criterion | Subject | Result | Evidence | Notes |
| --- | --- | --- | --- | --- |
| CFD-01 Configured watchlist | realization | pass | Automated source check + rendered response | Four configured team snapshots; Texas receives explicit favorite treatment. |
| CFD-02 Stable team mapping | realization | pass | Automated source check | Stable IDs are preserved; ambiguous “Miami” mapping is surfaced and not assigned. |
| CFD-03 Season isolation | realization | pass | Automated source check | Separate 2025/2026 snapshot, game, ranking, and metric maps switch together. |
| CFD-04 First useful view | realization | pass | Rendered response + automated check | Season/week, freshness, snapshots, live/recent games, next games, and comparison appear immediately. |
| CFD-05 Preserved context | realization | pass | Automated source check | Season, week, source, metric, and last primary view remain in client state across team detail. |
| CFD-06 Visible controls | realization | pass | Automated source check | Global and surface-specific labeled selects expose every active filter. |
| CFD-07 Status distinctions | realization | pass | Automated source check | Scheduled, delayed, in-progress, halftime, final, postponed, and canceled labels and tones exist. |
| CFD-08 Score honesty | realization | pass | Automated source check | Score rendering is guarded to meaningful states; no scheduled/postponed/canceled placeholder zero. |
| CFD-09 Time and venue | realization | pass | Automated source check | Every game has labeled CT date/time and venue or “Location unavailable.” |
| CFD-10 Final-state protection | realization | pass | Automated source check | Final-state policy is visible and refresh retains prior confirmed values. |
| CFD-11 Ranking-source identity | realization | pass | Automated source check | Each ranking view shows named fixture source and poll date. |
| CFD-12 Unranked versus unavailable | realization | pass | Automated source check | `UR` renders as “Unranked”; null renders as “Unavailable.” |
| CFD-13 Honest ranking gaps | realization | pass | Automated source check | Separate dated markers and table cells preserve gaps without connecting lines. |
| CFD-14 Defined metrics | realization | pass | Automated source check | Label, definition, unit, season, source, update time, and value are visible. |
| CFD-15 Comparable scales | realization | pass | Automated source check | Bars focus one metric/unit; unlike units are only shown in labeled table columns. |
| CFD-16 Ties remain ties | realization | pass | Automated source check | Equal fixture values receive “Tied value” or “Tied best,” independent of favorite. |
| CFD-17 Data attribution | realization | pass | Automated source check | Four fixture data classes expose source and exact last-success timestamp. |
| CFD-18 Stale and unavailable | realization | pass | Automated source check | Current, stale, updating, unavailable, and conflict states are visibly distinct. |
| CFD-19 Partial provider failure | realization | pass | Automated source check | Ranking outage leaves valid score, schedule, and statistical fixtures visible. |
| CFD-20 Provider disagreement | realization | pass | Automated source check | Conflict names both values and retains declared Scorebook source of record. |
| CFD-21 Keyboard operation | realization | pass | Semantic source check + lint | Primary interactions are native buttons/selects with visible focus rules. |
| CFD-22 Non-color meaning | realization | pass | Automated source check | Text labels carry team, status, freshness, ranking, and comparison meaning. |
| CFD-23 Chart alternative | realization | pass | Automated source check | Ranking and comparison visuals have adjacent semantic tables. |
| CFD-24 Reduced motion | realization | pass | Automated CSS check | Reduced-motion media query disables animation while keeping labels and values. |
| CFD-25 Narrow-screen completeness | realization | pass | Automated CSS check | 320-pixel minimum, stacked matchups, folded labeled table rows, and wrapped controls are defined. |
| CFD-26 State coverage | realization | pass | Automated source check | Normal, loading, empty, stale, unavailable, partial, conflict, mapping, and config-error scenarios are selectable. |

## Verification commands

- `npm test`: production build completed; 10 tests passed, 0 failed.
- `npm run lint`: completed with no output, errors, or warnings.
- `npm audit --omit=dev --json`: 0 production vulnerabilities.
- `curl -fsS http://localhost:3000/`: HTTP success with title, fixture
  disclaimer, overview heading, and configured-team content.
- `curl -fsSI http://localhost:3000/og.png`: HTTP 200, `image/png`,
  1,990,745 bytes.
- `npx --yes @seedspec/cli@0.2.2 verify-lock ...`: verified one package and
  one capability declaration.
- `npx --yes @seedspec/cli@0.2.2 completion ...`: completion status
  `verified`, scope status `recorded`, one scoped item.

## Manual checks

- Generated social card was visually inspected for the three required text
  strings, product palette, dashboard motifs, and absence of fabricated scores
  or ranking numbers before it was copied to `public/og.png`.
- Browser screenshot, resizing, and click-through QA were intentionally not
  performed in this delegated run because the Sites workflow prohibits
  unrequested browser QA. No such manual evidence is claimed.

## Remaining gaps

- The application intentionally uses deterministic fixture data rather than
  live sports data.
- No deployment was performed by explicit instruction.
- Optional human visual QA at 320 CSS pixels remains available to the
  evaluator; the responsive implementation is covered by source and CSS checks.
