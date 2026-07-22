# Operations Dashboard Starter Kit acceptance criteria

## Access and trust

1. A viewer, operator, and administrator see only records, fields, metrics, and
   actions allowed by their role and scope.
2. A summary count does not reveal restricted records.
3. Every metric displays its configured label, meaning, format, time context,
   and freshness.
4. A stale or failed metric is not presented as current or replaced by a
   misleading zero.
5. Empty, zero, unavailable, updating, stale, and restricted states are
   distinguishable.

## Queue and investigation

6. A user can search, filter, and sort configured records.
7. Active criteria are visible, removable, and reproducible.
8. Queue totals use the same filters and authorization scope as visible rows.
9. Opening and closing a record preserves the user's working context.
10. Record identity remains stable across refresh, pagination, saved views, and
    export.
11. Record detail separates current state from attributed activity history.

## Views, actions, and export

12. A private saved view is visible only to its creator.
13. Under `private-and-team`, an authorized user can publish a team view without
    exposing records to a broader audience.
14. Disabled action types are unavailable.
15. An enabled action is authorized again when executed and records actor,
    time, prior value, and new value.
16. Retrying a confirmed action does not duplicate its effect or activity.
17. A bulk action previews the affected count and reports every ineligible or
    failed record.
18. Partial bulk success is labeled partial rather than complete.
19. Under `authorized-view`, an export matches the authorized visible filter
    context and excludes restricted fields.
20. An export records creator, time, filters, columns, and row count.
21. Under `disabled`, no export can be created.

## Conflicts and configuration

22. Concurrent edits result in one accepted current state and let the later
    actor review the conflict.
23. A failed mutation creates no success activity entry.
24. Every current status is one of the configured values.
25. Historical actions remain understandable after a prospective label or
    status configuration change.

