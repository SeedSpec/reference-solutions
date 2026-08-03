# Resolved SeedSpec: College Football Dashboard — Andromeda Guided

> This file records resolved solution intent. It is an input to planning and implementation, not executable instructions or a generated realization.

## Project summary

- Root package: org.seedspec.examples.college-football-dashboard-andromeda@0.2.0
- Root package digest: sha256:0afa19bed37dddf706a274224675a7aaf84539605af4bc191693c17dfdf8efcb
- Root kind hint: application
- Additions: none
- Protocol: 0.2
- Applied intent: affirmed

## Applied intent and provenance

Package definitions below are package-author intent. Project-local contributions are end-user intent or explicitly labeled agent proposals; format alone does not determine authority.

- org.seedspec.examples.college-football-dashboard-andromeda: as-authored; `org.seedspec.intent.native` at `definition/college-football-dashboard.md`

## Solution configuration

### College Football Dashboard — Andromeda Guided (example)

```yaml
dashboard_name: Saturday Signal
season: 2026
timezone: America/Chicago
favorite_team_id: texas
teams:
  - id: texas
    name: Texas Longhorns
    short_name: Texas
    accent_color: "#BF5700"
  - id: ohio-state
    name: Ohio State Buckeyes
    short_name: Ohio State
    accent_color: "#BA0C2F"
  - id: oregon
    name: Oregon Ducks
    short_name: Oregon
    accent_color: "#154733"
  - id: notre-dame
    name: Notre Dame Fighting Irish
    short_name: Notre Dame
    accent_color: "#0C2340"
ranking_sources:
  - ap
  - coaches
  - cfp
comparison_metrics:
  - win-percentage
  - points-per-game
  - points-allowed-per-game
  - total-offense-yards-per-game
freshness:
  live_scores_seconds: 30
  schedules_minutes: 360
  rankings_hours: 24
  statistics_hours: 12
default_view: overview
```

## Root definition

# College Football Program Dashboard

## Purpose

Create a season dashboard for a fan or analyst who follows several college
football teams and wants one trustworthy place to understand what is happening
now, what comes next, and how the teams compare.

The dashboard must prioritize current football information over decorative
content. It is not a betting product, a recruiting system, a fantasy game, or
an official record book. It may use licensed or public data sources chosen
during implementation, but it must never invent a score, ranking, schedule,
record, or statistic when source data is absent.

The product definition is independent of a visual system or component library.
A supplied implementation profile may guide the realization, and the user may
instead choose an existing project design system or another suitable approach.

## User and watchlist

The primary user maintains a configured watchlist of two to eight teams and
chooses one as the favorite. The favorite receives visual priority but does not
change the meaning of comparisons or hide another watched team.

Each team has a stable configured ID and display name. Provider-specific IDs,
logos, conference membership, colors, and aliases may be mapped during
implementation. A mapping must not silently merge two teams or substitute a
similarly named program.

## Information model

- **Season** — the configured football season.
- **Week** — a provider-defined week or postseason stage with a visible label.
- **Team** — one configured program on the watchlist.
- **Game** — a scheduled or completed contest between two teams at a known or
  not-yet-known time and venue.
- **Game status** — scheduled, delayed, in progress, halftime, final, postponed,
  or canceled.
- **Team snapshot** — record, conference record when available, current
  rankings, streak, most recent result, and next scheduled game.
- **Ranking observation** — one team's position or unranked state in a named
  ranking source for a dated poll.
- **Metric observation** — a named team statistic for a defined season scope,
  with source and update time.
- **Freshness state** — current, stale, updating, or unavailable.

Unknown, unranked, scoreless, tied, postponed, and unavailable are distinct
states. A missing ranking is not automatically “unranked,” and a missing score
is not zero.

## Primary surfaces

### Season overview

The first useful view shows:

1. the selected season and week;
2. data freshness and last successful update;
3. one concise snapshot for each watched team;
4. live or recently final watched-team games when any exist;
5. each team's next scheduled game; and
6. a short set of comparison metrics.

The favorite team may be larger or appear first. The other watched teams remain
readable without horizontal precision scrolling on a phone.

### Team detail

Selecting a team opens a stable team view containing:

- the team snapshot;
- schedule and results for the selected season;
- dated ranking history for the configured ranking sources;
- configured comparison metrics with definitions;
- recent form; and
- source and freshness information.

Returning to the overview preserves the selected season, week, comparison
metric, and scroll or navigation context when practical.

### Schedule and results

The schedule can be filtered by watched team, week, and game status. Every game
row identifies both teams, the date and time with timezone, location when
known, status, and score only when meaningful for that status.

Live games distinguish the current period and clock when supplied. Final games
are visibly final. Delayed, postponed, and canceled games must not look like
ordinary scheduled games.

### Rankings and trends

