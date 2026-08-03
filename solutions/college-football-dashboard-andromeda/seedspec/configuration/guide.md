# College Football Program Dashboard configuration guide

- `dashboard_name` is the user-facing product name.
- `season` scopes schedules, records, rankings, and statistics. It is not
  inferred from today's date.
- `timezone` controls display only; stored game instants must not change.
- `teams` is the complete watchlist. IDs are stable package configuration and
  must be mapped deliberately to any provider IDs.
- `favorite_team_id` must identify one configured team. It affects emphasis,
  not data meaning or comparison rules.
- `accent_color` may support team recognition but cannot be the only carrier of
  identity or status.
- `ranking_sources` declares which poll histories the product may present. A
  source can be temporarily unavailable without being removed from the
  configuration.
- `comparison_metrics` selects the defined season statistics used in team
  comparison. An implementation must obtain provider definitions compatible
  with the product labels or explain a material mapping difference.
- `freshness` defines when each data class stops being presented as current.
- `default_view` selects the first product surface without removing the others.

Data providers, API credentials, caching, component libraries, framework,
hosting, and deployment are implementation choices rather than product
configuration.
