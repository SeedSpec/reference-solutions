# Bundled Andromeda v1 component subset

This directory preserves an exact subset of the public AI Canvas Andromeda v1
source for use as editable implementation reference.

## Included foundation

- `tokens.ts`
- `rules.md`
- `components/lib/utils.ts`
- `components/lib/responsive.ts`
- `components/lib/motion.ts`

## Included components

- Alert
- Badge
- Button
- Card and Card sections
- Corner Markers
- Empty State
- Icon Button
- Nav Item
- Panel Header
- Search Field
- Segmented Control
- Spinner
- Stat Tile
- Table
- Tooltip
- Trend Chart

Component-specific rules are included where the upstream snapshot provides
them.

## Likely runtime dependencies

Install only what the selected files require after inspecting the target
project:

- React
- Tailwind CSS
- Framer Motion
- Recharts
- Phosphor Icons for React
- Radix UI Slot
- class-variance-authority
- clsx
- tailwind-merge
- JetBrains Mono Variable or a deliberate compatible typography adaptation

The files are source references, not a complete package manifest. Dependency
versions must be reconciled with the actual project. The optional Context7
resource can help retrieve current version-specific documentation when it is
already available and the user directs its use.

## Scope

This set intentionally excludes complete AI Canvas templates, unrelated
components, provider code, authentication, and a data implementation. The
implementing agent must build the application described by the resolved
SeedSpec rather than presenting an AI Canvas gallery.
