# Dashboard-to-Andromeda component mapping

Use this map after reading the resolved dashboard definition and the system-wide
Andromeda rules. It is a shortlist, not an obligation to use every item.

| Dashboard need | Preferred reference | Notes |
| --- | --- | --- |
| Page and panel hierarchy | `Card`, `PanelHeader`, `CornerMarkers` | Avoid nesting corner-marked surfaces. |
| Watched-team summary | `StatTile`, `Badge` | Keep team color subordinate to data/status meaning. |
| Live, final, stale, and unavailable labels | `Badge`, `Alert` | Include text; color is reinforcement only. |
| Ranking and metric trends | `TrendChart` | Supply roles intentionally and add an accessible value table. Preserve gaps. |
| Schedule and comparison values | `Table` | Ensure narrow-screen behavior retains both team identities and status. |
| Season, week, ranking, or metric modes | `SegmentedControl`, `Button` | Use only for bounded option sets that fit. |
| Team or schedule search | `SearchField` | Do not use search as the only way to reach a watched team. |
| Navigation | `NavItem`, `IconButton` | Label icon-only controls accessibly. |
| Loading | `Spinner` | Pair with text and retain layout context. |
| Empty or unavailable | `EmptyState`, `Alert` | Distinguish no games from failed data retrieval. |
| Explanatory values | `Tooltip` | Do not hide required definitions exclusively in hover content. |

The reference component set deliberately omits a complete page template. Build
the page hierarchy from the product surfaces rather than copying an unrelated
mission-control dashboard.
