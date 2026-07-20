# SeedSpec reference solutions

Independently versioned SeedSpec packages and realized solutions that exercise
the SeedSpec Protocol as downstream consumers. They live outside the protocol
repository so package evolution, implementation work, and evaluation evidence
do not share the protocol's release history.

The protocol, schemas, runtime, CLI, and conformance suite are maintained in [SeedSpec/seedspec](https://github.com/SeedSpec/seedspec).

## Repository layout

```text
packages/
├── allowance-tracker/      application package
├── chore-streaks/          reusable feature package
├── hubspot-daily-metric/   configured-system and automation workflow package
└── savings-goals/          reusable feature package

project-inputs/
├── completion-scopes/         example project completion boundaries
└── configuration-selections/ example package configuration choices

realizations/
└── allowance-tracker/      runnable household allowance implementation
```

Packages declare the protocol version they consume. This repository may update
them for a newer protocol in its own commits and releases; their source does not
serve as protocol conformance data. The protocol repository keeps small,
artificial fixtures for self-contained schema, runtime, and conformance tests.

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

With a compatible `seedspec` CLI on your path, validate the independently
versioned packages directly:

```bash
seedspec validate packages/allowance-tracker
seedspec validate packages/savings-goals
seedspec validate packages/chore-streaks
seedspec validate packages/hubspot-daily-metric
```

Project inputs live beside the packages that use them. For example:

```bash
seedspec resolve packages/allowance-tracker \
  --configuration-selections project-inputs/configuration-selections/allowance-only.yaml \
  --completion-scope project-inputs/completion-scopes/allowance-only.yaml \
  --output .tmp/allowance-only

seedspec resolve packages/hubspot-daily-metric \
  -i hubspot-native \
  --configuration-selections project-inputs/configuration-selections/hubspot-daily-metric.yaml \
  --completion-scope project-inputs/completion-scopes/hubspot-daily-metric.yaml \
  --output .tmp/hubspot-daily-metric
```
