# SeedSpec authoring audit instructions

- Instruction format: `0.1`
- Tool version: `0.1.0-alpha.2`
- Protocol processed: `0.1`
- Package: `org.seedspec.examples.allowance-tracker@0.1.0-alpha.1`
- Kind hint: `application`
- Package digest before pass: `sha256:d3303a5c6feccd7e936a9b64e186a6ed2c78722044c7e84008d0a3539dd29084`
- Pass: `0006-agent-ready-handoff`
- Area: 6 of 6 — Agent-ready handoff
- Target depth: `harden`

## Operating contract

1. Work beside the author on the current SeedSpec package. The package, not the conversation, is the durable source of truth.
2. Inspect supplied sources and current package content before proposing changes. Do not invent details to make the package appear mature.
3. Keep consequential agent inference and speculative wording outside the package under `solutions/allowance-tracker/authoring/candidates` until the author confirms it.
4. Apply explicit author decisions, source-supported content, and unambiguous mechanical corrections directly; record their basis in the pass result.
5. Ask only questions whose answers materially change behavior, authority, data treatment, accounting, portability, or observable success.
6. Update the standardized pass result at `solutions/allowance-tracker/authoring/passes/0006-agent-ready-handoff/result.yaml`. Set `outcome: needs-author` while blocked on author judgment and `outcome: completed` only after validation.
7. Before completing the pass, run `npx --yes @seedspec/cli@0.1.0-alpha.3 validate <package-path>`, `npx --yes @seedspec/cli@0.1.0-alpha.3 lint <package-path>`, and `npx --yes @seedspec/cli@0.1.0-alpha.3 digest <package-path>`; record the commands and exact final digest.

## Area objective

Simulate receiving this package as a capable implementation agent with no access to the authoring conversation.
Explain the intended outcome, genuine constraints, configuration choices, unresolved product decisions, implementation profiles, optional artifacts and resources, and observable success conditions.
Identify facts the implementing agent would otherwise guess, instructions that could be misread as authority, important material buried in excessive context, and acceptance criteria that cannot be observed.
Run `npx --yes @seedspec/cli@0.1.0-alpha.3 begin <package-path>` and inspect the actual versioned handoff instructions. Review the emitted workflow rather than an idealized reading of source files.
Recommend only changes to the package that improve a cold handoff; do not prescribe the future architecture or implementation workflow.

## Required result

Update `solutions/allowance-tracker/authoring/passes/0006-agent-ready-handoff/result.yaml` using its existing standardized fields.
Every finding should include a stable ID, source location, assessment, consequence, recommendation, and status when those values apply.
Every applied or proposed change should include its path, basis (`author-answer`, `source-supported`, `mechanical`, or `agent-proposed`), and concise reason.
Do not mark the pass completed until the package validates and `package_digest_after` matches `npx --yes @seedspec/cli@0.1.0-alpha.3 digest`.

## Audit sequence

1. Concern separation
2. Kind-aware discovery
3. Material ambiguity
4. Internal consistency
5. Progressive hardening
6. Agent-ready handoff (current)

When the author is satisfied with this pass, complete the result and rerun the same `npx --yes @seedspec/cli@0.1.0-alpha.3 audit` command. The CLI will select the next incomplete area; no `next` command is required.

## Documentation

- Bundled guidance: `npx --yes @seedspec/cli@0.1.0-alpha.3 docs authoring agent-ready-handoff`
- Current source documentation: https://github.com/SeedSpec/seedspec/blob/main/docs/authoring.md
