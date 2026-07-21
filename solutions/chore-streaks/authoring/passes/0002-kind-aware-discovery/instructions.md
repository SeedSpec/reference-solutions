# SeedSpec authoring audit instructions

- Instruction format: `0.1`
- Tool version: `0.1.0-alpha.2`
- Protocol processed: `0.1`
- Package: `org.seedspec.chore-streaks@0.1.0-alpha.1`
- Kind hint: `feature`
- Package digest before pass: `sha256:849b0cd3c96ba1d5e7da65cce23cdc2e41c238ec27e2e06a3f171f6ebbe81e77`
- Pass: `0002-kind-aware-discovery`
- Area: 2 of 6 — Kind-aware discovery
- Target depth: `harden`

## Operating contract

1. Work beside the author on the current SeedSpec package. The package, not the conversation, is the durable source of truth.
2. Inspect supplied sources and current package content before proposing changes. Do not invent details to make the package appear mature.
3. Keep consequential agent inference and speculative wording outside the package under `solutions/chore-streaks/authoring/candidates` until the author confirms it.
4. Apply explicit author decisions, source-supported content, and unambiguous mechanical corrections directly; record their basis in the pass result.
5. Ask only questions whose answers materially change behavior, authority, data treatment, accounting, portability, or observable success.
6. Update the standardized pass result at `solutions/chore-streaks/authoring/passes/0002-kind-aware-discovery/result.yaml`. Set `outcome: needs-author` while blocked on author judgment and `outcome: completed` only after validation.
7. Before completing the pass, run `npx --yes @seedspec/cli@0.1.0-alpha.3 validate <package-path>`, `npx --yes @seedspec/cli@0.1.0-alpha.3 lint <package-path>`, and `npx --yes @seedspec/cli@0.1.0-alpha.3 digest <package-path>`; record the commands and exact final digest.

## Area objective

Apply the `feature` authoring lens. Determine whether the package establishes:
- the host boundary and behavior the feature must not replace;
- behavior added or changed;
- required and provided capabilities plus integration expectations;
- configurable variation and host-safe failure behavior;
- host-independent observable acceptance;
For every concern, report `established`, `unclear`, `materially missing`, or `not material` with evidence from the package.
A missing topic is not automatically a defect. Recommend refinement only when it matters to this specific outcome, and preserve legitimate provider-specific intent.

## Required result

Update `solutions/chore-streaks/authoring/passes/0002-kind-aware-discovery/result.yaml` using its existing standardized fields.
Every finding should include a stable ID, source location, assessment, consequence, recommendation, and status when those values apply.
Every applied or proposed change should include its path, basis (`author-answer`, `source-supported`, `mechanical`, or `agent-proposed`), and concise reason.
Do not mark the pass completed until the package validates and `package_digest_after` matches `npx --yes @seedspec/cli@0.1.0-alpha.3 digest`.

## Audit sequence

1. Concern separation
2. Kind-aware discovery (current)
3. Material ambiguity
4. Internal consistency
5. Progressive hardening
6. Agent-ready handoff

When the author is satisfied with this pass, complete the result and rerun the same `npx --yes @seedspec/cli@0.1.0-alpha.3 audit` command. The CLI will select the next incomplete area; no `next` command is required.

## Documentation

- Bundled guidance: `npx --yes @seedspec/cli@0.1.0-alpha.3 docs authoring kind-aware-discovery`
- Current source documentation: https://github.com/SeedSpec/seedspec/blob/main/docs/authoring.md
