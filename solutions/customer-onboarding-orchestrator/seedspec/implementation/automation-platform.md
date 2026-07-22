# Approved automation platform

Prefer this profile when an accountable team already operates an approved
automation platform with suitable connections, credential handling,
observability, retry controls, and change management.

The implementing agent should establish an idempotent source key, explicit
state ownership, least-privilege connections, safe retry and replay behavior,
dead-letter or visible failure handling, and tests that customer messages
exclude internal data. Platform run history is operational evidence, not proof
that the customer achieved the milestone outcome.
