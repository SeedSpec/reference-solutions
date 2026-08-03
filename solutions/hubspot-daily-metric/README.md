# HubSpot Daily Metric

- `seedspec/` is a workflow package with HubSpot-native, existing-platform, and
  scheduled-service implementation profiles.
- `authoring/` contains its non-distributable audit history and three unresolved
  metric-definition questions.
- It has no committed realization yet.

```bash
npx @seedspec/cli validate solutions/hubspot-daily-metric/seedspec
npx @seedspec/cli lint solutions/hubspot-daily-metric/seedspec
npx @seedspec/cli begin solutions/hubspot-daily-metric/seedspec
npx @seedspec/cli prepare \
  solutions/hubspot-daily-metric/seedspec \
  --state solutions/hubspot-daily-metric/authoring-current
```

Resolve the HubSpot-native direction into a new project directory:

```bash
npx @seedspec/cli resolve \
  solutions/hubspot-daily-metric/seedspec \
  -i hubspot-native \
  --applied-intent project-inputs/applied-intent/hubspot-daily-metric.yaml \
  --configuration-selections project-inputs/configuration-selections/hubspot-daily-metric.yaml \
  --completion-scope project-inputs/completion-scopes/hubspot-daily-metric.yaml \
  --output .tmp/hubspot-daily-metric
```
