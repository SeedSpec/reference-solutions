# SeedSpec reference solutions

Keep independently versioned SeedSpec packages under `packages/<name>/`,
project-specific resolution inputs under `project-inputs/`, and realized
solutions under `realizations/<name>/`. A realization may be an application,
configured external system, automation, operational artifact, evaluation
harness, or a combination of those forms.

Keep authoring audit state under `authoring-reviews/<name>/`. It may be shared
as development evidence, but it is not part of a SeedSpec package and must not
be copied into `packages/<name>/` or bundled for distribution.

Run `npm run check` from the repository root before committing changes.
Reference solutions consume the protocol but do not define it. Protocol
schemas, runtime behavior, CLI behavior, and conformance fixtures belong in
`SeedSpec/seedspec`.
