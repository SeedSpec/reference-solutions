# SeedSpec co-authoring review instructions

- Instruction format: `0.3`
- Tool version: `0.2.3`
- Protocol processed: `0.2`
- Package: `dev.seedspec.authoring-system@0.2.0`
- Kind hint: `solution`
- Package digest before pass: `sha256:82dc4849ed3bb704cde9cc4d27f096a455f1898d05f6a0899486e255d75fcd35`
- Pass: `0005-seed`
- Area: 1 of 4 — The seed
- Target depth: `package`

## Operating contract

1. Work beside the human as a co-author. The goal is a useful seed, not a complete implementation specification.
2. Review only the authored surface: supplied sources, package text, declared configuration, decisions, skills, artifacts, references, and success material.
3. Absence is not a gap. A finding must cite authored material that creates it, such as contradictory claims, ambiguity inside a stated claim, an incomplete declared option, a broken reference, or a mismatch between stated intent and stated success.
4. A domain skill may evaluate a concept the author introduced. It must not introduce unrelated requirements. Broader brainstorming is allowed only when the author explicitly asks for exploration, and those ideas are optional suggestions rather than findings.
5. Explain this area in plain language, summarize what the package currently says, identify strengths, then present only grounded concerns and a factual inventory. Ask whether the author wants to improve the area or considers it good enough. If no grounded concern exists, recommend `good-enough`.
6. Resolve genuine contradictions or rewrite them as deliberate alternatives. Do not make ordinary omissions, optional improvements, or absent implementation detail blocking.
7. Configuration is authored product variation, not a bucket for unanswered questions. Review only declared options and whether their meanings, effects, constraints, and success observations are clear.
8. Do not automatically turn a declined improvement into a portable question, configuration option, future task, or implementation obligation.
9. Show every agent-proposed package change and apply it only after explicit author acceptance. Record accepted wording and its basis; silence and continued conversation are not acceptance.
10. Keep platform or tooling defects separate in `tooling_feedback`; do not ask the package author to design a missing SeedSpec contract.
11. For `package` coaching: Improve portable clarity and remove contradictions without treating distribution as a completeness requirement.
12. Update `passes/0005-seed/result.yaml`. Use `outcome: needs-author` only while awaiting the current author response or resolving a contradiction. When the author accepts an improvement, says the area is good enough, or confirms it is irrelevant, set `outcome: reviewed` and `disposition` to `improved`, `good-enough`, or `not-relevant`.
13. Before marking the area reviewed, run `seedspec validate <package-path>`, `seedspec lint <package-path>`, and `seedspec digest <package-path>`; record the commands and exact final digest.

## Area objective

Read the primary intent and supplied sources. Explain what the author is trying to make, for whom, and which outcomes or boundaries they actually stated.
Do not compare the seed with a generic checklist for its kind. A one-sentence seed may be honest and useful.
Identify only wording whose own terms conflict, refer to something undefined, or support two materially different readings. Cite the exact source for each concern.
Offer the smallest wording improvement that would make the authored direction clearer. Do not add features, policies, actors, failure modes, or technical requirements merely because similar products often contain them.

## Required result

Update `passes/0005-seed/result.yaml` in the authoring workspace using its existing standardized fields.
Put factual package contents in `inventory`, source-cited interpretive concerns in `findings`, incompatible authored claims in `contradictions`, optional expansion ideas in `suggestions`, and SeedSpec product defects in `tooling_feedback`.
Every finding and contradiction must cite the exact authored source that triggered it. A subject absent from the package cannot be a finding.
Questions in this result belong to the current authoring conversation. Declining one does not create package configuration, a portable question, or future work.
Every applied or proposed change should include its path, basis (`author-answer`, `source-supported`, `mechanical`, or `agent-proposed`), and concise reason.
Do not mark the area `reviewed` until the package validates and `package_digest_after` matches `seedspec digest`.

## Guided review

1. The seed (current)
2. Coherence
3. Observable success
4. Configuration and supporting material

When the author is satisfied, record `outcome: reviewed` and the chosen disposition, then rerun the same `seedspec author review` command. The CLI will select the next unreviewed area; no `next` command is required.

## Documentation

- Bundled guidance: `seedspec docs authoring seed`
- Current source documentation: https://github.com/SeedSpec/seedspec/blob/main/docs/authoring.md
