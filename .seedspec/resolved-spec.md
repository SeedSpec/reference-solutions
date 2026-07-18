# Resolved SeedSpec: Allowance Tracker

> This file records resolved product intent. It is an input to planning and implementation, not generated application code.

## Project summary

- Application: org.seedspec.examples.allowance-tracker@0.1.0-alpha.1
- Application digest: sha256:d3303a5c6feccd7e936a9b64e186a6ed2c78722044c7e84008d0a3539dd29084
- Features: org.seedspec.chore-streaks@0.1.0-alpha.1
- Protocol: 0.1

## Product configuration

### Allowance Tracker

```yaml
household_mode: multiple-guardians
child_access: child-sign-in
approval_required: true
currency:
  code: USD
  display_name: dollars
  decimal_places: 2
recurring_allowance:
  enabled: true
  cadence: weekly
  weekday: friday
chore_rewards:
  allow_zero_value: true
  allow_negative_adjustments: true
  allow_negative_balances: false
overdue_policy: remain-available
balance_visibility: child-own-balance
transaction_corrections: append-only-adjustments
```

## Application definition

# Allowance Tracker

## Purpose

Allowance Tracker helps a household make expectations visible, recognize completed work, and maintain a balance that children and guardians can trust. It replaces ad hoc memory and spreadsheets with a clear record of assignments, approvals, earnings, and adjustments.

The product tracks allowance units. A unit may represent money or another household reward, but every household uses one configured currency or unit label consistently. The SeedSpec does not prescribe payment processing or custody of real funds.

## Intended users and outcomes

### Guardians

Guardians establish the household, manage participating children, define chores and assignments, approve or reject submitted work, and make explicit balance adjustments. They need a reliable answer to what is due, what awaits review, and why a child's balance changed.

### Children

Children see their own assignments and balance. When child access is enabled, they can mark work complete, review feedback, and inspect their own transaction history. In parent-managed mode, a guardian performs those actions with the child.

## Domain concepts

- **Household** — the boundary for actors, chores, assignments, and one allowance unit.
- **Actor** — a guardian or child participating in a household.
- **Chore** — a reusable description of work, with an optional suggested reward and instructions.
- **Assignment** — one occurrence of a chore assigned to one child, either one-time or produced from a recurring schedule.
- **Approval** — a guardian's decision on a submitted assignment.
- **Balance** — the sum of immutable transactions for one child.
- **Transaction** — an earning or adjustment with an amount, reason, actor, and related assignment when applicable.

## Permissions

| Action | Guardian | Child |
| --- | --- | --- |
| Manage household settings and participants | Yes | No |
| Create, edit, archive chores | Yes | No |
| Create and change assignments before submission | Yes | No |
| Submit assigned work | Yes | Own assignments when child access is enabled |
| Approve or reject submitted work | Yes | No |
| View balance and history | Any child in household | Own only |
| Create balance adjustments | Yes | No |

An actor never reads or changes another household's data. Archived participants retain historical attribution but cannot receive new assignments or act in the product.

## Core workflows

### Establish a household

1. A guardian creates a household and selects its unit or currency.
2. The guardian adds at least one child.
3. If child access is enabled, each child receives a distinct identity; otherwise guardians operate the child workflow in parent-managed mode.
4. A guardian may invite another guardian when household policy permits multiple guardians.

The first guardian cannot remove their own final guardian access while active children or unsettled records remain.

### Define and assign a chore

1. A guardian creates a chore with a title, optional instructions, and non-negative suggested reward.
2. The guardian assigns it to one child as a one-time assignment or defines a recurring schedule.
3. Each recurring occurrence becomes a distinct assignment with its own due date and lifecycle.
4. Editing a chore changes future assignments; it does not rewrite submitted, approved, rejected, or previously generated historical assignments.

Two children assigned the same chore receive separate assignments. Completing one never completes the other.

### Complete and review work

1. An available assignment is marked complete and becomes submitted.
2. When approval is required, no earning is created until a guardian approves it.
3. A guardian may approve the submitted reward amount or enter a different non-negative amount with a reason.
4. Approval creates exactly one earning transaction linked to the assignment and makes the assignment approved.
5. A rejection requires feedback and returns the assignment to rejected. The child or guardian may resubmit it unless the assignment was cancelled.

