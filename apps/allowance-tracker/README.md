# Allowance Tracker reference application

This small application is an implementation experiment for the resolved Allowance Tracker and Chore Streaks SeedSpec packages in `.seedspec/`. It is one workspace in the reference-applications monorepo and evidence for the SeedSpec workflow, not a prescribed application architecture.

The protocol, schemas, runtime, and CLI are maintained in [SeedSpec/seedspec](https://github.com/SeedSpec/seedspec). This monorepo remains an independent downstream consumer.

The local product deliberately calls chores **Bhores**. That semantic mapping and the Chore Streaks capability-revision review are recorded in `.seedspec/implementation-notes.md`.

Run it with Node.js 20 or newer:

```bash
npm start
```

Then open `http://127.0.0.1:4173`. The demo stores state in memory and resets when the process restarts.

Run its tests with:

```bash
npm test
```
