# Customer Onboarding Orchestrator

## Purpose

Customer Onboarding Orchestrator closes the gap between an approved commercial
handoff and a successfully started customer relationship. It turns one
authorized handoff into an owned plan, prevents prerequisite details from
falling through system boundaries, keeps internal and customer-visible state
distinct, and makes stalled work visible before a target is missed.

The workflow may be realized by configuring existing systems, coordinating them
through an approved automation platform, or operating a dedicated service. The
selected implementation profile changes the execution path, not the core
outcome or acceptance criteria.

## Actors and authority

### Handoff owner

The handoff owner supplies the approved commercial context, confirms required
source information, and answers or routes commercial questions. They cannot
declare delivery milestones complete unless also assigned that delivery role.

### Onboarding owner

The onboarding owner accepts or returns the handoff, owns the current plan,
assigns milestone owners, resolves blockers, approves exceptional changes, and
performs final sign-off when configured.

### Milestone owner

A milestone owner updates only assigned work, records evidence or notes, and
raises blockers. Completion of one milestone does not grant authority over the
whole onboarding case.

### Customer contact

The customer contact receives only explicitly customer-visible updates and may
provide requested information. Internal notes, risk assessments, commercial
terms, and system diagnostics are never exposed through a customer update.

### Workflow system

The system creates the case, schedules reminders, calculates staleness,
delivers configured updates, and records delivery evidence. It does not infer
that a real-world outcome happened solely because a message or task was
created.

## Domain concepts and lifecycle

- **Approved handoff** — one authoritative signal plus source identity and
  required commercial context.
- **Onboarding case** — the stable coordination boundary for one customer
  onboarding effort.
- **Milestone** — required work with an owner role, state, due context, and
  customer-visibility classification.
- **Blocker** — an explicit impediment with owner, opened time, severity, and
  resolution.
- **Update** — an internal or customer-visible communication derived from
  current state.
- **Evidence entry** — an attributed record supporting a milestone or workflow
  claim.

The onboarding case states are:

```text
awaiting-acceptance -> active -> ready-for-completion -> completed
          |              |                |
          v              v                v
       returned       stalled          active
```

- `returned` requires a reason and routes the handoff back to its owner.
- `stalled` is a visible condition on an active case, not a terminal state.
- `ready-for-completion` means every required milestone is complete and no
  unresolved completion blocker remains.
- `completed` is terminal for normal operation. Corrections append history and
  require an explicit exceptional reopen rather than silent state rewriting.

## Core workflow

### Start once from an approved handoff

1. The configured start condition arrives with a stable source identifier.
2. The workflow verifies that the event is authorized and includes enough
   information to identify the customer, handoff owner, and onboarding scope.
3. It creates exactly one onboarding case and the configured milestone set.
4. A repeated event with the same source identity returns the existing case and
   creates no duplicate milestones or messages.
5. The onboarding owner accepts the case or returns it with a specific missing
   or conflicting requirement.

Creating a record, project, channel, folder, or task in an external system is
an implementation action. The workflow treats those as linked realization
artifacts, not as separate onboarding cases.

### Coordinate milestones and blockers

1. Required milestones receive an owner and target context before the case
   becomes active.
2. An owner moves eligible work from not started to in progress, blocked, or
   complete and supplies the evidence required by local policy.
3. Blocking a milestone opens or links a blocker and prevents that milestone
   from counting as complete.
4. Resolving a blocker records who resolved it, when, and how; it does not
   automatically complete the milestone.
5. Changes to owner, due context, requirement, or completion are attributed.

Milestone states are `not-started`, `in-progress`, `blocked`, `complete`, and
`waived`. Waiver is exceptional, requires an authorized actor and reason, and
remains visible in completion evidence.

### Communicate current state

Internal participants can see current milestone status, owners, blockers,
target, last meaningful progress, and update delivery state. Customer updates
follow the configured cadence and include only customer-visible milestone and
request information.

A successful send proves delivery acceptance by the configured channel, not
that the customer read the update or that the milestone outcome occurred. A
failed customer update is visible and retryable without duplicating case state.

### Detect and escalate stalled work

The workflow measures business days since the last meaningful progress on an
incomplete required milestone. At the configured threshold it marks the case
stalled, identifies the affected milestone, and sends one escalation for that
stalled episode. Additional reminders may occur, but retries must not create
duplicate episodes or erase acknowledgement.

Completing, unblocking, or substantively advancing the affected milestone
resolves the stalled episode. Merely opening the case or sending a reminder is
not meaningful progress.

### Complete the onboarding

1. Every required milestone is complete or explicitly waived.
2. No unresolved completion blocker remains.
3. The case enters `ready-for-completion` and shows a completion summary.
4. When owner sign-off is configured, the onboarding owner confirms the
   summary; otherwise the workflow may complete automatically.
5. Completion records milestone outcomes, waivers, open non-blocking follow-up,
   actor, and time.

An external system update that fails during completion leaves the case ready
for completion or explicitly partially synchronized. It must not claim a
fully completed cross-system outcome while required state is inconsistent.

## Security, privacy, and audit boundaries

The workflow uses the minimum customer and commercial data needed for
coordination. Credentials, private keys, access tokens, and connection secrets
never appear in the SeedSpec package or customer-visible messages. Every
external connection and destination requires environment-level authorization.

Internal notes and restricted source fields remain internal even when a
customer update is derived from the same case. Removing a participant's access
does not remove their historical attribution.

## Invariants and failure behavior

1. One approved source identity produces at most one onboarding case.
2. One configured milestone ID appears at most once in that case.
3. Required ownership cannot be silently dropped.
4. A customer-visible update never includes internal-only content.
5. A failed external write is visible and safely retryable.
6. Retries do not duplicate cases, milestones, stalled episodes, or attributed
   activity.
7. Concurrent milestone decisions settle on one current state and preserve the
   accepted history.
8. Missing required source information returns the handoff or holds it for
   review; it never invents customer facts.
9. Configuration changes do not rewrite completed cases or prior evidence.
10. Completion evidence distinguishes configured-system state, message
    delivery, and real-world outcome claims.

## Out of scope

The core workflow does not negotiate contracts, collect payment, provision
product access without separate authority, infer customer sentiment, replace
professional services delivery, or choose the organization's systems. Data
migration, identity provisioning, and domain-specific implementation work may
be represented as milestones but require their own authorized execution.

## Observable success

An approved handoff creates one owned case, required work remains visible,
missing input can be returned, blockers and stalls escalate once per episode,
customer communications exclude internal data, and completion is supported by
attributed milestone state and evidence across the selected implementation
profile.

## Decision latitude

The implementing agent may choose the profile only after its prerequisites and
blockers are inspected with the end user. It may select system mappings,
interaction patterns, message presentation, technical architecture, and
operational instrumentation. It must not broaden system access, customer data,
message recipients, or automatic completion authority beyond the configured
intent.
