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