The user can select one configured ranking source and inspect each watched
team's dated position across the season. The trend preserves gaps when a poll
did not rank a team or data is unavailable; it must not draw a continuous line
through an unknown observation.

Charts supplement rather than replace an accessible textual or tabular
representation of the same critical values.

### Team comparison

The comparison view presents all watched teams against the configured metrics.
Every metric has a visible label, definition, unit, season scope, and update
time. The interface may use a chart, table, or both, but it must not imply that
metrics with different units share one comparable scale.

Users can focus one metric without losing the underlying values for the other
teams. Ties remain ties rather than being broken by favorite-team priority.

## Data trust and refresh

The realization may combine schedule, score, ranking, and statistical data from
different providers. It must retain enough attribution to explain the source
and update time of each visible data class.

The configured freshness thresholds determine when information becomes stale.
A refresh failure may preserve the last known value only with its prior update
time and a stale or unavailable label. It must not replace a known value with
zero, clear a final score, or make stale data appear current.

If providers disagree, the application may select one declared source of record
for a data class or present the conflict. It must not silently average,
reconcile, or overwrite contradictory scores or rankings.

## Interaction and responsive behavior

- Team, season, week, ranking-source, metric, and schedule filters have visible
  current values.
- Keyboard users can reach every control and team or game detail.
- Focus remains visible against the chosen visual treatment.
- Motion honors reduced-motion preferences and is not required to understand a
  score, status, or trend.
- On narrow screens, information is reorganized without hiding freshness,
  status, source, or the identity of either team.
- Color can reinforce a team or status but cannot be the only carrier of
  meaning.

## Failure and boundary behavior

1. The product distinguishes an empty watchlist configuration error from a week
   with no games.
2. One unavailable provider does not erase still-valid data from another data
   class.
3. An unknown team mapping is surfaced for correction rather than assigned to
   another program.
4. A timezone conversion preserves the actual instant and labels the displayed
   timezone.
5. A refresh cannot regress a final game to an earlier live state without an
   explicit source correction.
6. Historical rankings and results remain attached to their original season.

## Out of scope

The core does not require accounts, social features, notifications, wagering
odds, predictions, recruiting, player health information, play-by-play,
ticketing, video, merchandise, or administrative editing of official data.
Adding any of these requires separate intent and acceptance behavior.

## Observable success

Using the configured example, a user can open the dashboard, understand the
current state and freshness of four watched teams, inspect a team's season,
distinguish live/final/postponed states, compare teams using defined metrics,
review ranking history without fabricated continuity, and use the primary
surfaces on desktop and mobile with a keyboard.

## Decision latitude

The implementing agent may choose the data providers, storage and caching
strategy, framework, navigation structure, chart implementation, and visual
system. It must preserve the product semantics, configured terminology,
freshness rules, source attribution, accessible alternatives, and failure
behavior above.

## Root acceptance

# College Football Program Dashboard acceptance criteria

## Configuration and identity

### CFD-01 — Configured watchlist

The dashboard shows every configured team exactly once and gives the configured
favorite visual priority without hiding or changing another team's values.

### CFD-02 — Stable team mapping

Provider data is mapped to configured team IDs without silently substituting or
merging similarly named programs.

### CFD-03 — Season isolation

Changing the selected season changes season-scoped schedules, records,
rankings, and statistics together; observations from another season are not
presented as part of the selected season.

## Overview and navigation

### CFD-04 — First useful view

The initial view shows the selected season/week, freshness, all watched-team
snapshots, watched live or recent games, next games, and comparison context
without requiring a decorative welcome step.

### CFD-05 — Preserved working context

Opening a team and returning preserves the user's season, week, ranking source,
comparison metric, and practical navigation context.

### CFD-06 — Visible controls

The current team, season, week, ranking source, comparison metric, and schedule
filters are visible and understandable wherever they affect the displayed data.

## Games and schedules

### CFD-07 — Status distinctions

Scheduled, delayed, in-progress, halftime, final, postponed, and canceled games
are visually and semantically distinguishable.

### CFD-08 — Score honesty

A score appears only when meaningful for the game's state. Missing scores are
not displayed as zero, and a final score is not cleared by a failed refresh.

### CFD-09 — Time and venue

Every scheduled game displays a date/time with labeled timezone and a venue or
explicit unknown-location state.

### CFD-10 — Final-state protection

A normal refresh does not regress a final game to an earlier live state. A
source correction is labeled as a correction.

## Rankings and comparison

### CFD-11 — Ranking-source identity

Every ranking value identifies its source and poll date.

### CFD-12 — Unranked versus unavailable

The dashboard distinguishes an explicitly unranked team from a missing or
unavailable ranking observation.

### CFD-13 — Honest ranking gaps

A ranking trend preserves unknown or unranked gaps and does not draw fabricated
continuous observations through them.

### CFD-14 — Defined comparison metrics

Every comparison metric shows its label, definition, unit, season scope, value,
source, and update time.

