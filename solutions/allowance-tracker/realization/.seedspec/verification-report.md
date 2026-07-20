# SeedSpec verification report

Status: alpha use case verified

## Implemented use cases

- A guardian creates a Bhore and assigns one occurrence to a child.
- The child sees and submits their own assignment.
- A guardian approves submitted work; one immutable earning is recorded and the child's balance is derived from the ledger.
- Retrying approval returns the existing earning rather than duplicating value.
- Approved assignments contribute to a current and longest daily streak under a stable household time zone.
- A renamed local work concept (`Bhore`) integrates with a feature written against the `chores` capability after an explicit contract-revision review.

## Acceptance evidence

| SeedSpec criterion | Result | Evidence | Notes |
| --- | --- | --- | --- |
| Allowance 2, 4: child authority and own-assignment visibility | pass | `test/domain.test.js` — role and ownership test | Child cannot create work or submit another child's assignment. |
| Allowance 6: create work and one-time assignment | pass | domain workflow and HTTP workflow tests | Uses local Bhore terminology. |
| Allowance 9: edits do not rewrite an occurrence | pass | domain workflow test | Assignment retains its title snapshot. |
| Allowance 10: archival blocks new assignments and preserves history | pass | archived-Bhore test | Historical occurrence remains recognizable. |
| Allowance 11–13: approval timing, one earning, retry safety | pass | domain workflow test | Balance is zero until approval; retried approval returns the same transaction. |
| Allowance 16: displayed balance equals transaction sum | pass | domain and HTTP workflow tests | One $5.00 or seeded $2.50 earning produces the corresponding balance. |
| Streaks 1–3: distinct approvals and one qualifying day | pass | streak derivation test | Two approvals on one day still produce one qualifying day. |
| Streaks 5–8: current/longest progression and missed days | pass | streak derivation test | An unfinished today does not break yesterday's run; a missed completed day breaks current but not longest. |
| Streaks 10, 12, 14: zero reward, deterministic derivation, stable time zone | pass | streak derivation test and implementation inspection | Zero-value approved work qualifies under selected configuration. |
| HTTP user path | pass | `test/server.test.js` | Seeded assignment moves available → submitted → approved through the real HTTP surface. |

## Commands

```text
npm test --workspace @seedspec/reference-allowance-tracker
```

Result: 5 tests passed, 0 failed.

## Manual checks

- The server starts at `http://127.0.0.1:4173` and serves the application, stylesheet, script, health endpoint, and state API.
- Browser-plugin visual automation was attempted but its local connection failed during setup; visual interaction remains a manual follow-up rather than claimed evidence.

## Remaining gaps

- This report proves the selected vertical slice, not all 23 Allowance Tracker or all 17 Chore Streaks criteria.
- Persistence, production authentication, recurrence, concurrency under a real datastore, and additional configuration variants remain unimplemented by design.
