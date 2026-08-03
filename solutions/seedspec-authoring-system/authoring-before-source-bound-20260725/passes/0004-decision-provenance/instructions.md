# SeedSpec authoring audit instructions

- Instruction format: `0.2`
- Tool version: `0.2.2`
- Protocol processed: `0.2`
- Package: `dev.seedspec.authoring-system@0.2.0`
- Kind hint: `solution`
- Package digest before pass: `sha256:82dc4849ed3bb704cde9cc4d27f096a455f1898d05f6a0899486e255d75fcd35`
- Pass: `0004-decision-provenance`
- Area: 4 of 7 — Decision provenance
- Target depth: `package`

## Operating contract

1. Work beside the author on the current SeedSpec package. The package, not the conversation, is the durable source of truth.
2. Inspect supplied sources and current package content before proposing changes. Do not invent details to make the package appear mature.
3. Keep consequential agent inference and speculative wording outside the package under `candidates/` in the authoring workspace until the author confirms it.
4. Apply explicit author decisions, source-supported content, and unambiguous mechanical corrections directly; record their basis in the pass result.
5. Ask only questions whose answers materially change behavior, authority, data treatment, accounting, portability, or observable success.
6. Update the standardized pass result at `passes/0004-decision-provenance/result.yaml` in the authoring workspace. Set `outcome: needs-author` while blocked on author judgment and `outcome: completed` only after validation.
7. Before completing the pass, run `seedspec validate <package-path>`, `seedspec lint <package-path>`, and `seedspec digest <package-path>`; record the commands and exact final digest.

## Area objective

Build a descriptive inventory of consequential decisions exposed by the package. Do not score the package by how many decisions the author controls.
For each decision, record a stable ID, domain, description, plausible alternatives, and evidence locations. Classify materiality as `critical`, `material`, or `minor`, state whether that classification came from author declaration, a protocol default, evaluator judgment, or a mixture, and explain why.
Separate decision roles instead of forcing one owner: who proposed the choice, who is expected to select it, what constrains it, and who will implement it. Sources may include package-author intent, end-user applied intent, an implementation profile, a reference artifact, an existing system, the environment, or the implementing agent.
Classify expected latitude as `fixed`, `preferred`, `delegated`, `open`, or `unresolved`. A greater author share is not inherently better; the goal is an explicit distribution that matches the author's intent.
For included reference code or other realization artifacts, determine whether identified consequential decisions are normative, preferred, or illustrative. Do not label an entire artifact normative by default, and do not confuse decision influence with artifact activation. If influence is not clear, record a material ambiguity rather than guessing.
Identify decisions an implementing agent would otherwise make without an attributable source. Distinguish deliberately delegated choices from ambient choices caused by missing or conflicting authority.
Record attribution confidence and limitations. Preserve `mixed` and `unknown` classifications when the package does not support a stronger conclusion.
Store the inventory as structured findings in the pass result. This is an authored-package decision surface, not evidence of decisions an implementation agent actually made.

## Required result

Update `passes/0004-decision-provenance/result.yaml` in the authoring workspace using its existing standardized fields.
Every finding should include a stable ID, source location, assessment, consequence, recommendation, and status when those values apply.
Every applied or proposed change should include its path, basis (`author-answer`, `source-supported`, `mechanical`, or `agent-proposed`), and concise reason.
Do not mark the pass completed until the package validates and `package_digest_after` matches `seedspec digest`.

## Audit sequence

1. Concern separation
2. Kind-aware discovery
3. Material ambiguity
4. Decision provenance (current)
5. Internal consistency
6. Progressive hardening
7. Agent-ready handoff

When the author is satisfied with this pass, complete the result and rerun the same `seedspec audit` command. The CLI will select the next incomplete area; no `next` command is required.

## Documentation

- Bundled guidance: `seedspec docs authoring decision-provenance`
- Current source documentation: https://github.com/SeedSpec/seedspec/blob/main/docs/authoring.md
