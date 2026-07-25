# Allowance Tracker

This reference solution keeps three related but independently meaningful
artifacts together:

- `seedspec/` is the portable application package.
- `authoring/` contains historical Protocol 0.1 audit records.
- `realization/` is one Node.js implementation produced from a resolved
  Allowance Tracker plus Chore Streaks composition.

Inspect the package with the exact SeedSpec CLI version:

```bash
npx --yes @seedspec/cli@0.2.2 validate solutions/allowance-tracker/seedspec
npx --yes @seedspec/cli@0.2.2 lint solutions/allowance-tracker/seedspec
npx --yes @seedspec/cli@0.2.2 begin solutions/allowance-tracker/seedspec
```

Start a current 0.2 preparation record without rewriting that history:

```bash
npx --yes @seedspec/cli@0.2.2 prepare \
  solutions/allowance-tracker/seedspec \
  --state solutions/allowance-tracker/authoring-v0.2
```

Resolve a fresh composed project into a new directory:

```bash
npx --yes @seedspec/cli@0.2.2 resolve \
  solutions/allowance-tracker/seedspec \
  --add solutions/chore-streaks/seedspec \
  --configuration-selections project-inputs/configuration-selections/allowance-with-chore-streaks.yaml \
  --completion-scope project-inputs/completion-scopes/allowance-with-chore-streaks.yaml \
  --output .tmp/allowance-with-chore-streaks
```
