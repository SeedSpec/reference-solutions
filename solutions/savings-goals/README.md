# Savings Goals

- `seedspec/` is a portable feature package for reserving or tracking balance
  value toward named goals.
- `authoring/` contains its non-distributable audit history and one remaining
  fund-disposition vocabulary question.
- It has no committed realization yet.

```bash
npx --yes @seedspec/cli@0.1.0-alpha.3 validate solutions/savings-goals/seedspec
npx --yes @seedspec/cli@0.1.0-alpha.3 lint solutions/savings-goals/seedspec
npx --yes @seedspec/cli@0.1.0-alpha.3 begin solutions/savings-goals/seedspec
npx --yes @seedspec/cli@0.1.0-alpha.3 audit \
  solutions/savings-goals/seedspec \
  --state solutions/savings-goals/authoring \
  --status
```
