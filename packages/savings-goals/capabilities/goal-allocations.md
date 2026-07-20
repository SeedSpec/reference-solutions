# `org.seedspec.finance.goal-allocations` 1.1.0

A provider supplies auditable, idempotent allocations and withdrawals associated with an actor's balance and an owned savings goal.

In reserved mode, accepted operations are atomic with host availability and transaction recording, and the same units cannot be spent or allocated concurrently elsewhere. In tracked mode, an allocation is an attributed feature record that changes goal progress without claiming to change the host balance.

Revision 1.1.0 distinguishes tracked allocation records from balance-changing reserved operations and extends retry and atomicity expectations across fund dispositions.
