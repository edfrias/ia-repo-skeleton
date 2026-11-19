# AGENTS.md

Entry point for any AI agent (Claude Code, Codex, Cursor, Copilot, Gemini CLI...)
working in this repository. This file is a **map**: it holds the hard rules and
points to where everything else lives. Keep it short (~100 lines).

> This is a skeleton. Items marked **(default)** are starting choices, not
> requirements — change them in this file when a project needs something else.

## Hard rules

1. **Verify before handing off.** Run `scripts/check`. Do not report a task as
   complete while it fails.
2. **Write state to disk, not to chat.** Every handoff is written to
   `docs/handoffs/` and summarised in `docs/progress.md`. Chat context is lost
   between sessions; the repository is the system of record.
3. **Do not invent missing inputs.** If a required input is missing or
   ambiguous, stop with `Status: blocked` and state the exact question.
   Subagents return it to the orchestrator; only the orchestrator asks the human.
4. **Respect closed decisions.** Read `docs/decisions/` before proposing a change
   that contradicts an existing ADR. Reversing one requires a new ADR.
5. **Guardrails.** Never read or commit secrets (`.env*` except `.env.example`).
   Never push to `main` or force-push. Never run destructive commands (`rm -rf`,
   dropping databases, rewriting history) without explicit human approval.
   Adding a new runtime dependency requires a line of justification in the
   handoff (or an ADR if it shapes the architecture).

## Where things live

| What | Where |
|---|---|
| How to start a project from this skeleton | [`docs/getting-started.md`](docs/getting-started.md) |
| Role definitions | [`agents/`](agents/) (one file per role) |
| Handoff template and history | [`docs/handoffs/`](docs/handoffs/) |
| Current status / log | [`docs/progress.md`](docs/progress.md) |
| Requirements | [`docs/requirements.md`](docs/requirements.md) |
| Stack, layout, test locations | [`docs/architecture.md`](docs/architecture.md) |
| Decisions (ADRs) | [`docs/decisions/`](docs/decisions/) |
| Verification entry point | [`scripts/check`](scripts/check) |

## Roles (default set)

The default set targets a product with UI + API. For other kinds of project
(CLI, library, data pipeline, game...) remove, merge or add roles.

| Role | File | Main deliverable |
|---|---|---|
| Product Owner | `agents/product-owner.md` | `docs/requirements.md` |
| Designer (UX/UI) | `agents/designer.md` | `docs/design/` |
| Backend Developer | `agents/backend-developer.md` | `src/backend/`, `docs/api-contract.md` |
| Frontend Developer | `agents/frontend-developer.md` | `src/frontend/` |
| QA | `agents/qa.md` | tests + `docs/qa-report.md` |

To add a role, create `agents/<role>.md` (with the same frontmatter as the
others), add a row here, and run `scripts/sync-agents`.

**Architecture ownership:** `docs/architecture.md` is owned by the orchestrator
together with the human. It must exist before any developer role starts.

## Orchestration flow (default)

```
Product Owner ─▶ Designer ─▶ Backend: API contract ─┬─▶ Backend: implementation ─┐
                                                    └─▶ Frontend                 ─┤
                                                                                  ▼
                                                              QA ─▶ (loop on blocking bugs)
```

1. Product Owner turns the request into verifiable requirements.
2. Designer produces flows, screens and design system.
3. Backend publishes the API contract (draft is fine) — this unblocks Frontend.
4. Backend and Frontend implement in parallel.
5. QA verifies against the acceptance criteria. Blocking bugs reopen the
   responsible role with the QA report as input.
6. The orchestrator updates `docs/progress.md` and summarises to the human.

Small tasks (a fix, a single endpoint) may skip roles; the orchestrator states
which ones and why.

## Definition of Done

- `scripts/check` passes.
- Tests cover the change; docs touched by the change are updated.
- Handoff written. Reviewed by QA — or, for tasks that skipped QA, by a second
  agent or the human, stated explicitly in the handoff.

## Conventions (default)

- Documentation language: English.
- Commits: Conventional Commits (`feat:`, `fix:`, `docs:`, `test:`...).
- Branches: `main` protected; work on short-lived branches.
