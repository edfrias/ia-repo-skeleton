# Handoffs

Every role writes one file here when it finishes (or blocks), named
`NNNN-<role>-<short-topic>.md`, numbered sequentially. Then it adds one line to
`docs/progress.md`.

## Template

```markdown
# Handoff NNNN — [Role] — [short topic]

- **Status**: complete / blocked / partial
- **Deliverable(s)**: [file paths]
- **Verification**: `scripts/check` result, and what else was run
- **Key decisions made**: [brief list; link ADRs if any]
- **Pending / out of scope**: [brief list]
- **Blocking question** (only if blocked): [the exact question for the human]
- **For the next role**: [who receives the baton and what it needs to know]
```

Each role file in `agents/` lists the extra items its handoff must include.
