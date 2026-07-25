# SeedSpec Authoring System acceptance criteria

1. Given the same accepted source and author decisions, CLI and web sessions
   produce package content with the same portable digest.
2. Validation and lint results have the same codes, severity, affected
   resource, and version metadata in the CLI and web workbench.
3. An invalid draft remains readable and editable, but pass completion,
   publish checking, and package export remain blocked with actionable errors.
4. An agent-proposed material change remains a proposal until the author
   accepts it, and rejection leaves package bytes unchanged.
5. Each accepted material change records its basis, authoring actor, prior
   workspace revision, resulting workspace revision, and resulting package
   digest.
6. Two changes based on the same revision cannot silently overwrite one
   another; the stale change receives a conflict and the accepted revision
   remains intact.
7. Retrying an interrupted answer, proposal, or accepted mutation does not
   create a duplicate durable record.
8. Closing the original conversation does not remove the sources, material
   questions, author answers, change decisions, or pass results needed to
   explain the package.
9. An authoring-workspace archive exported by either frontend can be imported
   by the other with equivalent draft documents, sources, questions, answers,
   findings, proposals, approvals, pass history, and format metadata.
10. A web-only decision-support capability can add proposals through the shared
    engine without adding provider session state or frontend-only data to the
    portable authoring artifacts.
11. Failure of an authoring agent or hosted request leaves the last accepted
   workspace revision inspectable and resumable.
12. Export produces a package that validates with independent SeedSpec tooling
    and excludes candidates, questions, conversations, workspace identifiers,
    and authoring pass state.
13. The exported package can be inspected and begun without the authoring
    frontend or a hosted SeedSpec account.
14. Opening or inspecting a workspace does not itself upload sources, call a
    model, publish a package, fetch external artifacts, or execute
    package-provided content.
15. From the root of a conventional project containing sibling `seedspec/` and
    `authoring/` directories, `npx @seedspec/cli author` resumes the workspace
    without a global install, exact version, `--yes`, package path, or state
    path.
16. Human-readable authoring status emphasizes the draft, questions, current
    review, and next action while machine-readable output retains workspace
    identity, revisions, digests, and version metadata.
