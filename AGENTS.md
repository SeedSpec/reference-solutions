# SeedSpec reference applications

Keep every runnable application inside `apps/<name>/` with its own package, tests, implementation, and `.seedspec` workspace. Run `npm run check` from the repository root before committing changes.

Reference applications consume the protocol but do not define it. Protocol schemas, runtime behavior, CLI behavior, and conformance rules belong in `SeedSpec/seedspec`.
