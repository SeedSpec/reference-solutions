# SeedSpec reference solutions

Keep each reference solution under `solutions/<name>/`. Its distributable
package belongs in `seedspec/`, non-distributable audit state in `authoring/`,
and implemented output in `realization/` when one exists. A realization may be
an application, configured external system, automation, operational artifact,
evaluation harness, or a combination of those forms.

Never copy `authoring/` or `realization/` into `seedspec/` or bundle them with
the distributable package. Keep cross-solution resolution choices under
`project-inputs/`.

Human-facing instructions should use the friendly current-release form
`npx @seedspec/cli ...` without `--yes` or an exact version. Reproducible tests,
automation, and recorded evidence must invoke the exact npm CLI package with
`npx --yes @seedspec/cli@<version>`; do not rely on a sibling protocol checkout
or globally installed `seedspec`.

Run `npm run check` from the repository root before committing changes.
Reference solutions consume the protocol but do not define it. Protocol
schemas, runtime behavior, CLI behavior, and conformance fixtures belong in
`SeedSpec/seedspec`.
