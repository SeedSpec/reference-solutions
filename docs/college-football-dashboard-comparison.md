# College-football dashboard implementation comparison

## Question

How do three implementation-supply strategies differ when product intent
remains unchanged: no design-system direction, an external design-system
reference, or bundled component source plus implementation judgment?

The comparison uses three independently valid packages:

- `solutions/college-football-dashboard-plain/seedspec`
- `solutions/college-football-dashboard-linked/seedspec`
- `solutions/college-football-dashboard-andromeda/seedspec`

Their definition, configuration schema/example/guide, capability contract, and
acceptance criteria are byte-identical. The package IDs and implementation
material differ.

## Controlled materials

All three packages provide:

- the same college-football dashboard product intent;
- the same example watchlist and product configuration;
- the same acceptance behavior;
- the same optional bundled Context7 consultation instructions.

The plain package provides only an `independent-web` implementation profile.

The link-only package provides an `andromeda-external` profile that references
the public AI Canvas Andromeda design-system URL. It intentionally includes no
Andromeda source, tokens, rules, component mapping, screenshots, or
Andromeda-specific implementation skill.

The Andromeda-guided package additionally provides:

- an `andromeda-reference` implementation profile;
- a package-scoped implementation skill;
- a component-to-dashboard mapping;
- the Andromeda system and relevant component rules;
- tokens and supporting utilities; and
- exact public Andromeda v1 source for a selected 11-component set.

This separates three effects: unconstrained generation, runtime discovery from
a URL, and a preserved source-and-judgment payload. The controlled run does not
depend on whether an agent happened to know AI Canvas from training.

## Why Context7 is guidance rather than protocol support

Context7 retrieves current, version-specific library documentation. SeedSpec
does not need a Context7-specific core field to benefit from it. Each package
declares the same bundled `instructions` resource describing when and how an
agent may consult Context7.

The resource deliberately:

- does not install or connect Context7;
- does not make Context7 required;
- requires inspection of the actual project's dependency versions first;
- limits queries to focused documentation topics;
- prohibits sending credentials, user data, or unrelated proprietary context;
  and
- defines a fallback to installed-package inspection and official
  documentation.

If repeated experiments show that agents need portable records of documentation
queries or MCP server identities, that evidence can motivate a narrower future
tool-integration convention. This example does not require one.

## Suggested prompts

Run each package in an independent task and use the same model, reasoning
effort, starting repository, buyer answers, and completion scope. For the
strict controlled version, use the shared routing prompt in
`docs/college-football-dashboard-controlled-ab.md`.

### Intent-only package

```text
Implement the application described by the SeedSpec package at
<path>/college-football-dashboard-plain/seedspec in <output-directory>.

Run the official SeedSpec `begin` workflow before planning. Use the package's
example configuration and the `independent-web` implementation profile. You may
consult its Context7 instruction resource if current dependency documentation
is relevant and Context7 is already available; do not install or connect an
external tool solely because the package mentions it.

Make reasonable reversible implementation decisions, do not deploy, and verify
the complete acceptance component. If real current sports data is unavailable,
use clearly labeled deterministic fixture data and do not claim that it is live.
```

### Andromeda-guided package

```text
Implement the application described by the SeedSpec package at
<path>/college-football-dashboard-andromeda/seedspec in <output-directory>.

Run the official SeedSpec `begin` workflow before planning. Use the package's
example configuration and select the `andromeda-reference` implementation
profile. Resolve and consult the author-recommended dashboard skill, and use the
preserved Andromeda component source rather than reconstructing the visual
system from memory. You may consult the separate Context7 instruction resource
if current dependency documentation is relevant and Context7 is already
available; do not install or connect an external tool solely because the
package mentions it.

Make reasonable reversible implementation decisions, do not deploy, and verify
the complete acceptance component. If real current sports data is unavailable,
use clearly labeled deterministic fixture data and do not claim that it is live.
```

The extra directions in the guided prompt select and authorize consultation of
the implementation material. They do not authorize deployment, credentials,
external mutations, or unbounded tool installation.

### Link-only Andromeda package

```text
Implement the application described by the SeedSpec package at
<path>/college-football-dashboard-linked/seedspec in <output-directory>.

Run the official SeedSpec `begin` workflow before planning. Use the package's
example configuration and select the `andromeda-external` implementation
profile. Consult the referenced public design system and component catalog, but
do not create an account, begin a paid subscription, bypass an access boundary,
or claim source reuse that did not occur. You may consult the separate Context7
instruction resource if current dependency documentation is relevant and
Context7 is already available; do not install or connect an external tool
solely because the package mentions it.

Make reasonable reversible implementation decisions, do not deploy, and verify
the complete acceptance component. If real current sports data is unavailable,
use clearly labeled deterministic fixture data and do not claim that it is live.
```

## Comparison dimensions

Record:

1. product and acceptance coverage;
2. visual coherence and resemblance to the preserved design rules;
3. component reuse versus from-scratch reconstruction;
4. dependency and integration correctness;
5. accessibility, responsive behavior, and reduced-motion behavior;
6. loading, empty, stale, unavailable, conflicting, and partial-provider states;
7. number and kind of buyer questions;
8. context and token use;
9. time to first working build and final verified result;
10. material deviations and invented product behavior; and
11. whether Context7 was available, consulted, useful, or unnecessary.

Keep “more polished” separate from “more faithful.” A visually impressive
dashboard that fabricates data, hides freshness, or lacks accessible chart
alternatives is a worse SeedSpec realization.
