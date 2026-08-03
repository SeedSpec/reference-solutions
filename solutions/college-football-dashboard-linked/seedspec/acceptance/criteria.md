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
