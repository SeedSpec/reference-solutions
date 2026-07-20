# HubSpot Daily Metric

- `seedspec/` is a workflow package with HubSpot-native, existing-platform, and
  scheduled-service implementation profiles.
- `authoring/` contains its non-distributable audit history and three unresolved
  metric-definition questions.
- It has no committed realization yet.

```bash
npx --yes @seedspec/cli@0.1.0-alpha.3 validate solutions/hubspot-daily-metric/seedspec
npx --yes @seedspec/cli@0.1.0-alpha.3 lint solutions/hubspot-daily-metric/seedspec
npx --yes @seedspec/cli@0.1.0-alpha.3 begin solutions/hubspot-daily-metric/seedspec
npx --yes @seedspec/cli@0.1.0-alpha.3 audit \
  solutions/hubspot-daily-metric/seedspec \
  --state solutions/hubspot-daily-metric/authoring \
  --status
```

Resolve the HubSpot-native direction into a new project directory:

```bash
npx --yes @seedspec/cli@0.1.0-alpha.3 resolve \
  solutions/hubspot-daily-metric/seedspec \
  -i hubspot-native \
  --configuration-selections project-inputs/configuration-selections/hubspot-daily-metric.yaml \
  --completion-scope project-inputs/completion-scopes/hubspot-daily-metric.yaml \
  --output .tmp/hubspot-daily-metric
```
