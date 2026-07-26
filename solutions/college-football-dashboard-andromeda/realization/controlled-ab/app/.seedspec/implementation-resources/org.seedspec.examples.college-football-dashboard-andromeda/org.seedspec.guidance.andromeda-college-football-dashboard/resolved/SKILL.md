---
name: build-college-football-dashboard
description: Adapt the bundled AI Canvas Andromeda v1 source subset into a college-football dashboard realization. Use when the resolved SeedSpec selects the Andromeda reference profile or the user specifically directs the agent to apply the bundled Andromeda components and design rules.
---

# Build College Football Dashboard

Use Andromeda as editable implementation source, not as a substitute for the
resolved definition and acceptance criteria.

## Workflow

1. Read the resolved intent, configuration, acceptance scope, implementation
   profile, and agent guide before choosing components.
2. Confirm the user selected the Andromeda profile or otherwise specifically
   directed consultation of this skill. Presence or resolution alone is not
   activation.
3. Inspect the target project. Preserve its framework, routing, data layer,
   testing conventions, and dependency policy when they can support a faithful
   implementation.
4. Locate the preserved SeedSpec `reference` component through
   `.seedspec/components.yaml`. Within it, find
   `aicanvas-andromeda-v1/COMPONENT-SET.md`.
5. Read `aicanvas-andromeda-v1/rules.md`, then read only the source and
   component-specific rule files needed for the chosen surfaces.
6. Read [component mapping](references/component-mapping.md) and select the
   smallest coherent subset. Do not install or display every bundled component.
7. Copy selected source into the project's normal component location while
   preserving the relative `tokens.ts`, `components/`, and `components/lib/`
   relationships needed by internal imports.
8. Install or reconcile only dependencies required by those selected files.
   If current API knowledge is material and Context7 is available, consult the
   separately declared Context7 instruction resource.
9. Bind components to real application data and state. Do not introduce mock
   scores, simulated refreshes, decorative telemetry, or placeholder statistics
   into a completion claim.
10. Verify all selected acceptance behavior and record component provenance,
    modifications, dependency decisions, and material rule deviations.

## Adaptation rules

- Preserve team identity, game status, freshness, source attribution, and
  accessible data alternatives over visual fidelity.
- Use team colors sparingly for identity. Keep Andromeda status colors reserved
  for actual status meaning.
- Keep charts supplemental. Render the same critical values in a table or text
  representation.
- Honor reduced motion. Do not make count-up or reveal animation load-bearing.
- Preserve final scores and unknown/unranked gaps in the data model before
  connecting presentation components.
- Treat the bundled files as a public v1 reference snapshot. They contain
  `@ts-nocheck` annotations and require a deliberate typing decision; do not
  claim type safety merely because the files use a `.tsx` extension.
- Start from exact source and make focused integration changes. Document any
  broad rewrite that prevents comparison with the reference.

## Completion checks

- Exercise populated, loading, empty, stale, unavailable, conflicting, and
  partial-provider states.
- Test keyboard navigation, visible focus, reduced motion, and a 320 CSS-pixel
  viewport.
- Verify every chart's accessible alternative and every status without color.
- Confirm the production build contains no gallery wrapper, simulated data
  timer, source-site account requirement, or runtime dependency on AI Canvas.
- Record the upstream commit and MIT license from the preserved provenance
  files.
