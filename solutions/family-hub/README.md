# Family Hub

Family Hub is a reference application package for coordinating a household's
shared events and tasks. Its example configuration also enables two optional
modules: allowance tracking and meal planning with a shared grocery list.

The package is intentionally implementation-agnostic. It describes the
household boundary, roles, privacy rules, workflow states, meaningful product
choices, and observable completion criteria without selecting a framework or
service provider. It has no committed realization yet.

```bash
npx @seedspec/cli validate solutions/family-hub/seedspec
npx @seedspec/cli lint solutions/family-hub/seedspec
npx @seedspec/cli begin solutions/family-hub/seedspec
```
