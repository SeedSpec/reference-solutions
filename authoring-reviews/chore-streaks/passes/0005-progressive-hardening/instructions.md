# SeedSpec authoring audit instructions

- Instruction format: `0.1`
- Tool version: `0.1.0-alpha.2`
- Protocol processed: `0.1`
- Package: `org.seedspec.chore-streaks@0.1.0-alpha.1`
- Kind hint: `feature`
- Package digest before pass: `sha256:f85df5d4e26cb9b4551f4afd044e102b3e40c0589388cbd6a99b80825c49e187`
- Pass: `0005-progressive-hardening`
- Area: 5 of 6 — Progressive hardening
- Target depth: `harden`

## Operating contract

1. Work beside the author on the current SeedSpec package. The package, not the conversation, is the durable source of truth.
2. Inspect supplied sources and current package content before proposing changes. Do not invent details to make the package appear mature.
3. Keep consequential agent inference and speculative wording outside the package under `authoring-reviews/chore-streaks/candidates` until the author confirms it.
4. Apply explicit author decisions, source-supported content, and unambiguous mechanical corrections directly; record their basis in the pass result.
5. Ask only questions whose answers materially change behavior, authority, data treatment, accounting, portability, or observable success.
6. Update the standardized pass result at `authoring-reviews/chore-streaks/passes/0005-progressive-hardening/result.yaml`. Set `outcome: needs-author` while blocked on author judgment and `outcome: completed` only after validation.
7. Before completing the pass, run `seedspec validate <package-path>`, `seedspec lint <package-path>`, and `seedspec digest <package-path>`; record the commands and exact final digest.

## Area objective

Review toward the requested `harden` depth: clarify permissions, invariants, failures, concurrency, retries, recovery, edge cases, and negative acceptance.
Do not expand product scope, manufacture enterprise requirements, or convert authoring depth into a quality score.
Report material gaps, intentional omissions, and blockers separately. A package may be valid and useful without exhausting every possible detail.
Recommend the smallest refinement that meaningfully reduces implementation risk at the requested depth.

## Required result

Update `authoring-reviews/chore-streaks/passes/0005-progressive-hardening/result.yaml` using its existing standardized fields.
Every finding should include a stable ID, source location, assessment, consequence, recommendation, and status when those values apply.
Every applied or proposed change should include its path, basis (`author-answer`, `source-supported`, `mechanical`, or `agent-proposed`), and concise reason.
Do not mark the pass completed until the package validates and `package_digest_after` matches `seedspec digest`.

## Audit sequence

1. Concern separation
2. Kind-aware discovery
3. Material ambiguity
4. Internal consistency
5. Progressive hardening (current)
6. Agent-ready handoff

When the author is satisfied with this pass, complete the result and rerun the same `seedspec audit` command. The CLI will select the next incomplete area; no `next` command is required.

## Documentation

- Bundled guidance: `seedspec docs authoring progressive-hardening`
- Current source documentation: https://github.com/SeedSpec/seedspec/blob/main/docs/authoring.md
