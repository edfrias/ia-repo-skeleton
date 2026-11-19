@AGENTS.md

## Claude Code specifics

- Role subagents live in `.claude/agents/` and are generated from `agents/` by
  `scripts/sync-agents`. Edit `agents/`, never `.claude/agents/` directly.
- Shared permissions (deny rules for secrets and destructive commands) are in
  `.claude/settings.json`. Personal overrides go in `.claude/settings.local.json`
  (git-ignored).
