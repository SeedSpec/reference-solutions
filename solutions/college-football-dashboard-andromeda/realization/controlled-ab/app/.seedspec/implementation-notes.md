# SeedSpec implementation notes

## Local terminology and concept mappings

- “Demo fixtures” are deterministic, author-independent local data used because no current sports provider is connected. The UI labels them “not live” in the header, overview, and footer.
- Configured team IDs are the canonical identity keys. Provider-like labels in the fixtures are attribution strings only; no provider alias can change a configured ID.
- “Current,” “stale,” “updating,” “unavailable,” “partial,” and “conflict” are explicit demonstration modes selectable from the persistent control deck.
- Game score source of record is “Demo Sports feed”; schedule source is “Demo Schedule feed”; rankings use “Demo Poll archive”; metrics use “Demo Statistics feed.”

## Material behavioral deviations

- No live API, simulated refresh timer, credential, account, persistence layer, or AI Canvas runtime was added. Fixture-state changes are deliberate user selections, not a simulated feed.
- The exact Andromeda sources retain their upstream `@ts-nocheck` annotations. They are excluded from local ESLint along with the protocol-preserved `.seedspec` copy; application-authored code is linted. No type-safety claim is made for the reference snapshot.
- Geist Mono is bound to the Andromeda font variable as a compatible local typography adaptation instead of adding a second font package.
- `StatTile` was not selected because team records, rankings, next games, and status text need richer semantics than a standalone numeric KPI. Snapshot cards use exact `Card`, `CornerMarkers`, and `Badge` sources.
- No social preview image was generated because this local-only controlled run explicitly forbids deployment and does not require a published unfurl.

## Architecture and integration choices

- Single-route vinext/React application using local client state for view, season, week, ranking source, metric, schedule filters, data-state demonstration, and team-detail navigation.
- The full authored acceptance component is implemented in one dashboard surface with Overview, Schedule, Rankings, Compare, and stable Team Detail views.
- Two seasons are deterministic and isolated: selecting 2025 changes records, dated ranking observations, schedule dates/source labels, and all metric values together.
- Final-score protection is implemented and unit-tested in `app/dashboard/game-state.mjs`; ordinary regressive updates are ignored and explicit source corrections are labeled.
- Ranking gaps use `null` observations, while separate state maps distinguish “explicitly unranked” from “unavailable.” The chart is supplemented by a complete value table.
- Wide tables and segmented controls scroll internally; the page root never scrolls horizontally. Desktop-first reflow uses the preserved `mq` breakpoint helper.
- Selected exact Andromeda files: `tokens.ts`, `lib/utils.ts`, `lib/responsive.ts`, `lib/motion.ts`, `Alert`, `Badge`, `Button`, `Card`, `CornerMarkers`, `EmptyState`, `PanelHeader`, `SegmentedControl`, `Spinner`, `Table`, and `TrendChart`.
- Runtime dependencies added only for selected sources: `@phosphor-icons/react`, `@radix-ui/react-slot`, `class-variance-authority`, `clsx`, `framer-motion`, `recharts`, and `tailwind-merge`.

## External resources and configured state

- Selected profile: `andromeda-reference`.
- Consulted resolved resource: `org.seedspec.guidance.andromeda-college-football-dashboard@0.1.0`.
- Context7 instructions were reviewed; actual Context7 consultation was skipped because no Context7 capability is present and installed/bundled source inspection was sufficient.
- Upstream: `uiNerd16/aicanvas`, commit `6e257795f967a21448c19a7237d0b041128ceae0`, public Andromeda v1, MIT license (Copyright 2026 AI Canvas).
- No external systems were created, updated, or connected.

## Known limitations and follow-up

- Data is intentionally deterministic fixture content and never refreshes from current sports sources.
- State and filter selections persist while navigating inside the application but reset on full page reload.
- The Recharts dependency creates a client chunk above the default 500 kB warning threshold; the production build succeeds.
- Verification used production HTTP rendering, automated model/state checks, linting of application-authored code, responsive-rule inspection, and production builds. Per the Sites preview rules for a background task, no browser screenshot or DOM-driving visual QA was performed.
