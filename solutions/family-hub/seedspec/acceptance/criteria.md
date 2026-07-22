# Family Hub acceptance criteria

Unless a criterion names an option, it applies to every configuration.

## Household and access

1. A guardian can establish a household in the configured timezone and add a
   member.
2. At least one active guardian always remains.
3. An actor cannot access another household's records.
4. An archived member cannot act or receive new assignments, and their name
   remains on history.
5. In `guardian-managed` mode, the core workflows require no member sign-in.
6. In `participating-members` mode, a member can update only their eligible
   participation and assignments.

## Events

7. An authorized person can create an event and invite household members.
8. Participants can record going, not going, or undecided.
9. A time change or cancellation is visible to participants and attributed in
   activity history.
10. A recurring event creates non-duplicated occurrences, and editing one
    occurrence does not rewrite the series.
11. An event cannot end before it starts.
12. Under `private-details-supported`, an excluded member cannot read the
    title, location, notes, or participant details of a private event.

## Tasks

13. An authorized person can assign one task independently to two members.
14. A recurring task generates each due occurrence exactly once.
15. Under `self-complete`, an eligible completion becomes completed without
    guardian confirmation.
16. Under `guardian-confirm`, a completion waits for guardian approval and can
    be returned with feedback.
17. Editing a task template does not rewrite a completed assignment.
18. Concurrent or repeated completion actions do not create duplicate state or
    rewards.

## Optional modules

19. When allowance tracking is enabled, approving one rewarded assignment
    creates exactly one attributed earning entry.
20. The displayed allowance balance equals the sum of that member's entries.
21. Corrections create compensating entries rather than rewriting history.
22. If an earning entry cannot be recorded, the rewarded completion is not
    approved.
23. When meal planning is enabled, a member can place a meal on a dated slot and
    add an item to the shared grocery list.
24. Removing a meal does not silently delete a grocery item.
25. Disabled modules permit no new module activity.

## Resilience

26. Time-based behavior remains aligned to the configured household timezone
    across daylight-saving changes.
27. Notification retry does not duplicate product records.
28. A conflicting edit presents the accepted current state without discarding
    preserved history.
29. Disabling a module preserves its historical records.

