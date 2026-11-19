# Skeleton with Harness Engineering in mind

> Repository skeleton to kick off any project with "harness engineering": an
> orchestrator agent distributes work among role-specialised subagents, every
> handoff is written to disk, and a single `scripts/check` tells humans, agents
> and CI whether the work is done.

## Start here

1. Read [`AGENTS.md`](./AGENTS.md) — the map: hard rules, roles, default flow.
2. Follow [`docs/getting-started.md`](./docs/getting-started.md) to adapt the
   skeleton to your project.
3. Run `scripts/check` before every handoff and commit.

## Structure

```
.
├── AGENTS.md                  # Map for any agent tool (read this first)
├── CLAUDE.md                  # Claude Code loader: imports AGENTS.md
├── agents/                    # Role definitions (canonical, tool-agnostic)
├── .claude/
│   ├── agents/                # Generated from agents/ by scripts/sync-agents
│   └── settings.json          # Shared deny rules (secrets, destructive commands)
├── docs/
│   ├── getting-started.md     # How to adapt this skeleton
│   ├── progress.md            # Current state + handoff log (read when resuming)
│   ├── handoffs/              # One file per handoff + template
│   ├── requirements.md        # Product Owner deliverable
│   ├── architecture.md        # Stack, layout, verification commands
│   ├── api-contract.md        # Contract between Backend and Frontend
│   ├── qa-report.md           # QA deliverable
│   ├── design/                # Designer deliverables
│   └── decisions/             # ADRs (template in 0000-template.md)
├── scripts/
│   ├── check                  # Single verification entry point
│   └── sync-agents            # agents/ → .claude/agents/
├── src/                       # Default layout; adapt in docs/architecture.md
├── tests/
└── .github/                   # CI (runs scripts/check) + PR template
```

## Philosophy

This repo assumes no specific language or framework: it is a **process**
skeleton, not a code skeleton. The default role set targets a product with UI +
API; adapt it for anything else. Information moves between roles through
explicit, written handoffs instead of relying on implicit chat context, and
"done" is defined by a check that can be run, not by an agent's claim.
