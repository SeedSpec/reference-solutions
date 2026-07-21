# SeedSpec authoring review logs

These workspaces preserve the first full lifecycle trial of `seedspec audit`
against every current reference package. Each package was reviewed through all
six authoring areas at `harden` depth. The directories retain the versioned
instructions, request metadata, standardized results, open questions,
validation commands, and before-and-after package digests. Machine-local paths
and executable examples in captured instructions were normalized to the current
repository layout and pinned npm CLI; request and result metadata retain the
original pass provenance.

Each `authoring/` directory is deliberately beside its solution's `seedspec/`
directory. It is authoring evidence, not distributable SeedSpec package
content. A completed audit area means the review pass was performed and
validated; it does not certify that a package is complete or that its remaining
authoring questions are harmless.

| Package | Passes | Open questions | Result |
| --- | ---: | ---: | --- |
| `allowance-tracker` | 6/6 | 3 | Strong application package; recurring allowance and time-boundary decisions still need the author. |
| `chore-streaks` | 6/6 | 0 | Configuration and archive-timing semantics were clarified; package advanced to `0.1.0-alpha.2`. |
| `hubspot-daily-metric` | 6/6 | 3 | Implementation directions are strong, but metric population, event time, and late-data behavior block faithful reuse. |
| `savings-goals` | 6/6 | 1 | State, accounting, atomicity, and acceptance were hardened; deletion-fund vocabulary still needs the author. Package advanced to `0.1.0-alpha.2`. |

The cold-handoff passes also exposed two improvements to the protocol tooling:

- `seedspec begin` now presents solution decisions before implementation
  profiles and includes profile guidance, conditions, evidence requirements,
  and tradeoffs.
- Audit status distinguishes completed review coverage from package readiness
  and reports unresolved authoring questions.

Use the read-only status view from this repository root:

```bash
npx --yes @seedspec/cli@0.1.0-alpha.3 audit \
  solutions/allowance-tracker/seedspec \
  --state solutions/allowance-tracker/authoring \
  --status
```
