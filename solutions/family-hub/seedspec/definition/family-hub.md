# Family Hub

## Purpose

Family Hub gives a household one dependable place to answer four everyday
questions: what is happening, what needs doing, who owns it, and what changed.
It replaces scattered calendar entries, text threads, paper lists, and repeated
reminders with a shared schedule and task board that adults and children can
understand.

The core application coordinates events and tasks. Allowance tracking and meal
planning are optional modules selected per household. A faithful realization
may implement those modules directly or satisfy them through compatible
composed packages, but the selected user-facing behavior must remain coherent.

## Actors and authority

### Guardians

Guardians establish the household, manage membership and settings, create and
change any shared event or task, resolve conflicts, and view the complete
household history. At least one active guardian must always remain.

### Members

Members see events shared with them, view their tasks, update participation,
and complete eligible assignments according to household policy. A member
cannot change another person's assignment, household settings, allowance
ledger, or private event details.

### System activity

Scheduled reminders, recurring occurrences, and module-generated updates act
within the configured household timezone. System-created records are visibly
attributed to the system rather than to a person.

An actor never reads or changes another household's records merely by knowing
an identifier. Archived members keep historical attribution but cannot receive
new assignments or act in the household.

## Domain concepts

- **Household** — the membership, timezone, configuration, and data boundary.
- **Member** — a guardian or participating household member.
- **Event** — a scheduled occurrence with time, participants, visibility, and
  optional location or notes.
- **Task** — reusable or one-time work that can produce one or more independent
  assignments.
- **Assignment** — one member's actionable occurrence of a task.
- **Activity entry** — an attributed record of a consequential change.
- **Allowance entry** — an optional pending, earned, paid, or adjusted amount
  associated with one member.
- **Meal plan** — an optional dated meal entry linked to a shared grocery list.

## Core workflows

### Establish the household

1. A guardian creates a household and confirms its timezone.
2. The guardian adds members and chooses whether they participate directly or
   are managed by guardians.
3. Every invited person receives the intended role before they can see
   household details.
4. A guardian may archive a member, preserving that person's historical
   attribution while preventing new activity.

### Coordinate an event

1. An authorized person creates an event with a title, start, end or all-day
   status, participants, and visibility.
2. Invited members may record going, not going, or undecided.
3. Changing the time or cancelling the event creates one visible activity entry
   and makes the current state clear to participants.
4. A recurring event produces distinct, stable occurrences. Changing one
   occurrence does not silently rewrite the series or other exceptions.

When private details are supported, excluded members may see a blocked period
without its title, location, notes, or participant details. Guardians do not
gain access to another adult's private details solely because they are a
guardian; a realization must make its exact privacy boundary explicit.

### Assign and complete work

1. A guardian or authorized member creates a task with a title, assignee, due
   date, and optional recurrence.
2. Each assignee receives an independent assignment, even when several people
   share the same task template.
3. An eligible member marks their assignment complete.
4. Under self-completion, the assignment becomes completed immediately. Under
   guardian confirmation, it becomes awaiting confirmation until approved or
   returned with feedback.
5. A recurring task creates each occurrence once. Editing a template affects
   future occurrences and does not rewrite completed history.

Assignment states are:

```text
open -> awaiting-confirmation -> completed
  |              |
  +--------------+-> open (returned with feedback)
  +-> skipped
  +-> cancelled
```

The `awaiting-confirmation` state is used only when guardian confirmation is
configured. Completion, recurrence generation, and retry handling must not
duplicate assignments or rewards.

## Optional module: allowance tracking

When enabled, a guardian may attach a non-negative reward to a task, approve an
earned amount, record a payout, and add an attributed correction. A member may
see only their own balance and history unless the household chooses a stricter
visibility rule in a compatible addition.

The balance is derived from append-only entries. Approved earnings and payouts
are not silently edited or deleted; corrections use compensating entries with
a reason. One assignment produces at most one earning. The module records
household accounting and does not custody money, initiate bank transfers, or
claim that a payout occurred outside the application.

## Optional module: meal planning and groceries

When enabled, members can place meals on dated slots and add ingredients or
household items to one shared grocery list. List items may be grouped,
assigned, checked off, and restored. Removing a meal never silently deletes a
grocery item because the item may be needed elsewhere; suggested cleanup must
be an explicit user decision.

The module coordinates a plan and list. Recipe nutrition analysis, grocery
ordering, payment, delivery, and medical dietary advice are outside its core
intent.

## Notifications and attention

Reminders summarize current application state; they do not become a separate
source of truth. A retry may resend a visibly identical notification only when
delivery status is unknown, but it must not create duplicate events, tasks,
allowance entries, or grocery items. Disabled digests generate no daily digest.

The application presents overdue work and schedule conflicts without silently
reassigning, cancelling, or reprioritizing a person's commitments.

## Invariants and edge behavior

1. Every record belongs to exactly one household.
2. All date boundaries and recurrences use the household timezone, including
   daylight-saving transitions.
3. A member sees only records and details allowed by membership, role, and
   visibility.
4. Archiving preserves historical names and attribution.
5. Repeated or concurrent consequential actions settle on one current state.
6. An end time cannot precede an event start.
7. Cancelling an event or assignment preserves its audit trail.
8. A failed allowance write cannot leave a task approved as rewarded without
   the corresponding earning entry.
9. Disabling an optional module preserves its history and stops new module
   activity; it does not erase records.
10. Configuration changes apply prospectively unless the product explicitly
    previews and confirms a migration.

## Failure and recovery

Validation explains which user-correctable value is invalid without discarding
the rest of an edit. Conflicting edits preserve the accepted current state and
let the later actor review it. If recurrence generation or notification
delivery fails, guardians can see the affected operation and retry safely.
Offline behavior, synchronization mechanics, authentication, storage,
framework, hosting, and visual design are implementation decisions.

## Observable success

A household can establish membership, coordinate a changed event, assign and
complete recurring work, and inspect who changed consequential state. Enabled
modules satisfy their conditional acceptance criteria without weakening the
core privacy, attribution, or idempotency rules.

## Decision latitude

The implementing agent may choose interaction patterns, navigation, calendar
presentation, data architecture, reminder channels, and technical stack. It
must not invent broader guardian surveillance, external payments, destructive
history rewriting, or cross-household sharing. Any such expansion requires
explicit end-user direction outside this package.
