# SeedSpec authoring audit instructions

- Instruction format: `0.1`
- Tool version: `0.1.0-alpha.2`
- Protocol processed: `0.1`
- Package: `org.seedspec.savings-goals@0.1.0-alpha.1`
- Kind hint: `feature`
- Package digest before pass: `sha256:7d0f14a31118facadaa5a2bc3656a7b7ecd49dbf3cdb56aa77a89eb54e7c26cf`
- Pass: `0004-internal-consistency`
- Area: 4 of 6 — Internal consistency
- Target depth: `harden`

## Operating contract

1. Work beside the author on the current SeedSpec package. The package, not the conversation, is the durable source of truth.
2. Inspect supplied sources and current package content before proposing changes. Do not invent details to make the package appear mature.
3. Keep consequential agent inference and speculative wording outside the package under `authoring-reviews/savings-goals/candidates` until the author confirms it.
4. Apply explicit author decisions, source-supported content, and unambiguous mechanical corrections directly; record their basis in the pass result.
5. Ask only questions whose answers materially change behavior, authority, data treatment, accounting, portability, or observable success.
6. Update the standardized pass result at `authoring-reviews/savings-goals/passes/0004-internal-consistency/result.yaml`. Set `outcome: needs-author` while blocked on author judgment and `outcome: completed` only after validation.
7. Before completing the pass, run `seedspec validate <package-path>`, `seedspec lint <package-path>`, and `seedspec digest <package-path>`; record the commands and exact final digest.

## Area objective

Use deterministic validation for schema, path, ID, configuration, relationship, and reference checks. Then perform semantic consistency review across the package.
Look for contradictory permissions or state behavior, configuration with no defined effect, acceptance without corresponding intent, profile guidance that changes the product outcome, inconsistent terminology, and capability contracts that disagree with the definition.
Distinguish deterministic errors from agent judgments. Cite both sides of every claimed contradiction and avoid rewriting merely stylistic differences.
Current deterministic diagnostics:
- The deterministic kind-aware lint produced no diagnostics; this is not a semantic consistency certification.

## Required result

Update `authoring-reviews/savings-goals/passes/0004-internal-consistency/result.yaml` using its existing standardized fields.
Every finding should include a stable ID, source location, assessment, consequence, recommendation, and status when those values apply.
Every applied or proposed change should include its path, basis (`author-answer`, `source-supported`, `mechanical`, or `agent-proposed`), and concise reason.
Do not mark the pass completed until the package validates and `package_digest_after` matches `seedspec digest`.

## Audit sequence

1. Concern separation
2. Kind-aware discovery
3. Material ambiguity
4. Internal consistency (current)
5. Progressive hardening
6. Agent-ready handoff

When the author is satisfied with this pass, complete the result and rerun the same `seedspec audit` command. The CLI will select the next incomplete area; no `next` command is required.

## Documentation

- Bundled guidance: `seedspec docs authoring internal-consistency`
- Current source documentation: https://github.com/SeedSpec/seedspec/blob/main/docs/authoring.md
