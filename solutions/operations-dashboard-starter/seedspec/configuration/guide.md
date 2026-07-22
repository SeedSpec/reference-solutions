# Operations Dashboard Starter Kit configuration guide

- `workspace_name` and `record_model` replace generic interface language with
  the team's own operational vocabulary.
- `statuses` defines the allowed current lifecycle values. Removing a status
  does not erase it from history and requires a migration for active records.
- `metrics` defines each overview value in product language. The example is a
  complete configuration, not an implicit end-user default.
- `stale_after_minutes` controls when the product must stop presenting data as
  current.
- `views` controls whether users can create only private views or also governed
  team views.
- `actions` selects the mutation workflows exposed to operators.
- `exports` either disables export or limits it to the user's authorized,
  visible working set.

Data connectors, identity systems, hosting, and other technical choices belong
to project-level implementation preferences rather than this product
configuration.
