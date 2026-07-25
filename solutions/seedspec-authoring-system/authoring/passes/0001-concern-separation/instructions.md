# SeedSpec authoring audit instructions

- Instruction format: `0.2`
- Tool version: `0.2.0`
- Protocol processed: `0.2`
- Package: `dev.seedspec.authoring-system@0.1.0`
- Kind hint: `solution`
- Package digest before pass: `sha256:9e53d580b40e0203f72830828df88bc347c3fe86800c671ac008d594c290a57e`
- Pass: `0001-concern-separation`
- Area: 1 of 7 — Concern separation
- Target depth: `package`

## Operating contract

1. Work beside the author on the current SeedSpec package. The package, not the conversation, is the durable source of truth.
2. Inspect supplied sources and current package content before proposing changes. Do not invent details to make the package appear mature.
3. Keep consequential agent inference and speculative wording outside the package under `candidates/` in the authoring workspace until the author confirms it.
4. Apply explicit author decisions, source-supported content, and unambiguous mechanical corrections directly; record their basis in the pass result.
5. Ask only questions whose answers materially change behavior, authority, data treatment, accounting, portability, or observable success.
6. Update the standardized pass result at `passes/0001-concern-separation/result.yaml` in the authoring workspace. Set `outcome: needs-author` while blocked on author judgment and `outcome: completed` only after validation.
7. Before completing the pass, run `seedspec validate <package-path>`, `seedspec lint <package-path>`, and `seedspec digest <package-path>`; record the commands and exact final digest.

## Area objective

Classify each consequential statement by the concern it actually serves:
- primary intent: the package-author source named by `definition.entrypoint`; if `definition.artifact` is present, preserve that external format rather than duplicating it into native Markdown;
- purpose: the problem, objective, desired change, affected actors, and outcomes that should survive legitimate implementation choices;
- obligations and boundaries: required behavior, invariants, constraints, forbidden states, and explicit non-goals;
- success and evidence: observable success claims and future verification plans, with realization outcomes distinguished from later operational outcomes;
- decision latitude: choices fixed by the package author, reserved for the end user, or delegated to the implementing agent;
- configuration: meaningful product behavior that installations may choose differently;
- addition: independently composable behavior that extends or changes the solution;
- implementation profile: a materially different platform, architecture, provider, or realization direction for the same core intent;
- task runbook: optional ordered implementation reminders with package-file references, separate from product intent and acceptance;
- artifact: useful source material preserved in its native format;
- implementation resource: versioned help for an implementing agent;
- package evidence: material supporting a claim about the package, its testing, or known compatibility;
- applied intent: project-local end-user adaptation, which does not belong in a reusable source package.
Identify misplaced, conflated, duplicated, or conflicting content with its file and heading. For each finding, name one proposed canonical owner and classify every other occurrence as a useful reference, summary, or duplication that should be removed.
Treat agent-facing instructions as a routing and authority map, not a shadow copy of core intent. Prefer links to authoritative concerns over repeated obligations, boundaries, configuration, or acceptance criteria.
Propose the smallest coherent restructuring plan before editing: content to move, its destination and semantic reason, references to repair, and claims whose correct owner still requires author judgment.
When restructuring is authorized, preserve meaning and provenance, repair package references, and report any wording change separately from a mechanical move. Do not describe a semantic rewrite as file organization.
Do not move content when the correct concern depends on author intent; explain the alternatives and ask for direction.
Check especially for technology in primary intent, implementation choices disguised as configuration, acceptance criteria that prescribe architecture, optional features folded into the root outcome, forbidden states mislabeled as non-goals, and evidence offered for a different subject than the claim it supposedly proves.
Prefer the fewest physical files that still give each material concern an unambiguous canonical owner. Report both monolithic overload and unnecessary fragmentation; do not split intent merely because the vocabulary distinguishes its concerns.

## Required result

Update `passes/0001-concern-separation/result.yaml` in the authoring workspace using its existing standardized fields.
Every finding should include a stable ID, source location, assessment, consequence, recommendation, and status when those values apply.
Every applied or proposed change should include its path, basis (`author-answer`, `source-supported`, `mechanical`, or `agent-proposed`), and concise reason.
Do not mark the pass completed until the package validates and `package_digest_after` matches `seedspec digest`.

## Audit sequence

1. Concern separation (current)
2. Kind-aware discovery
3. Material ambiguity
4. Decision provenance
5. Internal consistency
6. Progressive hardening
7. Agent-ready handoff

When the author is satisfied with this pass, complete the result and rerun the same `seedspec audit` command. The CLI will select the next incomplete area; no `next` command is required.

## Documentation

- Bundled guidance: `seedspec docs authoring concern-separation`
- Current source documentation: https://github.com/SeedSpec/seedspec/blob/main/docs/authoring.md
