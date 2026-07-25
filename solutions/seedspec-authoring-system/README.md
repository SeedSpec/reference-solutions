# SeedSpec Authoring System

This reference solution dogfoods SeedSpec to specify its own shared headless
authoring engine, CLI, and web workbench. The package captures the accepted
cross-frontend boundary; its adjacent `authoring/` directory records the
ongoing manual authorship session and is not distributable package content.

Enter this directory and resume authoring without installing the CLI:

```bash
cd solutions/seedspec-authoring-system
npx @seedspec/cli author
```

The command discovers the sibling `seedspec/` package and `authoring/`
workspace, shows the current review, and suggests the next authoring action.
Pinned commands with explicit paths remain appropriate for repository tests and
recorded evidence.
