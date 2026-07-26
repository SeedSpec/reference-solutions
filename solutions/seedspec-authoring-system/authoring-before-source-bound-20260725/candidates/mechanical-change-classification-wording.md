# Candidate: mechanical-change classification wording

- Status: **not applied.** Held pending the authoring-engine mechanical-operation
  contract and its conformance tests.
- Raised in: pass `0004-decision-provenance`
- Finding: `dp-mechanical-change-classification`
- Platform item: `pf-mechanical-operation-contract`
- Author instruction: record as platform feedback, not a blocking package
  question; do not apply this wording and do not add or renumber acceptance
  criteria yet. The package may reference the engine contract once it exists.

This file is authoring workspace state. It is not part of the distributable
package.

## Why it is held rather than rejected

The finding is valid: the mechanical basis is the only path around the fixed rule
that every agent-proposed document change requires explicit author acceptance.
The gap is a missing engine contract rather than missing package intent, so the
engine contract and its conformance tests should define the behavior first. The
wording below is preserved so the eventual package reference does not have to be
re-derived.

## Candidate replacement for `definition/solution.md` § Change control and concurrency

Replaces this sentence in the first paragraph:

> A deterministic mechanical change may apply within an already authorized engine
> operation, but remains recorded.

The stale-mutation sentence moves up into the first paragraph so the mechanical
rule can stand alone:

```
Every agent-proposed document change requires explicit author acceptance.
Every package mutation is visible, attributable to an author answer, supplied
source, mechanical operation, or agent proposal, and based on a known workspace
revision and package digest. A stale mutation fails with a conflict instead of
overwriting newer work.

A deterministic mechanical change may apply within an already authorized
engine operation. Only an operation the authoring engine explicitly declares
mechanical qualifies, and those declarations form a closed, documented,
deterministic set owned by the engine's operation contracts rather than
enumerated here. An authoring agent may never classify its own proposed
document edit as mechanical. A change that does not come from a declared
mechanical operation is an agent proposal and requires explicit author
acceptance. A mechanical result remains visible, attributable, revision-bound,
and reproducible.
```

## Revision needed before this is applied

The author's provisional default separates the document result from the
operation record: mechanical **document results** must be deterministic, while
operation metadata such as timestamps and revision identifiers may differ. The
draft's closing sentence says only "reproducible," which a strict reader could
extend to the whole mutation record including its metadata. Tighten that
sentence to scope determinism to the resulting document content before applying.

## Candidate acceptance criteria — deferred

Not to be added until the engine contract exists. Two clauses of the invariant
are not observable through any current criterion; visible, attributable, and
revision-bound are already covered by criterion 5.

```
A document change that does not originate from an engine-declared mechanical
operation is treated as an agent proposal and cannot alter package bytes
without a recorded author acceptance.

Re-running a declared mechanical operation on the same accepted input produces
the same package bytes and the same recorded basis.
```

If added later, placing them with the acceptance and attribution criteria shifts
the current criteria 6 through 16 by two positions with no text change.
