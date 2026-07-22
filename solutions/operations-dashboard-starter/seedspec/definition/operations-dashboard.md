# Operations Dashboard Starter Kit

## Purpose

Operations Dashboard Starter Kit describes the durable product behavior common
to strong internal operations tools: a trustworthy overview, a prioritized
record queue, fast investigation, controlled actions, and an audit trail. A
team supplies its own vocabulary, statuses, metric definitions, and operating
rules through configuration.

This is a product starter, not a visual theme or technical scaffold. A faithful
realization must make operational state understandable and safe to change even
when its screens, data architecture, and integrations vary.

## Actors and permissions

### Viewer

Viewers may inspect permitted metrics, records, and saved team views. They
cannot change operational state or export restricted fields.

### Operator

Operators have viewer access and may claim or reassign eligible records, change
status, add internal notes, and use enabled bulk actions within their scope.

### Administrator

Administrators manage role assignments, field visibility, team views, metric
definitions, and allowed actions. Administrative changes are attributed and do
not rewrite historical actions.

An actor sees only fields and records allowed by their role and scope. Counts,
filters, search results, exports, and record detail all apply the same access
boundary; summary numbers must not leak the existence of restricted records.

## Domain concepts

- **Workspace** — one configured operational area and its access boundary.
- **Record** — a stable business item with a status, owner, timestamps, visible
  fields, and activity history.
- **Metric** — a named calculation with a definition, value format, time window,
  and freshness state.
- **View** — a reproducible set of filters, sort order, and visible columns.
- **Action** — an authorized change to one or more records.
- **Activity entry** — immutable attribution for a consequential action.
- **Freshness state** — current, stale, unavailable, or updating for a metric or
  dataset.

## Information hierarchy

The realization provides four recognizable surfaces, though their navigation
and visual arrangement may vary:

1. **Overview** — configured metrics, freshness, trend context when available,
   and attention-worthy segments.
2. **Queue** — searchable, filterable, sortable records with a stable total and
   visible active filters.
3. **Record detail** — current fields, ownership, allowed actions, and activity
   history for one stable record.
4. **Administration** — role, visibility, metric, view, and action settings for
   administrators.

The first useful view prioritizes the team's operational work. Generic welcome
content, decorative charts, or global navigation must not displace current
metrics and records.

## Core workflows

### Understand current operations

1. A user enters the workspace and sees authorized metrics with their
   definition or an accessible explanation.
2. Every metric indicates its time window and freshness.
3. Selecting a metric or segment opens a record view whose filters explain the
   records represented by that value when such a drill-down is meaningful.
4. Empty, zero, stale, unavailable, and permission-restricted states are
   visually and semantically distinct.

### Find and investigate work

1. A user searches, filters, and sorts the record queue.
2. Active criteria remain visible and removable; clearing criteria restores a
   predictable default view.
3. Opening a record preserves the queue context so the user can return without
   reconstructing their work.
4. The detail surface distinguishes current state from historical activity and
   exposes only authorized fields and actions.

Search and filters are composable. Pagination or incremental loading must not
change the meaning of totals or cause already shown records to silently change
identity.

### Save and share a view

A private view is visible only to its creator. A team view is visible to the
authorized workspace audience and may be changed only by administrators or an
explicitly authorized owner. Updating a saved view creates a new current
definition without rewriting the filter context recorded on prior exports or
activity.

### Act on records

1. An operator selects one or more eligible records.
2. The product previews the action, affected count, and any ineligible records.
3. The operator confirms a permitted status or assignment change.
4. Each accepted change records actor, time, prior value, new value, and action
   context.
5. Retrying the same confirmed request does not duplicate its effect or notes.

Bulk actions are all-or-explicitly-partial. The result identifies which records
changed and why any did not; it never presents partial success as complete.

### Export a working set

When exports are enabled, a user exports the records matching the visible
authorized view. The export records its creation time, filters, column set,
creator, and row count. It excludes restricted fields and does not broaden
access because another user receives the file.

## Metric trust and freshness

Every configured metric has a stable identifier, human-readable definition,
format, and aggregation. A value is never displayed without enough context to
distinguish a count from a rate, duration, amount, or percentage. Percentages
identify their population when the label alone is ambiguous.

After the configured freshness threshold, a value is stale rather than
implicitly current. If a metric calculation fails, the last known value may be
shown only with its timestamp and unavailable or stale state. A failed refresh
does not replace a known value with a misleading zero.

## Invariants and failure behavior

1. Record identity is stable across search, views, exports, and refreshes.
2. Status values come from the configured lifecycle.
3. Every consequential mutation is authorized at execution time and attributed.
4. Metrics, totals, and exports honor the same record scope as the queue.
5. Empty means no matching authorized records; unavailable means the product
   could not determine the result.
6. Conflicting edits preserve one accepted current state and show the later
   actor what changed.
7. A failed action does not create a success activity entry.
8. Configuration changes apply prospectively and retain historical labels
   where needed to understand prior actions.

## Out of scope

The core does not prescribe a business domain, source system, warehouse,
framework, database, identity provider, chart library, hosting platform, or
deployment topology. Forecasting, automated decision-making, external customer
portals, and destructive record deletion require separate intent.

## Observable success

A configured team can trust the overview, reproduce a filtered working set,
investigate one record, perform an authorized and attributed action, save a
view, and export only permitted data. Stale, empty, unavailable, restricted,
conflicting, and partially successful states remain explicit.

## Decision latitude

The implementing agent may choose layout, interaction patterns, chart forms,
technical stack, data access strategy, caching, and integration approach. It
must preserve configured product language, access boundaries, metric meaning,
freshness, action safety, and observable acceptance behavior.