When approval is disabled, submission atomically creates one earning transaction and marks the assignment approved. Retrying a submission must never create a duplicate earning.

### Review allowance accounting

The displayed balance is derived from transactions, not edited directly. History shows newest activity first and includes amount, reason, effective date, acting guardian or system, and the related assignment when present.

A guardian corrects an error by adding a compensating adjustment. Approved earning transactions are not silently edited or deleted. Adjustments may be positive or negative when configuration permits, and every adjustment requires a reason.

## State models

### Assignment states

```text
available -> submitted -> approved
    ^            |
    |            v
    +--------- rejected

available -> cancelled
rejected  -> cancelled
```

- Only available or rejected assignments can be submitted.
- Only submitted assignments can be approved or rejected.
- Approved assignments are historical and cannot return to an earlier state.
- Cancelling an assignment creates no earning and preserves an audit record.

### Participant states

Participants are active or archived. Archiving blocks new activity but preserves names on historical assignments, approvals, and transactions.

## Business rules

1. All amounts use the household's configured unit and precision.
2. A balance equals the sum of that child's transactions.
3. One assignment can produce at most one earning transaction.
4. Transaction history is append-only from the product user's perspective.
5. A submitted assignment captures the chore title and proposed reward used for that occurrence.
6. Recurrence generation is idempotent: retrying it does not create duplicate occurrences.
7. An assignment belongs to exactly one household and one child.
8. Guardians can act only within households where they are active guardians.
9. Children can act only on their own eligible assignments.
10. Currency or unit changes do not reinterpret existing amounts; changing units after transactions exist requires an explicit migration outside the core workflow.

## Configuration behavior

- `household_mode` decides whether a household may have multiple active guardians.
- `child_access` decides whether children sign in or a guardian manages their workflow.
- `approval_required` decides whether submission waits for review or earns immediately.
- `recurring_allowance` can add a scheduled base allowance independent of chores.
- `overdue_policy` decides whether an overdue assignment stays actionable or expires.
- `balance_visibility` decides whether children can see their own balance.
- correction and negative-balance settings constrain guardian adjustments.

Configuration changes apply prospectively. Existing transactions and completed assignment decisions remain historical facts.

## Edge and failure behavior

- A repeated approval or submission request is safe and does not duplicate money.
- If a transaction cannot be recorded, the assignment does not become approved.
- An archived chore remains visible on history but cannot create new assignments.
- Archiving a child cancels future unsubmitted occurrences but preserves submitted and historical records for guardian review.
- When the overdue policy expires work, expiration produces no earning and cannot be reversed by a child.
- A negative adjustment that would cross zero fails unless negative balances are enabled.
- A reward amount of zero is valid only when zero-value chores are enabled.
- Simultaneous guardian decisions on one submission result in one accepted decision; the other receives the current state.

## Out of scope for the core application

Savings goals, bank transfers, debit cards, tax treatment, marketplace payments, notifications, chore streaks, and printable charts are optional features. Authentication mechanics, storage, framework, hosting, and visual design are implementation choices.

## Conformance

A faithful implementation satisfies the observable criteria in `acceptance/criteria.md` for the selected configuration. Navigation and technical architecture may vary.

## Application acceptance

# Allowance Tracker acceptance criteria

Unless a criterion names a configuration, it applies to every implementation.

## Household and access

1. A guardian can create a household and add a child.
2. A child cannot manage household settings, participants, chores, approvals, or adjustments.
3. An actor cannot access another household's records.
4. In `child-sign-in` mode, a child can see and submit only their own assignments.
5. In `parent-managed` mode, no child sign-in is required to complete the core workflow.

## Chores and assignments

6. A guardian can create a chore and make a one-time assignment to one child.
7. A recurring assignment creates distinct, non-duplicated occurrences.
8. Assigning the same chore to two children creates independent assignments.
9. Editing a chore does not rewrite an already submitted or historical assignment.
10. An archived chore cannot create new assignments and remains recognizable in history.

