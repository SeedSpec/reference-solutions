# Customer Onboarding Orchestrator configuration guide

- `start_condition` identifies the authorized business event that may create a
  case. It does not select a vendor-specific event or connection.
- `target_business_days` describes the intended onboarding window.
- `stalled_after_business_days` controls when lack of meaningful progress opens
  a stalled episode.
- `customer_updates` controls which customer-visible updates the workflow is
  obligated to send. Internal coordination remains available in every mode.
- `completion_policy` determines whether complete required milestones are
  sufficient or an onboarding owner must also sign off.
- `required_milestones` defines the stable minimum plan and separates ownership
  from customer visibility.

System mappings, destinations, credentials, runtime, monitoring, and provider
selection belong to the chosen implementation profile and project-level
preferences. Configuration changes apply to newly created cases unless an
authorized migration explicitly addresses active cases.
