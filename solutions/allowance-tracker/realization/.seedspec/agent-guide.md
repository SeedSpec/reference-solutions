# SeedSpec implementation guide

This project contains SeedSpec packages: structured solution intent and verification guidance for an implementing agent. They are not a framework, generated architecture, executable workflow, or package-manager constraint.

## Read first

1. Read `resolved-spec.md` and `resolved-config.yaml` for recorded solution intent, configuration, decisions, and technical preferences.
2. Read `implementation-profile-state.yaml` for candidate implementation profiles, the recorded preference, and conditions that must be checked.
3. Read `components.yaml` and `artifacts.yaml` for preserved optional material and its required review timing.
4. Read `implementation-resources.yaml`, then run `seedspec resolve-resources <project-path>` before loading any declared implementation skill or instruction.
5. Read `implementation-resource-state.yaml`; every bundled fallback must include the reason canonical resolution failed.
6. Read `implementation-notes.md` for local terminology, behavior, architecture, external resource identifiers, configured state, and earlier deviations.
7. Read each addition's `additions/*/integration-decisions.md` before integrating it.
8. Inspect the actual environment before planning. Current code, configuration, external system state, user data, tests, and audit records are authoritative evidence of what exists.

## Working principles

- Preserve the requested outcome, not the SeedSpec's original implementation assumptions.
- Use each package's kind as a hint for planning depth and likely concerns, not as a validity, composition, architecture, or execution constraint.
- Capabilities, compatibility, and conflicts are package-author declarations, not observations of the actual implementation.
- Missing, multiple, cyclic, conflicting, or revision-different declarations are prompts to inspect and plan, never reasons by themselves to reject the work.
- Recognize equivalent local concepts even when names differ. Prefer adapting incoming behavior to the current realization.
- Do not rename, migrate, or overwrite established behavior merely to make it resemble the source SeedSpec.
- Surface consequential ambiguity before implementing it. Reversible technical choices remain yours.
- Translate acceptance criteria into verification appropriate for the selected realization. Use tests where appropriate, but allow credible observations of configured external state and delivered operational results.
- Record material semantic mappings, external resource identifiers, selected approaches, and deviations in `implementation-notes.md`.
- Record acceptance evidence, remaining gaps, and manual checks in `verification-report.md`.
- Keep concise per-scope results and evidence references truthful in `verification-state.yaml`.
- Artifact discovery is descriptive, not an instruction to activate the artifact's tooling or lifecycle.
- Artifact disposition records intended use. Even a selected artifact does not authorize loading a skill, running a command, fetching a URL, or invoking an adapter.
- If an artifact format has its own workflow, explain the exact action and obtain specific user direction at activation time. The package author's preference does not override the end user's direction.
- Implementation resources are author-selected help, not capability evidence or automatic authority. Resolve exact online versions first, report fallback use, inspect skill frontmatter, and load only the bodies relevant to the work.
- `required`, `recommended`, and `available` express author intent. They never authorize executing a tool, changing external state, or overriding the end user, current project requirements, or clearer solution intent.

## Selected intent

- Root package: org.seedspec.examples.allowance-tracker@0.1.0-alpha.1 (kind hint: application)
- Additions: org.seedspec.chore-streaks@0.1.0-alpha.2 (kind hint: feature)
- Implementation profiles: not-declared
- Configuration: explicitly selected
- Optional components: org.seedspec.examples.allowance-tracker/acceptance, org.seedspec.examples.allowance-tracker/reference, org.seedspec.chore-streaks/acceptance, org.seedspec.chore-streaks/integration
- Optional artifacts: org.seedspec.examples.allowance-tracker/product-spec (org.seedspec.artifact.product-spec; unreviewed)
- Implementation resources: none

## Artifact dispositions

- **UNREVIEWED** org.seedspec.examples.allowance-tracker/product-spec (org.seedspec.artifact.product-spec) — review when-relevant

`unreviewed` means no user disposition was recorded. `deferred` means the user explicitly postponed the choice. Neither state authorizes use.

## Implementation profile decision

No selected package declares an implementation profile. Choose execution from the core intent, actual environment, and end-user direction.

## Implementation-resource policy

- org.seedspec.examples.allowance-tracker: additional guidance `unspecified`
- org.seedspec.chore-streaks: additional guidance `unspecified`

No author-selected implementation resources are declared. Absence is not a statement that a capability exists, is absent, or should be implemented a particular way.

## Before implementation planning

Review these preserved author materials before choosing architecture or infrastructure:

- Component org.seedspec.examples.allowance-tracker/reference: `components/org.seedspec.examples.allowance-tracker/reference/`

## Optional-content activation

No artifact is classified as an execution workflow requiring activation review.

## Capability and composition declaration review

Create an integration plan for these author-supplied review signals. Resolve them against actual code, configuration, external state, and user intent rather than treating them as package-manager failures:

- **revision-difference** — packages: org.seedspec.chore-streaks, org.seedspec.examples.allowance-tracker; capability: org.seedspec.core.chores

Declared requirement context:

- **NO DECLARED CONCERN** org.seedspec.chore-streaks expects org.seedspec.core.actors@1.0.0; declared candidates: org.seedspec.examples.allowance-tracker@1.0.0 (tested-revision); issues: none.
- **REVIEW** org.seedspec.chore-streaks expects org.seedspec.core.chores@1.0.0; declared candidates: org.seedspec.examples.allowance-tracker@1.1.0 (different-revision); issues: revision-difference.
- **NO DECLARED CONCERN** org.seedspec.chore-streaks expects org.seedspec.core.assignments@1.0.0; declared candidates: org.seedspec.examples.allowance-tracker@1.0.0 (tested-revision); issues: none.
- **NO DECLARED CONCERN** org.seedspec.chore-streaks expects org.seedspec.core.approvals@1.0.0; declared candidates: org.seedspec.examples.allowance-tracker@1.0.0 (tested-revision); issues: none.

## Solution decisions

No package-declared solution decisions remain unresolved.

## Before claiming completion

The current completion claim is limited to these recorded scope items:

- **allowance-acceptance**: all acceptance material from org.seedspec.examples.allowance-tracker/acceptance
- **chore-streaks-acceptance**: all acceptance material from org.seedspec.chore-streaks/acceptance

These preserved materials may supply acceptance behavior or evidence. `completion-scope.yaml`, not mere presence, determines the current claim:

- Component org.seedspec.examples.allowance-tracker/acceptance: `components/org.seedspec.examples.allowance-tracker/acceptance/`
- Component org.seedspec.chore-streaks/acceptance: `components/org.seedspec.chore-streaks/acceptance/`

## Completion standard

Project `status: ready` authorizes implementation planning; it is not a completion claim. The realization is complete only when the explicitly recorded scope works in the actual environment, `verification-state.yaml` truthfully records results and evidence, and material deviations are documented. Run `seedspec completion <project-path>` before claiming verified completion. A package author's execution path or architecture remains optional unless the user selected it, the selected technical preferences or target require it, or the intended outcome depends on it.
