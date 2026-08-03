# College-football dashboard controlled three-arm results

Run date: 2026-07-24

## View the realizations

- Plain SeedSpec:
  <https://saturday-signal-plain-ab.wdavidturner.chatgpt.site>
- Link-only Andromeda SeedSpec:
  <https://saturday-signal-linked-ab.wdavidturner.chatgpt.site>
- Andromeda-guided SeedSpec:
  <https://saturday-signal-andromeda-ab.wdavidturner.chatgpt.site>

All three deployments use public link access so the evaluation is viewable across
ChatGPT workspace identities.

The local source and agent evidence remain at:

- `solutions/college-football-dashboard-plain/realization/controlled-ab`
- `solutions/college-football-dashboard-linked/realization/controlled-ab`
- `solutions/college-football-dashboard-andromeda/realization/controlled-ab`

## Experimental control

Three isolated workers received the same operative implementation prompt
recorded in `docs/college-football-dashboard-controlled-ab.md`. Before the third
run, only the routing table and allowed variant enum were extended to recognize
`linked`; the product request, model, reasoning setting, Sites starter,
SeedSpec CLI version, example configuration, acceptance scope, data policy, and
deployment prohibition were unchanged.

Each worker derived its package only from the final segment of its task name.
No worker could inspect a sibling package or realization. Profile selection was
mechanical: use the most specific author-provided profile available, with a
profile that binds bundled author-selected implementation materials taking
priority when multiple profiles exist.

The intentional difference was therefore the SeedSpec package:

- the plain package resolved `independent-web` and the shared Context7
  instructions;
- the link-only package resolved `andromeda-external`, which names the public
  Andromeda URL but bundles no Andromeda code, tokens, rules, mapping,
  screenshots, or implementation skill; and
- the guided package resolved `andromeda-reference`, the package-scoped
  dashboard skill, component mapping, design rules, tokens, provenance, and
  exact source.

## Outcome

The experiment supports the central hypothesis: a non-technical request can
activate an author-selected implementation system through SeedSpec without the
user knowing that system exists or naming it in the prompt.

The Andromeda payload did not merely affect the worker's prose. The worker
resolved the package-scoped skill, preserved provenance, and copied a focused
11-component subset plus tokens and utilities into the application. The
resulting dashboard is visibly and structurally different from the from-scratch
realization.

The link-only package also exerted strong steering. Its worker consulted the
public Andromeda system and component pages and produced the most immediately
recognizable Andromeda-inspired visual language of the three runs: dark
technical surfaces, turquoise accents, monospaced labels, corner markers,
hairline tables, compact badges, and stat tiles. But the public registry
commands returned account-required placeholders. The worker therefore removed
those placeholders, implemented native React/HTML/CSS equivalents, and
correctly did not claim direct component reuse.

It does not show that bundled source is automatically better overall. The plain
realization is easier to scan, covers more explicit boundary-state demos, builds
with fewer dependencies, produces a smaller client bundle, and passes a strict
TypeScript check. The guided realization is more distinctive and more faithful
to an authored design system, but it carries a meaningful integration tax.
The link-only realization is nearly as light as the plain run and visually
coherent, but its outcome depends on the quality, availability, and
interpretability of external documentation at implementation time.

## Independent evaluation

| Dimension | Weight | Plain | Link-only | Bundled | Notes |
| --- | ---: | ---: | ---: | ---: | --- |
| Product and acceptance coverage | 30 | 28 | 28 | 28 | All three provide the complete primary surfaces, honest fixture labeling, source/freshness semantics, filters, accessible ranking alternatives, and working team detail. |
| Information design and visual coherence | 20 | 18 | 19 | 18 | Plain is warmer and easiest to scan. Link-only is the most polished and visibly Andromeda-inspired. Bundled is most structurally tied to preserved components, but denser with smaller text. |
| Accessibility and responsive behavior | 15 | 13 | 13 | 13 | All expose semantic controls, visible state text, tables for critical charts, focus rules, reduced-motion rules, and phone breakpoints. See the mobile-test limitation below. |
| State and failure-mode coverage | 15 | 15 | 15 | 13 | Plain and link-only expose loading, stale, unavailable, partial, conflict, no-games, empty-watchlist, and unknown-mapping demos. Bundled covers the required data states but does not expose the latter two as selectable demos. |
| Implementation correctness and maintainability | 10 | 9 | 8 | 6 | All production builds and test suites pass. Plain passes strict TypeScript. Link-only has four strict TypeScript errors: one app scenario-map omission and three starter Cloudflare ambient-type gaps. Bundled has a large chart chunk and 68 strict TypeScript errors, mostly caused by weakly typed preserved component exports plus starter ambient types. |
| Fidelity to selected implementation guidance | 10 | 10 | 9 | 10 | Plain faithfully used its general profile. Link-only accurately translated public guidance and disclosed that direct reuse was unavailable. Bundled demonstrably followed the bundled profile, skill, mapping, source, and provenance. |
| **Total** | **100** | **93** | **92** | **88** | All three are successful realizations; their strengths differ. |

