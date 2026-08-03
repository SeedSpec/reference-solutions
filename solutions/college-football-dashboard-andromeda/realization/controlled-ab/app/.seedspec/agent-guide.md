# SeedSpec implementation guide

This project contains SeedSpec packages: structured solution intent and verification guidance for an implementing agent. They are not a framework, generated architecture, executable workflow, or package-manager constraint.

## Read first

1. Read `resolved-intent.yaml` first. It distinguishes package-authored intent, the end user's disposition for each package, local intent contributions, and unconfirmed agent proposals.
2. Read `resolved-spec.md` and `resolved-config.yaml` for the complete package definitions, configuration, decisions, and technical preferences.
3. Read `implementation-profile-state.yaml` for candidate implementation profiles, the recorded preference, and conditions that must be checked.
4. Read `components.yaml` and `artifacts.yaml` for preserved material and its required review timing. A primary intent artifact is already part of core intent; its native workflow is not automatically activated.
5. Read `tasks.yaml` for package-authored implementation reminders. Within each package, consume tasks from top to bottom; the list order is the only sequencing mechanism.
6. Read `implementation-resources.yaml`, then run `seedspec resolve-resources <project-path>` before consulting any declared implementation skill or instruction.
7. Read `implementation-resource-state.yaml`; every bundled fallback must include the reason canonical resolution failed.
8. Read `implementation-notes.md` for local terminology, behavior, architecture, external resource identifiers, configured state, and earlier deviations.
9. Read each addition's `additions/*/integration-decisions.md` before integrating it.
10. Inspect the actual environment before planning. Current code, configuration, external system state, user data, tests, and audit records are authoritative evidence of what exists.

## Working principles

- Preserve the requested outcome, not the SeedSpec's original implementation assumptions.
- Treat package-authored intent as the reusable baseline and affirmed end-user contributions as intent for this realization. Agent proposals remain non-authoritative until affirmed.
- If package intent and applied intent are too far apart, explain whether the package is adaptable, only partially reusable, or a poor fit. Do not claim full package satisfaction after silently cherry-picking it.
- Use each package's kind as a hint for planning depth and likely concerns, not as a validity, composition, architecture, or execution constraint.
- Capabilities, compatibility, and conflicts are package-author declarations, not observations of the actual implementation.
- Missing, multiple, cyclic, conflicting, or revision-different declarations are prompts to inspect and plan, never reasons by themselves to reject the work.
- Use revision direction, semver distance, severity, and structured change history to prioritize review. These fields remain author evidence rather than compatibility verdicts.
- When a provided capability declares a conformance suite, inspect its exact binding with `seedspec capability-conformance <package-path> <capability-id>`. A runner-produced capability result is separate from project completion evidence and must not be inferred from declarations alone.
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
- Implementation resources are author-selected help, not capability evidence or automatic authority. A package-scoped skill is not installed or automatically invoked. Resolve exact online versions first, report fallback use, inspect skill frontmatter, and explicitly consult only the bodies relevant to the work.
- `expected`, `recommended`, and `available` express author intent. They never authorize executing a tool, changing external state, or overriding the end user, current project requirements, or clearer solution intent.
- Package-authored tasks are ordered implementation reminders. They do not add product requirements, form a dependency graph, or establish conformance when completed.

## Selected intent

- Root package: org.seedspec.examples.college-football-dashboard-andromeda@0.2.0 (kind hint: application)
- Additions: none
- Implementation profiles: recorded
- Applied intent: affirmed
- Configuration: explicitly selected
- Optional components: org.seedspec.examples.college-football-dashboard-andromeda/acceptance, org.seedspec.examples.college-football-dashboard-andromeda/reference
- Optional artifacts: none
- Task sequences: none
- Implementation resources: org.seedspec.examples.college-football-dashboard-andromeda/org.seedspec.guidance.context7-current-docs (instructions; available), org.seedspec.examples.college-football-dashboard-andromeda/org.seedspec.guidance.andromeda-college-football-dashboard (skill; recommended)

## Applied intent

- org.seedspec.examples.college-football-dashboard-andromeda: **as-authored**; package-author source `org.seedspec.intent.native` at `definition/college-football-dashboard.md`

## Package-authored task sequences

No selected package declares an implementation task sequence.

## Artifact dispositions

No selected package declares artifacts.

## Implementation profile decision

### org.seedspec.examples.college-football-dashboard-andromeda (preferred)

