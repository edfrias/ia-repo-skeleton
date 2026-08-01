# AGENTS.md — Subagent Orchestration

This file is the entry point for any AI agent (Claude Code,
Cursor, Codex CLI, etc.) working in this repository. It defines the **orchestration
model**, the **available roles**, and the **handoff protocol**
between them. This is an empty skeleton: replace the `[...]` placeholders
when starting a real project.

## 1. Philosophy

An orchestrator agent (the one reading this file) breaks each task into
sub-tasks and delegates them to role-specialized subagents. Each subagent:

- Has **a single responsibility** (single responsibility at the role level).
- Reads its own role file in `agents/<role>.md` before starting.
- Produces a **concrete deliverable** at the path specified in its file.
- Leaves a **handoff summary** for the next role, following
  the template in section 4.
- Does not assume another role's work: if a previous deliverable is missing, it asks
  instead of making it up.

## 2. Available roles

| Role | File | Required input | Main deliverable |
|---|---|---|---|
| Product Owner | `agents/product-owner.md` | Business idea/goal | `docs/requirements.md` |
| Designer (UX/UI) | `agents/designer.md` | `docs/requirements.md` | `docs/design/` (flows, wireframes, design system) |
| Backend Developer | `agents/backend-developer.md` | `docs/requirements.md` + technical design | Code in `src/backend/` |
| Frontend Developer | `agents/frontend-developer.md` | `docs/design/` + API contract | Code in `src/frontend/` |
| QA | `agents/qa.md` | Backend/frontend deliverables | `tests/` + `docs/qa-report.md` |

Add more roles (DevOps, Data, Security...) by creating `agents/<role>.md` and a
new row in this table.

## 3. Default orchestration flow

```
Product Owner ──▶ Designer ──▶ ┬─▶ Backend Developer ─┐
                                └─▶ Frontend Developer ─┤
                                                         ▼
                                                        QA ──▶ (loop if bugs found)
```

1. The orchestrator receives the user's request.
2. Invokes **Product Owner** to convert it into verifiable requirements.
3. Invokes **Designer** with those requirements.
4. Launches **Backend** and **Frontend** in parallel, both reading design +
   requirements. Backend publishes the API contract before Frontend needs it
   (see `docs/api-contract.md`).
5. Invokes **QA** against both deliverables.
6. If QA reports blocking bugs, the orchestrator reopens the responsible role
   with the QA report as input. Repeat until QA approves.
7. The orchestrator summarises the final status to the user.

This flow is the default for a "complete feature". For small tasks
(a fix, a single endpoint) the orchestrator may skip roles that add no
value, stating this explicitly in its response.

## 4. Handoff template

Each subagent, upon completion, must leave this in its output file or in the
summary it returns to the orchestrator:

```markdown
## Handoff — [Role]
- **Status**: complete / blocked / partial
- **Deliverable(s)**: [file paths]
- **Key decisions made**: [brief list]
- **Pending / out of scope**: [brief list]
- **For the next role**: [what it needs to know or review]
```

## 5. Repository conventions

- **Documentation language**: English.
- **Architecture decision management**: use `docs/decisions/` with
  ADR (Architecture Decision Record) format, one file per decision.
- **Definition of Done**: code + tests + updated docs + reviewed by QA.
- **Commits**: Conventional Commits (`feat:`, `fix:`, `docs:`, `test:`...).
- **Branches**: `main` protected; work on `feature/<role>-<short-description>`.

## 6. How to start a new project with this skeleton

1. Rename/edit this `README.md` with the real project description.
2. Fill in `docs/requirements.md` (the Product Owner role can do this).
3. Decide the stack in `docs/architecture.md`.
4. Delete the `src/` folders that don't apply (e.g. if backend-only, remove `src/frontend/`).
5. Start invoking the orchestrator with a high-level request; it will
   distribute the work among roles following this file.
