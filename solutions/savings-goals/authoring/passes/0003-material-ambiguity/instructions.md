# SeedSpec authoring audit instructions

- Instruction format: `0.1`
- Tool version: `0.1.0-alpha.2`
- Protocol processed: `0.1`
- Package: `org.seedspec.savings-goals@0.1.0-alpha.1`
- Kind hint: `feature`
- Package digest before pass: `sha256:7d0f14a31118facadaa5a2bc3656a7b7ecd49dbf3cdb56aa77a89eb54e7c26cf`
- Pass: `0003-material-ambiguity`
- Area: 3 of 6 — Material ambiguity
- Target depth: `harden`

## Operating contract

1. Work beside the author on the current SeedSpec package. The package, not the conversation, is the durable source of truth.
2. Inspect supplied sources and current package content before proposing changes. Do not invent details to make the package appear mature.
3. Keep consequential agent inference and speculative wording outside the package under `solutions/savings-goals/authoring/candidates` until the author confirms it.
4. Apply explicit author decisions, source-supported content, and unambiguous mechanical corrections directly; record their basis in the pass result.
5. Ask only questions whose answers materially change behavior, authority, data treatment, accounting, portability, or observable success.
6. Update the standardized pass result at `solutions/savings-goals/authoring/passes/0003-material-ambiguity/result.yaml`. Set `outcome: needs-author` while blocked on author judgment and `outcome: completed` only after validation.
7. Before completing the pass, run `npx --yes @seedspec/cli@0.1.0-alpha.3 validate <package-path>`, `npx --yes @seedspec/cli@0.1.0-alpha.3 lint <package-path>`, and `npx --yes @seedspec/cli@0.1.0-alpha.3 digest <package-path>`; record the commands and exact final digest.

## Area objective

Find statements with two or more plausible interpretations that would lead to materially different realizations.
For each ambiguity, record the source location, competing interpretations, behavioral consequence, reversibility, and whether the package can safely defer the decision.
Rank ambiguities by authority, irreversible data treatment, accounting, safety, portability, and cost of changing the decision after implementation.
Group closely related questions and ask the author no more than three at once. Do not turn ordinary implementation freedom into an authoring question.
Move confirmed answers into the appropriate package concern. Keep deferred questions in `open-questions.yaml`, not in distributable intent as speculative prose.

## Required result

Update `solutions/savings-goals/authoring/passes/0003-material-ambiguity/result.yaml` using its existing standardized fields.
Every finding should include a stable ID, source location, assessment, consequence, recommendation, and status when those values apply.
Every applied or proposed change should include its path, basis (`author-answer`, `source-supported`, `mechanical`, or `agent-proposed`), and concise reason.
Do not mark the pass completed until the package validates and `package_digest_after` matches `npx --yes @seedspec/cli@0.1.0-alpha.3 digest`.

## Audit sequence

1. Concern separation
2. Kind-aware discovery
3. Material ambiguity (current)
4. Internal consistency
5. Progressive hardening
6. Agent-ready handoff

When the author is satisfied with this pass, complete the result and rerun the same `npx --yes @seedspec/cli@0.1.0-alpha.3 audit` command. The CLI will select the next incomplete area; no `next` command is required.

## Documentation

- Bundled guidance: `npx --yes @seedspec/cli@0.1.0-alpha.3 docs authoring material-ambiguity`
- Current source documentation: https://github.com/SeedSpec/seedspec/blob/main/docs/authoring.md
