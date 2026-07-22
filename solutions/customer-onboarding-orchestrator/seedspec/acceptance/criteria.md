# Customer Onboarding Orchestrator acceptance criteria

## Start and ownership

1. The configured authorized start condition creates one onboarding case with
   one stable source identity.
2. Replaying the same source condition creates no duplicate case, milestone,
   message, or activity.
3. Missing or conflicting required handoff information is held for review or
   returned with a specific reason rather than invented.
4. Every required milestone is created once with its configured owner role and
   customer-visibility classification.
5. The onboarding owner can accept or return a handoff.

## Coordination

6. An authorized milestone owner can move assigned work among eligible states.
7. Blocking a milestone records an owned blocker and prevents that milestone
   from counting as complete.
8. Resolving a blocker does not automatically complete its milestone.
9. A waiver requires authority and a visible reason.
10. Consequential changes record actor, time, prior state, and new state.
11. Concurrent decisions settle on one current state and preserve accepted
    history.

## Updates and escalation

12. Customer updates include only customer-visible milestone and request data.
13. Internal notes, risk, commercial terms, and diagnostics never appear in a
    customer update.
14. The selected update cadence is followed without creating duplicate case
    state.
15. A delivery failure is visible and retryable.
16. Message delivery evidence is not represented as proof that a milestone
    outcome occurred.
17. After the configured threshold without meaningful progress, one stalled
    episode opens and one initial escalation is sent.
18. Retry does not duplicate the stalled episode or initial escalation.
19. Meaningful progress resolves the affected stalled episode; viewing or
    reminding alone does not.

## Completion and resilience

20. A case becomes ready only when every required milestone is complete or
    explicitly waived and no completion blocker remains.
21. Under `required-milestones-and-owner-signoff`, the case cannot complete
    without onboarding-owner confirmation.
22. Completion records milestone outcomes, waivers, actor, time, and remaining
    non-blocking follow-up.
23. A required external synchronization failure prevents a false claim of
    fully synchronized completion.
24. External credentials and connection secrets do not appear in package
    material, activity, or customer messages.
25. Historical evidence remains understandable after prospective configuration
    changes.
