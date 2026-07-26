# College Football Dashboard — Andromeda-guided comparison package

This package is one half of a controlled implementation comparison. Its product
definition, configuration, capability contract, and acceptance criteria are
byte-identical to `college-football-dashboard-plain`.

This variant additionally provides:

- a preserved, MIT-licensed subset of the public AI Canvas Andromeda v1 source;
- Andromeda system and component rules;
- a package-scoped implementation skill that maps the dashboard surfaces to the
  selected components; and
- an explicit Andromeda implementation profile that the user may select or
  override.

Both comparison packages include the same optional Context7 instruction
resource.

```bash
npx @seedspec/cli validate solutions/college-football-dashboard-andromeda/seedspec
npx @seedspec/cli begin solutions/college-football-dashboard-andromeda/seedspec
```
