# Chore Streaks integration decisions

Source: org.seedspec.chore-streaks@0.1.0-alpha.2

Digest: sha256:79ad4c15679607b269257b1612e6b2f0118af4144ca6b4392af1076f775eb21b

Capability, compatibility, and conflict declarations are integration evidence, not installation gates or observations of the actual realization. Solution configuration and answered decisions are recorded in `resolved-config.yaml`.

## Capability review

- **NO DECLARED CONCERN** org.seedspec.chore-streaks expects org.seedspec.core.actors@1.0.0; declared candidates: org.seedspec.examples.allowance-tracker@1.0.0 (tested-revision); issues: none.
- **REVIEW** org.seedspec.chore-streaks expects org.seedspec.core.chores@1.0.0; declared candidates: org.seedspec.examples.allowance-tracker@1.1.0 (different-revision); issues: revision-difference.
- **NO DECLARED CONCERN** org.seedspec.chore-streaks expects org.seedspec.core.assignments@1.0.0; declared candidates: org.seedspec.examples.allowance-tracker@1.0.0 (tested-revision); issues: none.
- **NO DECLARED CONCERN** org.seedspec.chore-streaks expects org.seedspec.core.approvals@1.0.0; declared candidates: org.seedspec.examples.allowance-tracker@1.0.0 (tested-revision); issues: none.

## Composition review records

- revision-difference: org.seedspec.core.chores

## Source integration requirements

# Chore Streaks integration requirements

Map the portable streak owner to the host actor who owns qualifying assignments. Map the host's final accepted work outcome to `approved`, even when the application uses different terminology.

Before implementation, inspect local documentation and code for renamed or reshaped chore and assignment concepts. Preserve the application's vocabulary. Record a material mapping in `.seedspec/implementation-notes.md`; do not rename the application merely to match this package.

Use a stable occurrence identifier so retries and repeated event delivery count once. Use the host's preserved approval or completion history as the source of truth rather than a manually incremented counter.

When `day_boundary` is `household-local`, the host must establish one stable household time zone. If none exists, add an appropriate household-level choice and record the decision before calculating streaks. Do not silently use each viewer's browser time zone.

For Allowance Tracker, the child is the streak owner, an approved assignment is a qualifying occurrence, and the approval's effective time determines its calendar day.

## Unresolved decisions

None declared by this package.
