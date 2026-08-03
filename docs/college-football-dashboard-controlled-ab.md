# College-football dashboard controlled three-arm run

## Purpose

This run compares three SeedSpec packages whose product definition,
configuration, capabilities, and acceptance criteria are identical. The plain
package carries no component implementation payload. The Andromeda package
adds an author-selected implementation profile, skill, design-system rules,
tokens, and component source. The linked package names the external Andromeda
design system but carries none of its implementation content.

The implementation agents receive the same instructions below. The
final segment of each agent's canonical task name is the only routing input:

- `plain` resolves to `solutions/college-football-dashboard-plain`
- `andromeda` resolves to `solutions/college-football-dashboard-andromeda`
- `linked` resolves to `solutions/college-football-dashboard-linked`

## Shared implementation prompt

You are implementing one controlled SeedSpec realization.

Derive `VARIANT` from the final segment of your canonical task name. It will be
`plain`, `andromeda`, or `linked`. Use these exact paths:

- repository: `/Users/davidturner/Code/SeedSpec/reference-solutions`
- solution: `/Users/davidturner/Code/SeedSpec/reference-solutions/solutions/college-football-dashboard-${VARIANT}`
- package: `/Users/davidturner/Code/SeedSpec/reference-solutions/solutions/college-football-dashboard-${VARIANT}/seedspec`
- run: `/Users/davidturner/Code/SeedSpec/reference-solutions/solutions/college-football-dashboard-${VARIANT}/realization/controlled-ab`
- application: `/Users/davidturner/Code/SeedSpec/reference-solutions/solutions/college-football-dashboard-${VARIANT}/realization/controlled-ab/app`
- report: `/Users/davidturner/Code/SeedSpec/reference-solutions/solutions/college-football-dashboard-${VARIANT}/realization/controlled-ab/agent-report.md`

Build me the college-football dashboard described by the assigned SeedSpec.
Make it polished, responsive, accessible, and genuinely usable by a
non-technical college-football fan.

Treat the assigned SeedSpec package as the authority. Run the reproducible
official workflow with `npx --yes @seedspec/cli@0.2.2 begin <package>` before
planning. Use the package's example configuration. Select the most specific
author-provided implementation profile available in the assigned package: when
multiple profiles exist, prefer the profile that explicitly binds bundled
author-selected implementation materials; otherwise use the available general
web profile. Resolve and consult every local resource recommended by that
selected profile, including any package-scoped skill. Follow a selected skill
faithfully.

You may consult a bundled Context7 instruction resource when current dependency
documentation is relevant and Context7 is already available. Do not install or
connect an external service solely because the package mentions it.

Make reasonable, reversible decisions without asking the user questions. If
current sports data is unavailable, use clearly labeled deterministic fixture
data and never imply that it is live. Do not use credentials, paid services, or
external data APIs.

Use the Sites building workflow for a new web application. Before implementation,
read `/Users/davidturner/.codex/plugins/cache/openai-bundled/sites/0.1.30/skills/sites-building/SKILL.md`
completely and initialize the application with its standard starter. Do not
deploy; the evaluator will publish both completed builds after independent
validation.

Complete the SeedSpec handoff workflow rather than merely reading the source
documents. Store handoff inputs and generated evidence inside the run directory.
Implement the complete acceptance component. Run appropriate automated checks
and a production build.

Write `agent-report.md` with:

1. selected implementation profile and resolved resources;
2. assumptions and implementation decisions;
3. acceptance-criteria coverage;
4. accessibility and responsive behavior;
5. loading, empty, stale, unavailable, conflicting, and partial-provider state
   coverage;
6. commands and verification results;
7. whether Context7 was available, consulted, useful, or unnecessary;
8. deviations, omissions, and known limitations; and
9. approximate elapsed time and time to first working build, if observable.

Do not inspect the sibling package, sibling realization, comparison documents,
or the other agent's work. Do not modify the assigned package. You own only the
assigned run directory. Other work may be happening in the repository, so do
not revert or rewrite files outside that directory.

## Evaluation rubric

The evaluator scores each realization independently before comparing them:

| Dimension | Weight |
| --- | ---: |
| Product and acceptance coverage | 30 |
| Information design and visual coherence | 20 |
| Accessibility and responsive behavior | 15 |
| State and failure-mode coverage | 15 |
| Implementation correctness and maintainability | 10 |
| Fidelity to author-selected implementation guidance | 10 |

“More polished” and “more faithful” are separate judgments. Fabricated
freshness, hidden data state, inaccessible charts, or missing acceptance
behavior outweigh superficial visual polish.
