# Savings Goals

- `seedspec/` is a portable feature package for reserving or tracking balance
  value toward named goals.
- `authoring/` contains its non-distributable audit history and one remaining
  fund-disposition vocabulary question.
- It has no committed realization yet.

```bash
npx @seedspec/cli validate solutions/savings-goals/seedspec
npx @seedspec/cli lint solutions/savings-goals/seedspec
npx @seedspec/cli begin solutions/savings-goals/seedspec
npx @seedspec/cli prepare \
  solutions/savings-goals/seedspec \
  --state solutions/savings-goals/authoring-current
```
