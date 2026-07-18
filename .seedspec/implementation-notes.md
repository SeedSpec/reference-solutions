# SeedSpec implementation notes

This is a concise current-state record for future implementing agents, not an exhaustive changelog.

## Local terminology and concept mappings

- The application calls a SeedSpec `Chore` a **Bhore** in its interface, HTTP resources, and domain model. `bhore.id` is the stable work-description identity required by `org.seedspec.core.chores`.
- A Chore Streaks `owner` maps to a child actor. A qualifying occurrence maps to a distinct approved assignment. The assignment's `approvedAt` timestamp supplies the qualifying event time.

## Capability revision review

- Chore Streaks was tested against `org.seedspec.core.chores` 1.0.0; the selected application supplies 1.1.0.
- The 1.0.0 historical contract and current 1.1.0 contract were reviewed before implementation. Revision 1.1.0 expands the written behavioral surface and explicitly permits local vocabulary; it does not remove stable identity, descriptive fields, archival state, or prospective-change behavior used by Chore Streaks.
- Integration therefore preserves the Bhore terminology and uses assignment history directly. No compatibility adapter or data migration is needed for this experiment.

## Architecture and integration choices

- Node.js 20 with no external runtime dependency serves a single-page interface and a small JSON HTTP API.
- Domain behavior is isolated in `src/domain.js`; HTTP and presentation choices are replaceable implementation details.
- Transactions are append-only and balances are derived by summing them.
- Assignment occurrences snapshot the Bhore title and proposed reward.
- Streaks are rebuilt from approved assignment history in the household's stable `America/Chicago` time zone. They are not incremented counters.

## Known limitations and follow-up

- State is intentionally in memory for the alpha experiment and resets when the process restarts.
- Authentication is represented by the interface's actor switcher rather than production identity infrastructure.
- The verified slice covers one-time assignments, approval-required earnings, access boundaries, archival history, and daily streak derivation. Recurrence, invitations, overdue expiration, and every configuration branch remain outside this reference slice.
