# SeedSpec reference solutions

Independently versioned SeedSpec packages and realized solutions that exercise
the SeedSpec Protocol as downstream consumers. They live outside the protocol
repository so package evolution, implementation work, and evaluation evidence
do not share the protocol's release history.

The protocol, schemas, runtime, CLI, and conformance suite are maintained in [SeedSpec/seedspec](https://github.com/SeedSpec/seedspec).

## One directory per reference solution

Each reference solution is grouped vertically. This makes the relationship
between a portable package, its authoring evidence, and any implemented output
explicit without putting non-package material inside the distributable
SeedSpec.

```text
solutions/
├── allowance-tracker/
│   ├── seedspec/       distributable application package
│   ├── authoring/      non-distributable audit state
│   └── realization/    runnable Node.js output
├── chore-streaks/
│   ├── seedspec/       distributable feature package
│   └── authoring/
├── hubspot-daily-metric/
│   ├── seedspec/       distributable workflow package
│   └── authoring/
└── savings-goals/
    ├── seedspec/       distributable feature package
    └── authoring/

project-inputs/
├── completion-scopes/         example project completion boundaries
└── configuration-selections/ example package configuration choices
```

Packages declare the protocol version they consume. This repository may update
them for a newer protocol in its own commits and releases; their source does not
serve as protocol conformance data. The protocol repository keeps small,
artificial fixtures for self-contained schema, runtime, and conformance tests.

Each `authoring/` directory preserves audit instructions, standardized results,
open questions, and package digests. Each `realization/` is an output created
from selected package versions. Neither is part of the sibling `seedspec/`
package or its digest.

The per-solution READMEs contain the relevant commands and clearly state when a
solution does not yet have a committed realization.

## Use the npm CLI

All repository instructions pin the exact npm package version used for the
current examples:

```bash
npx --yes @seedspec/cli@0.1.0-alpha.3 --help
```

Pinning avoids accidental behavior changes from a global install or a newer
prerelease. Update the version deliberately when the references are exercised
against a newer CLI.

## Development

Install and test every runnable realization from the repository root:

```bash
npm install
npm run check
```

Run the Allowance Tracker:

```bash
npm run start:allowance-tracker
```

Validate every independently versioned package directly from npm:

```bash
npx --yes @seedspec/cli@0.1.0-alpha.3 validate solutions/allowance-tracker/seedspec
npx --yes @seedspec/cli@0.1.0-alpha.3 validate solutions/savings-goals/seedspec
npx --yes @seedspec/cli@0.1.0-alpha.3 validate solutions/chore-streaks/seedspec
npx --yes @seedspec/cli@0.1.0-alpha.3 validate solutions/hubspot-daily-metric/seedspec
```

Cross-solution project inputs live under `project-inputs/`. For example:

```bash
npx --yes @seedspec/cli@0.1.0-alpha.3 resolve \
  solutions/allowance-tracker/seedspec \
  --configuration-selections project-inputs/configuration-selections/allowance-only.yaml \
  --completion-scope project-inputs/completion-scopes/allowance-only.yaml \
  --output .tmp/allowance-only

npx --yes @seedspec/cli@0.1.0-alpha.3 resolve \
  solutions/hubspot-daily-metric/seedspec \
  -i hubspot-native \
  --configuration-selections project-inputs/configuration-selections/hubspot-daily-metric.yaml \
  --completion-scope project-inputs/completion-scopes/hubspot-daily-metric.yaml \
  --output .tmp/hubspot-daily-metric
```
