# SeedSpec Authoring System

## Purpose

Package authors need to turn ideas, existing documents, and working solutions
into specifications another person or agent can understand without inheriting
the original conversation. The authoring system must help them preserve source
intent, expose material uncertainty, make consequential changes deliberately,
and export an ordinary portable SeedSpec package.

The system provides one headless authoring engine with first-party CLI and web
workbench frontends. Both frontends operate on the same versioned authoring
semantics. They may present different interactions, but an accepted package,
review history, deterministic result, and error condition must mean the same
thing in either interface.

Parity applies to durable authoring artifacts, not to an identical capability
set. The web workbench may include an embedded agent that helps an author
explore and make decisions while the CLI composes with a separately supplied
agent or direct commands. Accepted sources, questions, answers, findings,
changes, and package documents use the same engine records either way.

## Obligations and boundaries

### Participants and authority

- The **package author** supplies source material, owns material product
  decisions, accepts or rejects consequential changes, and decides when the
  package is ready to export.
- A replaceable **authoring agent** interprets sources, identifies gaps, asks
  material questions, and proposes findings and document changes. Its proposal
  is not package-author intent until accepted.
- The **authoring engine** owns workspace state transitions, revision checks,
  deterministic operations, attribution records, and portable package output.
- A **frontend** presents the workspace through terminal, conversational,
  document, diff, form, or review interactions without redefining engine
  semantics.
- A **storage adapter** persists the same logical workspace on a local
  filesystem or hosted service.

Conversation history may explain a proposal, but it must not be the only
durable record of a material decision. The draft package and its versioned
authoring workspace are the source of truth.

### Workspace lifecycle

An author can create a workspace from a short idea, attach one or more source
documents, or import an existing SeedSpec package. The system preserves source
identity and distinguishes supplied material from agent inference.

The author can inspect and edit a draft even while it is structurally invalid.
Validity is required before a review pass completes, a publication check
succeeds, or a portable package is exported; it is not required to recover or
continue a draft.

The engine supports these durable operations:

1. inspect workspace status and package documents;
2. validate, lint, and digest a valid draft;
3. start or resume a kind-aware review area at the selected target depth;
4. record findings, material questions, author answers, and deferrals;
5. propose package-document changes with their source and rationale;
6. accept, reject, abandon, or supersede proposed work;
7. complete a review pass only against current deterministic results; and
8. explicitly export the portable package or run its publication gate.

The seven standard review areas are reusable lenses, not protocol-conformance
steps or a quality score. A preparation flow may order them, while a focused
review may select one area. An author can stop at an honest capture, shape,
harden, compose, or package depth.

### Change control and concurrency

Every agent-proposed document change requires explicit author acceptance.
Every package mutation is visible, attributable to an author answer, supplied
source, mechanical operation, or agent proposal, and based on a known workspace
revision and package digest. A deterministic mechanical change may apply within
an already authorized engine operation, but remains recorded. A stale mutation
fails with a conflict instead of overwriting newer work.

Accepted changes receive fresh deterministic results before a pass can
complete. A model response, frontend success message, or claimed validation
command is not a substitute for an engine-observed result.

If an agent, model provider, browser session, network request, or storage write
fails, the last accepted workspace revision remains recoverable. Retrying must
not duplicate an accepted answer, proposal, or mutation.

### Portability and privacy boundary

The distributable output is declarative SeedSpec package content. It does not
contain temporary candidates, conversation transcripts, unresolved-work
queues, hosted identifiers, credentials, or authoring review state unless the
author explicitly exports a separate authoring record.

Import, source upload, model use, sharing, authoring-state export, package
export, and publication are distinct explicit actions. Discovering content or
opening a workspace does not authorize a model call, external fetch, package
publication, or execution of package-provided material.

Explicitly starting an agent-assisted authoring session authorizes model calls
until the author pauses or stops the session. The active agent and model context
remain visible. Session consent does not authorize external tools, source
acquisition, publication, or other consequential actions.

An explicit, versioned authoring-workspace archive carries draft documents,
sources, questions, answers, findings, proposals, approvals, pass history, and
format metadata between CLI and web. Conversation transcripts are optional;
credentials, provider session state, and frontend-only capabilities are not
portable artifacts.

The CLI remains sufficient for local authoring, and consuming a completed
package never requires a hosted account or the frontend that created it.

### Human CLI experience

The primary human entry point is `npx @seedspec/cli author`. When run inside one
unambiguous authoring project, it discovers the draft and adjacent authoring
state, resumes the current activity, and suggests the next useful action.
Human-facing instructions do not require a global installation, npm's
noninteractive `--yes` option, an exact CLI version, or explicit package and
state paths.

Exact versions, noninteractive confirmation, paths, identifiers, expected
revisions, and structured output remain available for tests, automation, and
unusual project layouts. Friendly command defaults must not weaken revision
checks, explicit acceptance, attribution, or deterministic results.

### Non-goals

The initial system does not require real-time collaborative editing, embed one
model provider into the protocol, certify authoring quality, publish directly
to a marketplace, or make seven wizard pages the universal authoring
experience.

## Success and evidence

A realization is successful when all of the following can be demonstrated:

1. The CLI and web workbench can create, export, import, and resume equivalent
   durable authoring artifacts from the same accepted inputs.
2. The same accepted package bytes produce the same validation, lint, and
   portable digest results through both frontends.
3. Material agent-proposed intent cannot enter the package without a durable
   acceptance record.
4. An author answer and its resulting document change remain traceable after
   the conversation that produced them is unavailable.
5. A stale concurrent mutation is rejected and does not alter the latest
   accepted workspace.
6. An interrupted agent or storage operation leaves the prior accepted
   revision readable and resumable.
7. A temporarily invalid draft remains inspectable, editable, and recoverable,
   while completion and export remain blocked.
8. The exported package validates independently and excludes authoring state
   and frontend-specific identifiers.
9. A consumer with only the exported package and compatible SeedSpec tooling
   can inspect and begin the package without the authoring frontend.

These are verification plans for a future realization. They are not evidence
that the current CLI or a future web workbench already satisfies the package.

## Decision latitude

The shared engine contract, explicit acceptance of every agent-proposed
document change, recoverable revisioned state, artifact-level parity, portable
authoring-workspace archives, and portable frontend-independent package output
are fixed.

The author or operating organization may select the target review depth,
authoring agent and model provider, local or hosted storage, collaboration and
retention policies, and additional organization-specific review gates. Those
choices must not weaken the fixed attribution, revision, or export boundaries.

An implementing agent may choose interface layout, framework, database,
transport, diff representation, storage-adapter architecture, and
frontend-specific assistance capabilities. Those choices must preserve the
shared durable artifacts and operations and must not make the CLI or hosted web
service the hidden authority for package meaning.
