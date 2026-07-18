# Chore Streaks integration decisions

Source: org.seedspec.chore-streaks@0.1.0-alpha.1

Digest: sha256:849b0cd3c96ba1d5e7da65cce23cdc2e41c238ec27e2e06a3f171f6ebbe81e77

Capability revisions are integration evidence, not installation gates. Product configuration and answered decisions are recorded in `resolved-config.yaml`.

## Capability review

- **ALIGNED** org.seedspec.core.actors: tested against 1.0.0; selected provider supplies 1.0.0.
- **REVIEW** org.seedspec.core.chores: tested against 1.0.0; selected provider supplies 1.1.0.
- **ALIGNED** org.seedspec.core.assignments: tested against 1.0.0; selected provider supplies 1.0.0.
- **ALIGNED** org.seedspec.core.approvals: tested against 1.0.0; selected provider supplies 1.0.0.

## Source integration requirements

# Chore Streaks integration requirements

Map the portable streak owner to the host actor who owns qualifying assignments. Map the host's final accepted work outcome to `approved`, even when the application uses different terminology.

Before implementation, inspect local documentation and code for renamed or reshaped chore and assignment concepts. Preserve the application's vocabulary. Record a material mapping in `.seedspec/implementation-notes.md`; do not rename the application merely to match this package.

Use a stable occurrence identifier so retries and repeated event delivery count once. Use the host's preserved approval or completion history as the source of truth rather than a manually incremented counter.

When `day_boundary` is `household-local`, the host must establish one stable household time zone. If none exists, add an appropriate household-level choice and record the decision before calculating streaks. Do not silently use each viewer's browser time zone.

For Allowance Tracker, the child is the streak owner, an approved assignment is a qualifying occurrence, and the approval's effective time determines its calendar day.

## Unresolved decisions

None declared by this package.
