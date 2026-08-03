# Allowance Tracker

This reference solution keeps three related but independently meaningful
artifacts together:

- `seedspec/` is the portable application package.
- `authoring/` contains historical Protocol 0.1 audit records.
- `realization/` is one Node.js implementation produced from a resolved
  Allowance Tracker plus Chore Streaks composition.

Inspect the package with the current SeedSpec CLI:

```bash
npx @seedspec/cli validate solutions/allowance-tracker/seedspec
npx @seedspec/cli lint solutions/allowance-tracker/seedspec
npx @seedspec/cli begin solutions/allowance-tracker/seedspec
```

Start a current preparation record without rewriting that history:

```bash
npx @seedspec/cli prepare \
  solutions/allowance-tracker/seedspec \
  --state solutions/allowance-tracker/authoring-current
```

Resolve a fresh composed project into a new directory:

```bash
npx @seedspec/cli resolve \
  solutions/allowance-tracker/seedspec \
  --add solutions/chore-streaks/seedspec \
  --applied-intent project-inputs/applied-intent/allowance-with-chore-streaks.yaml \
  --configuration-selections project-inputs/configuration-selections/allowance-with-chore-streaks.yaml \
  --completion-scope project-inputs/completion-scopes/allowance-with-chore-streaks.yaml \
  --output .tmp/allowance-with-chore-streaks
```
