# Chore Streaks

- `seedspec/` is a portable feature package for adding streak behavior to a
  compatible host.
- `authoring/` contains its non-distributable audit history.
- It has no standalone realization; the Allowance Tracker realization consumes
  this feature as an addition.

```bash
npx --yes @seedspec/cli@0.1.0-alpha.3 validate solutions/chore-streaks/seedspec
npx --yes @seedspec/cli@0.1.0-alpha.3 lint solutions/chore-streaks/seedspec
npx --yes @seedspec/cli@0.1.0-alpha.3 begin solutions/chore-streaks/seedspec
npx --yes @seedspec/cli@0.1.0-alpha.3 audit \
  solutions/chore-streaks/seedspec \
  --state solutions/chore-streaks/authoring \
  --status
```
