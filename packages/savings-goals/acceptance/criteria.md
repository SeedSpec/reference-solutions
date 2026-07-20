# Savings Goals acceptance criteria

1. An authorized actor can create an active goal with a positive target.
2. A target of zero or less is rejected.
3. An owner can view their own goals but not another owner's goals without host authority.
4. An accepted allocation records exactly one attributed goal-allocation record and updates progress.
5. Retrying an allocation cannot allocate twice.
6. In `reserved` mode, accepted allocation reduces spendable availability by the same amount.
7. In `tracked` mode, allocation does not reduce spendable availability.
8. Allocation exceeding available value fails in reserved mode when the host does not support overdrafts.
9. Allocation and withdrawal follow their configured approval rules.
10. Reaching the target follows the configured completion behavior.
11. When `allow_overfunding` is false, an allocation that would exceed the target fails without changing progress or availability; when true, the excess is preserved even if displayed progress is capped.
12. Closing a reached goal follows `completion_funds` without losing history.
13. A funded goal is archived rather than erased; its remaining value follows `deletion_funds` and its allocation history is preserved.
14. Concurrent requests cannot reserve the same available units twice.
15. Failure to record a required goal-allocation or host balance transaction leaves goal progress and available balance unchanged.
16. Changes to closed or archived goals are rejected except for permitted administrative annotation.
17. A reached but unclosed goal returns to active when an accepted withdrawal or target increase leaves progress below the target.
18. Active and reached-but-unclosed goals count toward `max_active_goals`; closed and archived goals do not.
19. Retrying or concurrently requesting withdrawal, completion, or archival cannot release, reserve, or spend the same units twice.
20. If a configured completion or archival fund disposition cannot be recorded atomically, goal status, progress, and availability retain their prior values.
