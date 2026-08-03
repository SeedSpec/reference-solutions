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
├── seedspec-authoring-system/
│   ├── seedspec/       shared authoring engine, CLI, and web-workbench package
│   └── authoring/      current dogfooding and review state
├── family-hub/
│   └── seedspec/       configurable household application package
├── operations-dashboard-starter/
│   └── seedspec/       reusable internal application package
├── college-football-dashboard-plain/
│   └── seedspec/       dashboard intent without bundled UI source
├── college-football-dashboard-andromeda/
│   └── seedspec/       same intent with Andromeda source and guidance
├── college-football-dashboard-linked/
│   └── seedspec/       same intent with only an external Andromeda reference
├── customer-onboarding-orchestrator/
│   └── seedspec/       profiled cross-system workflow package
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
├── applied-intent/             example package-fit decisions
├── completion-scopes/         example project completion boundaries
└── configuration-selections/ example package configuration choices
```

Packages declare the protocol version they consume. This repository may update
them for a newer protocol in its own commits and releases; their source does not
serve as protocol conformance data. The protocol repository keeps small,
artificial fixtures for self-contained schema, runtime, and conformance tests.

Each existing `authoring/` directory preserves the records produced by its
original tool version. Those records are not rewritten for new package bytes
and do not satisfy a current publish check. Each `realization/` is an output
created from selected package versions. Neither is part of the sibling
`seedspec/` package or its digest.

The per-solution READMEs contain the relevant commands and clearly state when a
solution does not yet have a committed realization.

## Use the npm CLI

People can use the current CLI without installing it:

```bash
npx @seedspec/cli --help
```

Human-facing commands use the current release. Repository validation pins the
exact release declared in `release.json`.

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
npx @seedspec/cli validate solutions/allowance-tracker/seedspec
npx @seedspec/cli validate solutions/savings-goals/seedspec
npx @seedspec/cli validate solutions/chore-streaks/seedspec
npx @seedspec/cli validate solutions/hubspot-daily-metric/seedspec
npx @seedspec/cli validate solutions/family-hub/seedspec
npx @seedspec/cli validate solutions/operations-dashboard-starter/seedspec
npx @seedspec/cli validate solutions/college-football-dashboard-plain/seedspec
npx @seedspec/cli validate solutions/college-football-dashboard-andromeda/seedspec
npx @seedspec/cli validate solutions/college-football-dashboard-linked/seedspec
npx @seedspec/cli validate solutions/customer-onboarding-orchestrator/seedspec
npx @seedspec/cli validate solutions/seedspec-authoring-system/seedspec
```

See [the college-football dashboard comparison](docs/college-football-dashboard-comparison.md)
for the controlled prompting experiment and the Context7 packaging example.

Cross-solution project inputs live under `project-inputs/`. For example:

```bash
npx @seedspec/cli resolve \
  solutions/allowance-tracker/seedspec \
  --applied-intent project-inputs/applied-intent/allowance-only.yaml \
  --configuration-selections project-inputs/configuration-selections/allowance-only.yaml \
  --completion-scope project-inputs/completion-scopes/allowance-only.yaml \
  --output .tmp/allowance-only

npx @seedspec/cli resolve \
  solutions/hubspot-daily-metric/seedspec \
  -i hubspot-native \
  --applied-intent project-inputs/applied-intent/hubspot-daily-metric.yaml \
  --configuration-selections project-inputs/configuration-selections/hubspot-daily-metric.yaml \
  --completion-scope project-inputs/completion-scopes/hubspot-daily-metric.yaml \
  --output .tmp/hubspot-daily-metric
```
