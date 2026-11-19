# Getting started with this skeleton

1. Create a repository from this template ("Use this template" on GitHub).
2. Rewrite `README.md` with the real project description.
3. Fill in `docs/architecture.md`: stack, folder layout and where tests live.
   Delete the `src/` and `tests/` folders that don't apply.
4. Adapt the role set in `AGENTS.md` and `agents/` to the kind of project.
   Run `sh scripts/sync-agents` after any change in `agents/`.
5. Implement the project section of `scripts/check` (lint, tests, build) for the
   chosen stack. CI already calls it.
6. Fill in `docs/requirements.md` (the Product Owner role can do this).
7. Start the orchestrator with a high-level request; it distributes the work
   following `AGENTS.md`.

## Using other agent tools

- **Codex, Cursor, Copilot, Gemini CLI and others** read `AGENTS.md` natively.
- **Claude Code** reads `CLAUDE.md`, which imports `AGENTS.md`, and picks up the
  role subagents from `.claude/agents/`.
- Tool-specific notes go in that tool's own file, never in `AGENTS.md`.
