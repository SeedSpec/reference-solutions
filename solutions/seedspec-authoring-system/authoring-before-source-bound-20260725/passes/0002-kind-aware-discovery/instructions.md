# SeedSpec authoring audit instructions

- Instruction format: `0.2`
- Tool version: `0.2.0`
- Protocol processed: `0.2`
- Package: `dev.seedspec.authoring-system@0.2.0`
- Kind hint: `solution`
- Package digest before pass: `sha256:c6416725a00318dba671426e1d9a8695bea28598b8cba0579e104fb3f6a0601b`
- Pass: `0002-kind-aware-discovery`
- Area: 2 of 7 — Kind-aware discovery
- Target depth: `package`

## Operating contract

1. Work beside the author on the current SeedSpec package. The package, not the conversation, is the durable source of truth.
2. Inspect supplied sources and current package content before proposing changes. Do not invent details to make the package appear mature.
3. Keep consequential agent inference and speculative wording outside the package under `candidates/` in the authoring workspace until the author confirms it.
4. Apply explicit author decisions, source-supported content, and unambiguous mechanical corrections directly; record their basis in the pass result.
5. Ask only questions whose answers materially change behavior, authority, data treatment, accounting, portability, or observable success.
6. Update the standardized pass result at `passes/0002-kind-aware-discovery/result.yaml` in the authoring workspace. Set `outcome: needs-author` while blocked on author judgment and `outcome: completed` only after validation.
7. Before completing the pass, run `seedspec validate <package-path>`, `seedspec lint <package-path>`, and `seedspec digest <package-path>`; record the commands and exact final digest.

## Area objective

Apply the `solution` authoring lens. Determine whether the package establishes:
- the intended compound outcome and its boundary;
- participants, dependencies, and authority;
- coordination, state changes, and failure behavior;
- observable evidence that the overall outcome works;
For every concern, report `established`, `unclear`, `materially missing`, or `not material` with evidence from the package.
A missing topic is not automatically a defect. Recommend refinement only when it matters to this specific outcome, and preserve legitimate provider-specific intent.

## Required result

Update `passes/0002-kind-aware-discovery/result.yaml` in the authoring workspace using its existing standardized fields.
Every finding should include a stable ID, source location, assessment, consequence, recommendation, and status when those values apply.
Every applied or proposed change should include its path, basis (`author-answer`, `source-supported`, `mechanical`, or `agent-proposed`), and concise reason.
Do not mark the pass completed until the package validates and `package_digest_after` matches `seedspec digest`.

## Audit sequence

1. Concern separation
2. Kind-aware discovery (current)
3. Material ambiguity
4. Decision provenance
5. Internal consistency
6. Progressive hardening
7. Agent-ready handoff

When the author is satisfied with this pass, complete the result and rerun the same `seedspec audit` command. The CLI will select the next incomplete area; no `next` command is required.

## Documentation

- Bundled guidance: `seedspec docs authoring kind-aware-discovery`
- Current source documentation: https://github.com/SeedSpec/seedspec/blob/main/docs/authoring.md
