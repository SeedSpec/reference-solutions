# SeedSpec implementation notes

## Local terminology and concept mappings

- “Fixture” means deterministic, illustrative demo data. It is labeled “not live” in the persistent header and footer.
- Configured team IDs (`texas`, `ohio-state`, `oregon`, and `notre-dame`) are the only team identity keys used by filters, season data, rankings, metrics, and details.
- “Fixture Scorebook A” is the declared score source of record. “Fixture Schedule Desk,” the named poll fixture, “Fixture Stats Lab,” and “Fixture Historical Archive” remain separately attributed data classes.
- `null` ranking observations render as “Unavailable”; the literal `UR` renders as “Unranked.” Trend gaps have no connecting visual segment.

## Material behavioral deviations

- No live sports provider or external API is used. This follows the implementation request’s deterministic-fixture fallback and avoids fabricating freshness.
- Primary surfaces use one client-side route with stable view state rather than multiple URLs. Team detail and Back preserve season, week, ranking source, comparison metric, and saved scroll position.
- No browser UI screenshots or automated click/resizing run was performed because this realization was built in a delegated/background thread and browser QA was not requested. Responsive and interaction coverage was verified structurally, through server rendering, source checks, lint, and type checking.

## Architecture and integration choices

- The Sites standard vinext starter is retained with its `sites()` Vite plugin and Cloudflare Worker-compatible output.
- The product is a single focused React client component plus one stylesheet. Data is local deterministic fixture state; no credentials, persistence, or provider calls are required.
- Season-scoped data is keyed explicitly by 2025 or 2026. Changing the season resets the week/stage and switches records, results, rankings, and metrics together.
- A visible “Data state demo” control makes normal, loading/updating, stale, rankings-unavailable, partial-provider, conflict, no-games, empty-configuration, and unknown-mapping behavior directly inspectable.
- Same-unit metric bars are supplemented by a full data table. Ranking trend cells are supplemented by an accessible table.
- Dynamic metadata derives an absolute social-card URL from the incoming request host. The project-specific raster card is `public/og.png`.
- `@cloudflare/workers-types` and a typed DB-binding guard were added so the untouched starter Worker/DB surfaces pass the project-wide TypeScript check even though this app does not use D1.

## External resources and configured state

- Resolved and consulted bundled resource `org.seedspec.guidance.context7-current-docs@0.1.0`.
- Context7 itself was unavailable and unnecessary; no changed dependency API required consultation.
- One built-in image-generation call produced the social preview card. The final project asset is `public/og.png`; no generated image is required at runtime.
- No external accounts, services, APIs, credentials, D1 databases, R2 buckets, or deployed Sites resources were created.

## Known limitations and follow-up

- All football information is illustrative; the application is not an official record book and intentionally provides no live refresh.
- “In progress” and “Halftime” are demonstration states inside the fixture dataset, not assertions about real games.
- Browser-level visual regression and interaction automation are not included. The production Worker-render test validates the initial server-rendered surface and static coverage tests validate state and accessibility hooks.
