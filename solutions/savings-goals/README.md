# Savings Goals

- `seedspec/` is a portable feature package for reserving or tracking balance
  value toward named goals.
- `authoring/` contains its non-distributable audit history and one remaining
  fund-disposition vocabulary question.
- It has no committed realization yet.

```bash
npx --yes @seedspec/cli@0.2.2 validate solutions/savings-goals/seedspec
npx --yes @seedspec/cli@0.2.2 lint solutions/savings-goals/seedspec
npx --yes @seedspec/cli@0.2.2 begin solutions/savings-goals/seedspec
npx --yes @seedspec/cli@0.2.2 prepare \
  solutions/savings-goals/seedspec \
  --state solutions/savings-goals/authoring-v0.2
```