## Approval and accounting

11. With approval required, submission creates no earning until a guardian approves it.
12. Approval creates exactly one earning transaction for the approved amount.
13. Retrying approval or concurrent approval cannot create a second earning.
14. Rejection requires feedback and permits a later resubmission.
15. With approval disabled, submission and earning creation succeed or fail together.
16. A child's displayed balance equals the sum of that child's transactions.
17. A guardian correction creates a new attributed adjustment rather than editing history.
18. An adjustment that would make the balance negative fails when negative balances are disabled.

## Configuration and failures

19. A zero-value reward follows `allow_zero_value`.
20. An overdue assignment follows the selected overdue policy.
21. Disabling child balance visibility prevents children—but not guardians—from viewing it.
22. If transaction creation fails during approval, the assignment is not approved.
23. Historical transaction amounts and units do not change when prospective configuration changes.

## Feature: Chore Streaks

Package: org.seedspec.chore-streaks@0.1.0-alpha.1

Digest: sha256:849b0cd3c96ba1d5e7da65cce23cdc2e41c238ec27e2e06a3f171f6ebbe81e77

### Selected feature configuration

```yaml
qualification: approved
daily_target: 1
day_boundary: household-local
include_zero_reward: true
show_longest: true
```

### Feature definition

# Chore Streaks

## Outcome

Chore Streaks gives a child and their guardian a lightweight view of consistency: the child's current run of qualifying days and their longest historical run. It recognizes completed work without changing chore rewards, approvals, balances, or assignment history.

The host may use different words for chores, children, assignments, or approvals. Integration depends on the observable concepts, not those display names.

## Required host concepts

- A stable actor corresponding to the person whose work contributes to a streak.
- Reusable work definitions and occurrence-level assignments.
- A trustworthy approval or completion outcome for each qualifying occurrence.
- A stable event time that can be assigned to one calendar day under the selected day boundary.
- Historical qualifying events sufficient to rebuild streaks.

## New concepts

- **Qualifying day** — a local calendar day on which the owner reaches the configured number of distinct qualifying assignments.
- **Current streak** — consecutive qualifying days ending today, or ending yesterday when today is still in progress.
- **Longest streak** — the greatest number of consecutive qualifying days in retained history.

Streak values are derived from qualifying events. They are not user-editable counters.

## Visibility and authority

An owner may view their own streak wherever the host allows them to view their assignments. A host authority, such as a guardian, may view the streaks of actors they are authorized to administer. The feature does not broaden access to assignments or approval history.

## Workflows

### Qualify a day

1. A distinct assignment reaches the configured qualifying outcome.
2. The feature assigns the event to a day using the configured day boundary.
3. When the day's distinct qualifying assignment count reaches `daily_target`, the day qualifies.
4. Current and longest streak views reflect the new qualifying day.

Retries or repeated approval delivery for one assignment count once.

### Correct historical work

When a host-authorized correction changes whether an assignment qualifies or changes its effective completion day, streaks are rebuilt from the corrected historical facts. The correction does not erase the host's audit history.

## Business rules

1. One assignment contributes at most once.
2. Several qualifying assignments on one day produce one qualifying day.
3. Calendar days follow one stable household-level time zone when `day_boundary` is `household-local`.
4. A streak is based on calendar adjacency, not elapsed 24-hour windows.
5. Today does not break a current streak until its local day has ended.
6. Archived actors retain historical streak evidence but do not accumulate new qualifying events.
7. Zero-reward work follows `include_zero_reward`.
8. Rejected, cancelled, or merely submitted work does not qualify when `qualification` is `approved`.

## Failure and history

- If the host cannot establish a stable event time, the assignment does not affect streak calculations until the time is known.
- Reprocessing the same history produces the same streak values.
- Temporary calculation failure does not change assignment, approval, or accounting state.
- Removing the feature may remove the derived presentation but must not remove host assignment or approval history.

## Portability boundary

The host controls terminology, storage, screens, notifications, scheduling, and authentication. The feature defines streak meaning and evidence only. It does not prescribe a counter column, event processor, background job, or interface layout.

