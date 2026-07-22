# Family Hub configuration guide

- `timezone` controls calendar-day boundaries, reminders, and recurrence.
- `child_access` chooses direct participation or guardian-managed activity.
- `event_privacy` either shares every event detail with the household or
  permits private details with blocked-time visibility.
- `task_completion` chooses immediate self-completion or guardian confirmation.
- `notifications` enables a daily digest and selects the upcoming-event window;
  `0` disables upcoming-event reminders.
- `modules` selects the optional allowance and meal-planning outcomes.

Selections apply prospectively. Disabling a module makes its prior records
read-only and preserves history. Changing the timezone must not silently move
already completed or historical occurrences; a realization should preview any
future-occurrence migration before applying it.
