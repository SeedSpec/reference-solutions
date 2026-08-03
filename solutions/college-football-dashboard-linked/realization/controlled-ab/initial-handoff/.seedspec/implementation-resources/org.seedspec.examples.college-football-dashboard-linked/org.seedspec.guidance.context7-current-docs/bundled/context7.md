# Optional Context7 consultation

Use Context7 only when it is already available in the implementation
environment or the user separately authorizes connecting it. Do not install,
connect, authenticate, or transmit project material merely because this
resource exists.

## Purpose

Consult current, version-specific documentation when implementation depends on
a library whose APIs or setup may have changed since the agent's training data.
Context7 is documentation retrieval guidance, not product intent, a required
technology choice, or evidence that the implementation works.

## Procedure

1. Inspect the actual project and identify the exact installed or selected
   versions of relevant libraries.
2. Resolve each library to its Context7 identity before requesting
   documentation.
3. Request only the focused topics needed for the current decision, such as
   setup, accessibility, reduced motion, responsive charts, or a changed API.
4. Prefer documentation matching the project's version. If only a different
   version is available, label the mismatch and verify against the installed
   package or official documentation.
5. Do not send credentials, proprietary source, user data, or unrelated
   project context in a documentation query.
6. Record which library/version topics materially influenced implementation
   decisions.
7. If Context7 is unavailable, continue with bundled reference material,
   installed-package inspection, and official documentation. Do not block the
   product implementation solely because Context7 is absent.

For an Andromeda realization, likely documentation subjects include the target
project's versions of React, Tailwind CSS, Motion or Framer Motion, Recharts,
Radix Slot, Phosphor Icons, class-variance-authority, clsx, and tailwind-merge.
Query only the dependencies actually used by the selected component subset.
