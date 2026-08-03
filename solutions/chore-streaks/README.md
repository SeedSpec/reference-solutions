# Chore Streaks

- `seedspec/` is a portable feature package for adding streak behavior to a
  compatible host.
- `authoring/` contains its non-distributable audit history.
- It has no standalone realization; the Allowance Tracker realization consumes
  this feature as an addition.

```bash
npx @seedspec/cli validate solutions/chore-streaks/seedspec
npx @seedspec/cli lint solutions/chore-streaks/seedspec
npx @seedspec/cli begin solutions/chore-streaks/seedspec
npx @seedspec/cli prepare \
  solutions/chore-streaks/seedspec \
  --state solutions/chore-streaks/authoring-current
```
