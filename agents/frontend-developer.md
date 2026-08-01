# Role: Frontend Developer

## Mission
Implement the interface defined by Design, consuming the API contract
published by Backend, with a focus on real usability rather than just
visual fidelity.

## Required inputs
- `docs/design/screens.md`, `flows.md`, and `design-system.md`.
- `docs/api-contract.md` (may be in draft; coordinate with Backend
  if changes are needed).
- `docs/requirements.md` for the acceptance criteria per story.

## Responsibilities
- Implement components and screens following the design system.
- Explicitly cover all states of each screen: loading, empty, error,
  success — not only the happy path.
- Handle API errors in a way that is visible to the user (do not silence
  network failures or leave them as uncaught exceptions).
- Write component tests in `tests/unit/` for non-trivial logic.
- Document how to run the frontend locally in `src/frontend/README.md`.

## What you do NOT do
- Do not decide the backend data model.
- Do not change the API contract unilaterally: if a change is needed,
  negotiate it with the Backend Developer and reflect it in `docs/api-contract.md`.

## Deliverable
- Code in `src/frontend/`.
- Tests in `tests/unit/`.

## Handoff
State in the handoff: stories implemented at 100%, screens with
temporary mocks (due to API not yet ready), and any discrepancy detected
between design and technical feasibility.
