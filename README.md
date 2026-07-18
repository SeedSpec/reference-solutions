# SeedSpec reference applications

Independent runnable applications that exercise the SeedSpec Protocol as downstream consumers. Each application owns its implementation, tests, and resolved `.seedspec` state.

The protocol, schemas, runtime, CLI, and conformance suite are maintained in [SeedSpec/seedspec](https://github.com/SeedSpec/seedspec).

## Applications

```text
apps/
└── allowance-tracker/    household allowance and chore workflow reference
```

## Development

Install and test every application from the repository root:

```bash
npm install
npm run check
```

Run the Allowance Tracker:

```bash
npm run start:allowance-tracker
```