Scores are directional judgments, not a statistically meaningful benchmark from
a sample of one run per condition.

## Verification evidence

### Plain

- SeedSpec completion: verified.
- Production build: pass.
- Automated tests: 4/4 pass.
- Lint: pass.
- Strict TypeScript: pass.
- Runtime dependencies: 4.
- Built client JavaScript: approximately 307 KB uncompressed.
- Reported elapsed time: approximately 16 minutes.

### Link-only Andromeda

- SeedSpec completion: verified.
- Production build: pass.
- Automated tests: 10/10 pass.
- Lint: pass.
- Strict TypeScript: fail with 4 errors.
- Runtime dependencies: 5.
- Built client JavaScript: approximately 315 KB uncompressed.
- Reported elapsed time: approximately 22 minutes.
- Direct Andromeda source reused: none.

### Bundled Andromeda

- SeedSpec completion: verified.
- Production build: pass, with a non-fatal large-chunk warning.
- Automated tests: 9/9 pass.
- Lint: pass for application-authored source; preserved component source is
  excluded as declared.
- Strict TypeScript: fail with 68 errors.
- Runtime dependencies: 11.
- Built client JavaScript: approximately 904 KB uncompressed.
- Reported elapsed time: approximately 35 minutes.

The bundled run has strong behavioral unit coverage, including final-score
protection and season isolation. The link-only run has the broadest automated
test count while staying close to the plain run's dependency and bundle size.
The plain run has the cleanest type and dependency result.

## Interactive findings

All three deployments were exercised in a browser at a 1280-pixel desktop
viewport:

- primary navigation changed surfaces correctly;
- chosen failure state persisted across navigation;
- ranking-unavailable and partial-provider states preserved other data;
- unranked and unavailable remained distinct;
- team-detail views exposed schedule/results, rankings, metrics, source, and
  freshness information;
- data-critical ranking values had adjacent accessible tables; and
- none of the default desktop views had horizontal overflow.

The connected browser's viewport override did not apply reliably, so the
320-pixel judgment is based on the authored breakpoint rules and automated
source/render assertions rather than an independent visual screenshot. This is
the largest remaining evaluation limitation.

## What this says about SeedSpec packaging

The useful unit is not one SeedSpec per primitive component and not one enormous
component-library dump in every product spec. The three runs point to an
optional, author-selected implementation profile with more than one delivery
mode.

A link-only profile can be enough when the author wants aesthetic direction,
the public documentation is rich, and direct component reuse is not required.
It is lightweight and can produce an excellent result. It does not pin what the
agent saw, guarantee future access, prove provenance, or eliminate repeated
reconstruction work.

A bundled implementation kit is appropriate when exact source reuse,
reproducibility, offline availability, version stability, provenance, and
author-tested adaptation matter. A strong kit carries:

1. a curated source subset;
2. a short implementation skill;
3. component-to-product mapping judgment;
4. tokens and system rules;
5. dependency and framework compatibility;
6. provenance and license;
7. acceptance-oriented adaptation rules; and
8. integration checks or typed wrappers.

The product definition can remain independent. An author can recommend the
profile, a non-technical user can benefit without knowing its name, and an
advanced user can choose another profile.

This run also identifies the next quality bar for implementation kits. Raw
reference source should not be considered complete merely because it renders.
The kit should either ship typed, target-compatible source or require a small
typed adapter layer and test it. It should also provide a lean charting path or
explicit code-splitting guidance when the reference component introduces a
large runtime dependency.

Context7 did not affect any result. All three workers resolved and read the same
optional instructions, but no Context7 service was available and none of the
builds needed it. That supports keeping Context7 as portable optional guidance
for now, not adding it as a SeedSpec core feature based on this experiment
alone.

The most useful SeedSpec evolution suggested by the third arm is an explicit
external implementation-resource reference with a URL, expected version or
revision, license/provenance metadata, availability policy, and optional bundled
fallback. That gives authors a lightweight option without pretending that an
external link provides the same guarantees as preserved source.