### Integration requirements

# Chore Streaks integration requirements

Map the portable streak owner to the host actor who owns qualifying assignments. Map the host's final accepted work outcome to `approved`, even when the application uses different terminology.

Before implementation, inspect local documentation and code for renamed or reshaped chore and assignment concepts. Preserve the application's vocabulary. Record a material mapping in `.seedspec/implementation-notes.md`; do not rename the application merely to match this package.

Use a stable occurrence identifier so retries and repeated event delivery count once. Use the host's preserved approval or completion history as the source of truth rather than a manually incremented counter.

When `day_boundary` is `household-local`, the host must establish one stable household time zone. If none exists, add an appropriate household-level choice and record the decision before calculating streaks. Do not silently use each viewer's browser time zone.

For Allowance Tracker, the child is the streak owner, an approved assignment is a qualifying occurrence, and the approval's effective time determines its calendar day.

### Feature acceptance

# Chore Streaks acceptance criteria

1. One approved qualifying assignment produces one qualifying day for its assigned owner.
2. Retrying or replaying the same approval does not count the assignment twice.
3. Several qualifying assignments on one calendar day increase the day's count but produce only one qualifying day.
4. A day qualifies only after its distinct qualifying assignment count reaches `daily_target`.
5. Consecutive qualifying calendar days increase the current streak.
6. An unfinished current day does not break a streak that qualified yesterday.
7. A completed non-qualifying day breaks the current streak.
8. The longest streak never decreases merely because the current streak breaks.
9. Rejected, cancelled, and submitted assignments do not qualify.
10. Zero-reward assignments follow `include_zero_reward`.
11. An owner cannot view another owner's streak without host authority.
12. Rebuilding from the same retained history produces the same current and longest streak values.
13. A historical correction updates the derived streak without deleting assignment or approval history.
14. Household-local day boundaries use one stable household time zone rather than the viewer's time zone.

## Technical preferences

No technical preferences were supplied. The execution engine retains implementation freedom.

## Discovered artifacts

These artifacts are preserved inputs, not automatically activated workflows:

- org.seedspec.examples.allowance-tracker/product-spec: org.seedspec.artifact.product-spec — artifacts/org.seedspec.examples.allowance-tracker/product-spec/allowance-tracker.product-spec.md

## Resolved decisions

No declared decisions were answered during resolution.

## Resulting capabilities

- org.seedspec.core.actors@1.0.0 — org.seedspec.examples.allowance-tracker@0.1.0-alpha.1
- org.seedspec.core.approvals@1.0.0 — org.seedspec.examples.allowance-tracker@0.1.0-alpha.1
- org.seedspec.core.assignments@1.0.0 — org.seedspec.examples.allowance-tracker@0.1.0-alpha.1
- org.seedspec.core.balances@1.0.0 — org.seedspec.examples.allowance-tracker@0.1.0-alpha.1
- org.seedspec.core.chores@1.1.0 — org.seedspec.examples.allowance-tracker@0.1.0-alpha.1
- org.seedspec.core.households@1.0.0 — org.seedspec.examples.allowance-tracker@0.1.0-alpha.1
- org.seedspec.core.transactions@1.0.0 — org.seedspec.examples.allowance-tracker@0.1.0-alpha.1
- org.seedspec.engagement.chore-streaks@1.0.0 — org.seedspec.chore-streaks@0.1.0-alpha.1

## Capability integration review

- **ALIGNED** org.seedspec.chore-streaks uses org.seedspec.core.actors; tested against 1.0.0, provider supplies 1.0.0.
- **REVIEW** org.seedspec.chore-streaks uses org.seedspec.core.chores; tested against 1.0.0, provider supplies 1.1.0.
- **ALIGNED** org.seedspec.chore-streaks uses org.seedspec.core.assignments; tested against 1.0.0, provider supplies 1.0.0.
- **ALIGNED** org.seedspec.chore-streaks uses org.seedspec.core.approvals; tested against 1.0.0, provider supplies 1.0.0.

## Unresolved product decisions

No package-declared decisions remain unresolved. An implementation agent must still surface any new semantic conflict it discovers.