### CFD-15 — Comparable scales

The interface does not plot unlike units on one unlabeled scale or otherwise
imply direct numeric comparability where none exists.

### CFD-16 — Ties remain ties

Equal values remain tied; favorite-team status does not break or disguise a
tie.

## Freshness and source behavior

### CFD-17 — Data attribution

Schedule, score, ranking, and statistical data expose their source and last
successful update with enough specificity to explain mixed-provider data.

### CFD-18 — Stale and unavailable states

Current, stale, updating, and unavailable data are distinguishable. A failed
refresh does not turn a last-known value into a current value or a misleading
zero.

### CFD-19 — Partial provider failure

Failure of one provider or data class does not erase still-valid data from
another; the affected surface explains what is unavailable.

### CFD-20 — Provider disagreement

When selected providers disagree about a score or ranking, the product follows
a declared source of record or exposes the conflict rather than silently
averaging or overwriting it.

## Accessibility and responsive behavior

### CFD-21 — Keyboard operation

Every primary control, team selection, game detail, and comparison interaction
can be completed with a keyboard and has a visible focus indicator.

### CFD-22 — Non-color meaning

Team identity, game status, freshness, ranking state, and comparison results do
not rely on color alone.

### CFD-23 — Accessible chart alternative

Every data-critical chart has an adjacent textual or tabular representation of
the values needed to understand it.

### CFD-24 — Reduced motion

The dashboard honors reduced-motion preferences without removing information
or preventing an interaction.

### CFD-25 — Narrow-screen completeness

At a 320 CSS-pixel viewport, the primary surfaces remain usable without losing
team/opponent identity, score/status, freshness, or source information.

### CFD-26 — State coverage

The realization demonstrates loading, empty, stale, unavailable, and partial
data states in addition to the normal populated state.

## Implementation profile state

Selection status: recorded.

### org.seedspec.examples.college-football-dashboard-andromeda

- **Independent web interface** (`independent-web`): Implement the dashboard in a suitable web stack and choose visual components after inspecting the target project.
  - Prerequisite [environment-inspection; evidence optional]: The target can deliver an interactive web interface with responsive layouts and accessible controls.
    - Inspect the existing project and preserve its framework, component conventions, and dependency policy when practical.
- **AI Canvas Andromeda reference** (`andromeda-reference`) — preferred: Use the bundled public Andromeda v1 component subset and design rules as the preferred visual realization while preserving the dashboard's product semantics.
  - Preserved guidance: `implementation-profiles/org.seedspec.examples.college-football-dashboard-andromeda/andromeda-reference/andromeda-profile.md`
  - Prerequisite [environment-inspection; evidence optional]: The target uses React or can faithfully adapt React reference source without replacing a user-selected application architecture.
    - Inspect the actual project before adding dependencies or copying source.
  - Prerequisite [tool-check; evidence optional]: The project permits the dependencies required by the selected Andromeda component subset.
    - Compare the component-set dependency inventory with the target package manifest and dependency policy.
  - Blocker check [document-review; evidence optional]: A required existing brand or design system forbids a faithful Andromeda visual treatment.
    - Prefer the user's governing visual system and treat Andromeda as declined reference material.


## Completion scope

- complete-dashboard-acceptance: all of org.seedspec.examples.college-football-dashboard-andromeda/acceptance; prove realization by manual-observation at completion

## Technical preferences

No technical preferences were supplied. The execution engine retains implementation freedom.

## Package-authored task sequences

No selected package declares an implementation task sequence.

## Preserved components

- org.seedspec.examples.college-football-dashboard-andromeda/acceptance: components/org.seedspec.examples.college-football-dashboard-andromeda/acceptance/ — review before-completion-claim
- org.seedspec.examples.college-football-dashboard-andromeda/reference: components/org.seedspec.examples.college-football-dashboard-andromeda/reference/ — review before-planning

## Discovered artifacts

No selected package declares optional artifacts.

## Author-declared implementation resources

These resources express author guidance and discovery policy. They do not prove implementation capability or authorize tool execution:

- org.seedspec.examples.college-football-dashboard-andromeda/org.seedspec.guidance.context7-current-docs@0.1.0: instructions; available; exact
- org.seedspec.examples.college-football-dashboard-andromeda/org.seedspec.guidance.andromeda-college-football-dashboard@0.1.0: skill; recommended; exact

## Resolved decisions

No declared decisions were answered during resolution.

## Declared capabilities

- org.seedspec.examples.college-football-tracking@1.0.0 — org.seedspec.examples.college-football-dashboard-andromeda@0.2.0

## Capability and composition declaration review

No selected package declares capability expectations.

### Composition review records

No concern is visible from package declarations. This does not establish implementation compatibility.

## Unresolved solution decisions

No package-declared decisions remain unresolved. An implementing agent must still surface any new semantic conflict it discovers.
