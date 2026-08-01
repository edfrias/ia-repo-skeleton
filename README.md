# Skeleton with Harness Engineering in mind

> Repository skeleton to kick off any project with "harness
> engineering": an orchestrator agent that distributes work among
> role-specialised subagents (Product Owner, Design, Backend,
> Frontend, QA).

## Start here

1. Read [`AGENTS.md`](./AGENTS.md) — defines how subagents are orchestrated
   and the default workflow.
2. Each role has its detailed spec in [`agents/`](./agents/).
3. Fill in `docs/requirements.md` and `docs/architecture.md` with the real
   content of your project (templates are already in place).
4. Delete from `src/` whatever you don't need (e.g. if the project is
   backend-only, remove `src/frontend/`).

## Structure

```
.
├── AGENTS.md                  # Subagent orchestration (read this first)
├── agents/                    # One file per role with its mission and deliverable
│   ├── product-owner.md
│   ├── designer.md
│   ├── backend-developer.md
│   ├── frontend-developer.md
│   └── qa.md
├── docs/
│   ├── requirements.md        # Product Owner deliverable
│   ├── architecture.md        # Stack and architecture decisions
│   ├── api-contract.md        # Contract between Backend and Frontend
│   ├── qa-report.md           # QA deliverable
│   ├── design/                # Designer deliverables
│   └── decisions/             # ADRs (Architecture Decision Records)
├── src/
│   ├── backend/
│   └── frontend/
├── tests/
│   ├── unit/
│   └── e2e/
└── .github/workflows/         # Minimal CI (placeholder)
```

## Philosophy

This repo assumes no specific language or framework: it is a **process**
skeleton, not a code skeleton. The idea is that an orchestrator agent (or you
yourself) can take this empty repo, follow `AGENTS.md`, and build any
project by delegating to the defined roles, with structured information handoffs
explícitos entre ellos en vez de depender de contexto implícito.
