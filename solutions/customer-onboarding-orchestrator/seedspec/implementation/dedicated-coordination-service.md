# Dedicated coordination service

Use this profile only when existing systems and an approved automation platform
cannot preserve the workflow faithfully and an accountable team will operate a
separate service.

The implementing agent should verify the approved runtime and secret store,
define stable external-system identifiers, make every handler idempotent,
separate internal from customer-visible data, expose actionable monitoring,
and provide safe replay and reconciliation. The service must not become an
unreviewed shadow system for commercial or customer data.
