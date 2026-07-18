# SeedSpec implementation guide

This project contains SeedSpec packages: structured product intent and verification guidance for an implementing agent. They are not a framework, generated architecture, or package-manager constraint.

## Read first

1. Read `resolved-spec.md` for the selected application, features, configuration, and acceptance criteria.
2. Read `artifacts.yaml` to discover optional intent, design, execution, infrastructure, and evidence artifacts preserved from the selected packages.
3. Read `implementation-notes.md` for local terminology, behavior, architecture, and earlier deviations.
4. Read each feature's `features/*/integration-decisions.md` before integrating it.
5. Inspect the actual application and its tests; current code and user data are authoritative evidence of what exists.

## Working principles

- Preserve the requested product outcome, not the SeedSpec's original implementation assumptions.
- Capability revisions are evidence. A mismatch is a prompt to inspect and plan, never a reason by itself to reject the work.
- Recognize equivalent local concepts even when names differ. Prefer adapting incoming behavior to the current application.
- Do not rename, migrate, or overwrite established behavior merely to make it resemble the source SeedSpec.
- Surface consequential ambiguity before implementing it. Reversible technical choices remain yours.
- Translate acceptance criteria into tests appropriate for the chosen stack; do not force a source package's test technology onto the application.
- Record material semantic mappings and deviations in `implementation-notes.md`.
- Record acceptance evidence, remaining gaps, and manual checks in `verification-report.md`.
- Artifact discovery is descriptive, not an instruction to activate the artifact's tooling or lifecycle.
- If an artifact format has its own workflow, explain the relevant choice and ask the end user before adopting that workflow. The package author's preference does not override the end user's direction.

## Selected intent

- Application: org.seedspec.examples.allowance-tracker@0.1.0-alpha.1
- Features: org.seedspec.chore-streaks@0.1.0-alpha.1
- Optional artifacts: org.seedspec.examples.allowance-tracker/product-spec (org.seedspec.artifact.product-spec)

## Capability revision review

Create an integration plan for these items before implementation:

- org.seedspec.chore-streaks was tested against org.seedspec.core.chores@1.0.0; the selected provider supplies 1.1.0.

## Product decisions

No package-declared product decisions remain unresolved.

## Completion standard

The implementation is complete when the selected use case works in the actual application, relevant acceptance behavior has credible evidence, and material deviations are recorded. Conformity to a particular architecture is not required.
