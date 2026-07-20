# SeedSpec authoring audit instructions

- Instruction format: `0.1`
- Tool version: `0.1.0-alpha.2`
- Protocol processed: `0.1`
- Package: `org.seedspec.savings-goals@0.1.0-alpha.1`
- Kind hint: `feature`
- Package digest before pass: `sha256:d265443d9a9150c852fe02959fa0fbf67a281497ac88c92bfca1a872c13205e5`
- Pass: `0005-progressive-hardening`
- Area: 5 of 6 — Progressive hardening
- Target depth: `harden`

## Operating contract

1. Work beside the author on the current SeedSpec package. The package, not the conversation, is the durable source of truth.
2. Inspect supplied sources and current package content before proposing changes. Do not invent details to make the package appear mature.
3. Keep consequential agent inference and speculative wording outside the package under `solutions/savings-goals/authoring/candidates` until the author confirms it.
4. Apply explicit author decisions, source-supported content, and unambiguous mechanical corrections directly; record their basis in the pass result.
5. Ask only questions whose answers materially change behavior, authority, data treatment, accounting, portability, or observable success.
6. Update the standardized pass result at `solutions/savings-goals/authoring/passes/0005-progressive-hardening/result.yaml`. Set `outcome: needs-author` while blocked on author judgment and `outcome: completed` only after validation.
7. Before completing the pass, run `npx --yes @seedspec/cli@0.1.0-alpha.3 validate <package-path>`, `npx --yes @seedspec/cli@0.1.0-alpha.3 lint <package-path>`, and `npx --yes @seedspec/cli@0.1.0-alpha.3 digest <package-path>`; record the commands and exact final digest.

## Area objective

Review toward the requested `harden` depth: clarify permissions, invariants, failures, concurrency, retries, recovery, edge cases, and negative acceptance.
Do not expand product scope, manufacture enterprise requirements, or convert authoring depth into a quality score.
Report material gaps, intentional omissions, and blockers separately. A package may be valid and useful without exhausting every possible detail.
Recommend the smallest refinement that meaningfully reduces implementation risk at the requested depth.

## Required result

Update `solutions/savings-goals/authoring/passes/0005-progressive-hardening/result.yaml` using its existing standardized fields.
Every finding should include a stable ID, source location, assessment, consequence, recommendation, and status when those values apply.
Every applied or proposed change should include its path, basis (`author-answer`, `source-supported`, `mechanical`, or `agent-proposed`), and concise reason.
Do not mark the pass completed until the package validates and `package_digest_after` matches `npx --yes @seedspec/cli@0.1.0-alpha.3 digest`.

## Audit sequence

1. Concern separation
2. Kind-aware discovery
3. Material ambiguity
4. Internal consistency
5. Progressive hardening (current)
6. Agent-ready handoff

When the author is satisfied with this pass, complete the result and rerun the same `npx --yes @seedspec/cli@0.1.0-alpha.3 audit` command. The CLI will select the next incomplete area; no `next` command is required.

## Documentation

- Bundled guidance: `npx --yes @seedspec/cli@0.1.0-alpha.3 docs authoring progressive-hardening`
- Current source documentation: https://github.com/SeedSpec/seedspec/blob/main/docs/authoring.md
