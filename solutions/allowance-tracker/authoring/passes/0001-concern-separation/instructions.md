# SeedSpec authoring audit instructions

- Instruction format: `0.1`
- Tool version: `0.1.0-alpha.2`
- Protocol processed: `0.1`
- Package: `org.seedspec.examples.allowance-tracker@0.1.0-alpha.1`
- Kind hint: `application`
- Package digest before pass: `sha256:d3303a5c6feccd7e936a9b64e186a6ed2c78722044c7e84008d0a3539dd29084`
- Pass: `0001-concern-separation`
- Area: 1 of 6 — Concern separation
- Target depth: `harden`

## Operating contract

1. Work beside the author on the current SeedSpec package. The package, not the conversation, is the durable source of truth.
2. Inspect supplied sources and current package content before proposing changes. Do not invent details to make the package appear mature.
3. Keep consequential agent inference and speculative wording outside the package under `solutions/allowance-tracker/authoring/candidates` until the author confirms it.
4. Apply explicit author decisions, source-supported content, and unambiguous mechanical corrections directly; record their basis in the pass result.
5. Ask only questions whose answers materially change behavior, authority, data treatment, accounting, portability, or observable success.
6. Update the standardized pass result at `solutions/allowance-tracker/authoring/passes/0001-concern-separation/result.yaml`. Set `outcome: needs-author` while blocked on author judgment and `outcome: completed` only after validation.
7. Before completing the pass, run `npx --yes @seedspec/cli@0.1.0-alpha.3 validate <package-path>`, `npx --yes @seedspec/cli@0.1.0-alpha.3 lint <package-path>`, and `npx --yes @seedspec/cli@0.1.0-alpha.3 digest <package-path>`; record the commands and exact final digest.

## Area objective

Classify each consequential statement by the concern it actually serves:
- core intent: behavior or outcomes that should survive legitimate implementation choices;
- configuration: meaningful product behavior that installations may choose differently;
- addition: independently composable behavior that extends or changes the solution;
- implementation profile: a materially different platform, architecture, provider, or realization direction for the same core intent;
- artifact: useful source material preserved in its native format;
- implementation resource: versioned help for an implementing agent;
- acceptance: observable evidence used to judge success.
Identify misplaced or conflated content with its file and heading. Do not move content when the correct concern depends on author intent; explain the alternatives and ask for direction.
Check especially for technology in core intent, implementation choices disguised as configuration, acceptance criteria that prescribe architecture, and optional features folded into the root outcome.

## Required result

Update `solutions/allowance-tracker/authoring/passes/0001-concern-separation/result.yaml` using its existing standardized fields.
Every finding should include a stable ID, source location, assessment, consequence, recommendation, and status when those values apply.
Every applied or proposed change should include its path, basis (`author-answer`, `source-supported`, `mechanical`, or `agent-proposed`), and concise reason.
Do not mark the pass completed until the package validates and `package_digest_after` matches `npx --yes @seedspec/cli@0.1.0-alpha.3 digest`.

## Audit sequence

1. Concern separation (current)
2. Kind-aware discovery
3. Material ambiguity
4. Internal consistency
5. Progressive hardening
6. Agent-ready handoff

When the author is satisfied with this pass, complete the result and rerun the same `npx --yes @seedspec/cli@0.1.0-alpha.3 audit` command. The CLI will select the next incomplete area; no `next` command is required.

## Documentation

- Bundled guidance: `npx --yes @seedspec/cli@0.1.0-alpha.3 docs authoring concern-separation`
- Current source documentation: https://github.com/SeedSpec/seedspec/blob/main/docs/authoring.md
