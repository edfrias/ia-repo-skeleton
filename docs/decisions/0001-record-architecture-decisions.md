# 0001 — Record architecture decisions as ADRs

## Status
Accepted

## Context
We need to keep track of why each relevant technical decision was made,
so that future agents/developers do not repeat already-closed discussions
or undo decisions without knowing the original rationale.

## Decision
Each significant architecture decision is documented in
`docs/decisions/NNNN-title-in-kebab-case.md`, numbered sequentially,
following this same template (Status / Context / Decision /
Consequences).

## Consequences
- Any role (especially Backend and Frontend) must consult this
  folder before proposing a change that contradicts a previous decision.
- If a decision is reversed, a new ADR is created referencing the
  previous one and marking it as "Superseded by NNNN", rather than deleting it.