- **Independent web interface** (`independent-web`): Implement the dashboard in a suitable web stack and choose visual components after inspecting the target project.
  - Prerequisite [environment-inspection; evidence optional]: The target can deliver an interactive web interface with responsive layouts and accessible controls.
    - Inspect the existing project and preserve its framework, component conventions, and dependency policy when practical.
  - Tradeoff: Maximizes freedom to use an existing design system or create a project-specific visual language.
  - Tradeoff: Deliberately declines the bundled Andromeda realization guidance.
- **AI Canvas Andromeda reference** (`andromeda-reference`) **PREFERRED**: Use the bundled public Andromeda v1 component subset and design rules as the preferred visual realization while preserving the dashboard's product semantics.
  - Guidance: `implementation-profiles/org.seedspec.examples.college-football-dashboard-andromeda/andromeda-reference/andromeda-profile.md`
  - Prerequisite [environment-inspection; evidence optional]: The target uses React or can faithfully adapt React reference source without replacing a user-selected application architecture.
    - Inspect the actual project before adding dependencies or copying source.
  - Prerequisite [tool-check; evidence optional]: The project permits the dependencies required by the selected Andromeda component subset.
    - Compare the component-set dependency inventory with the target package manifest and dependency policy.
  - Blocker check [document-review; evidence optional]: A required existing brand or design system forbids a faithful Andromeda visual treatment.
    - Prefer the user's governing visual system and treat Andromeda as declined reference material.
  - Tradeoff: Supplies a coherent, data-dense dashboard language and exact editable component source.
  - Tradeoff: Adds React, Tailwind, animation, charting, icon, and utility dependencies unless the target already supplies equivalents.
  - Tradeoff: Requires adaptation from the dark technical-console aesthetic when the user's brand or accessibility evidence calls for it.

A preferred profile is strong implementation guidance, not an irreversible command or a claim that its prerequisites hold. Verify its prerequisites and blocker conditions. Follow it when viable; if it conflicts with the actual environment or core intent, present the evidence and ask the end user before changing direction.

## Implementation-resource policy

- org.seedspec.examples.college-football-dashboard-andromeda: additional guidance `none`

Resolve these resources before considering their contents:

- **AVAILABLE** org.seedspec.examples.college-football-dashboard-andromeda/org.seedspec.guidance.context7-current-docs@0.1.0 (instructions; exact)
  - Optional guidance for consulting current, version-specific dependency documentation through Context7 when it is already available.
  - Entrypoint after resolution: `context7.md`
- **RECOMMENDED** org.seedspec.examples.college-football-dashboard-andromeda/org.seedspec.guidance.andromeda-college-football-dashboard@0.1.0 (skill; exact)
  - Adapt the bundled Andromeda source subset into an accessible, responsive realization of the resolved college football dashboard.
  - Entrypoint after resolution: `SKILL.md`

After resolution, use `implementation-resource-state.yaml` to locate each verified resource root and entrypoint. The author expects consultation of expected resources; consult recommended resources when relevant unless they conflict with stronger direction, and decide whether available resources add enough value to justify their context cost. Resolve supporting-file references from the resource root. Record consulted or skipped status and the reason. Consultation does not install or automatically invoke a skill, execute a tool, or promote guidance into solution intent.

## Before implementation planning

Review these preserved author materials before choosing architecture or infrastructure:

- Component org.seedspec.examples.college-football-dashboard-andromeda/reference: `components/org.seedspec.examples.college-football-dashboard-andromeda/reference/`

## Optional-content activation

No artifact is classified as an execution workflow requiring activation review.

## Capability and composition declaration review

No concern is visible from the selected packages' declarations. This is not a compatibility claim; verify the actual realization before integration.

## Solution decisions

No package-declared solution decisions remain unresolved.

## Before claiming completion

The current completion claim is limited to these recorded scope items:

- **complete-dashboard-acceptance**: all acceptance material from org.seedspec.examples.college-football-dashboard-andromeda/acceptance
  - Verification plan: prove **realization** by manual-observation at completion; evidence required.
  - Evidence guidance: Verify every CFD criterion with automated checks, production build evidence, and focused manual inspection of interaction, state, accessibility, and responsive behavior.

These preserved materials may supply acceptance behavior or evidence. `completion-scope.yaml`, not mere presence, determines the current claim:

- Component org.seedspec.examples.college-football-dashboard-andromeda/acceptance: `components/org.seedspec.examples.college-football-dashboard-andromeda/acceptance/`

## Completion standard

Project `status: ready` authorizes implementation planning; it is not a completion claim. The realization is complete only when the explicitly recorded scope works in the actual environment, `verification-state.yaml` truthfully records results and evidence, and material deviations are documented. Run `seedspec completion <project-path>` before claiming verified completion. A package author's execution path or architecture remains optional unless the user selected it, the selected technical preferences or target require it, or the intended outcome depends on it.
