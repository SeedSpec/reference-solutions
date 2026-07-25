# HubSpot Daily Metric

- `seedspec/` is a workflow package with HubSpot-native, existing-platform, and
  scheduled-service implementation profiles.
- `authoring/` contains its non-distributable audit history and three unresolved
  metric-definition questions.
- It has no committed realization yet.

```bash
npx --yes @seedspec/cli@0.2.2 validate solutions/hubspot-daily-metric/seedspec
npx --yes @seedspec/cli@0.2.2 lint solutions/hubspot-daily-metric/seedspec
npx --yes @seedspec/cli@0.2.2 begin solutions/hubspot-daily-metric/seedspec
npx --yes @seedspec/cli@0.2.2 prepare \
  solutions/hubspot-daily-metric/seedspec \
  --state solutions/hubspot-daily-metric/authoring-v0.2
```

Resolve the HubSpot-native direction into a new project directory:

```bash
npx --yes @seedspec/cli@0.2.2 resolve \
  solutions/hubspot-daily-metric/seedspec \
  -i hubspot-native \
  --configuration-selections project-inputs/configuration-selections/hubspot-daily-metric.yaml \
  --completion-scope project-inputs/completion-scopes/hubspot-daily-metric.yaml \
  --output .tmp/hubspot-daily-metric
```
