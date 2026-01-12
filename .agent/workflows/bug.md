---
description: Fix a bug by identifying the violated invariant and fixing it at the source
---

# Bug Fix Workflow

This workflow enforces the rule: "Bugs are fixed at the layer where the invariant belongs."

1.  **Analysis**
    - [ ] Identify the broken invariant (what *should* happen vs what *does* happen)
    - [ ] Locate the *source* of the bug, not just the symptom

2.  **Layer Selection**
    - [ ] **Agent Config**: Load the prompt for the affected layer (e.g., `backend.md`, `frontend.md`)
    - [ ] If the bug is data corruption -> `schema.md`
    - [ ] If the bug is logic error -> `backend.md`
    - [ ] If the bug is visual/state sync -> `frontend.md`

3.  **Execution**
    - [ ] Write a failing test case (if possible)
    - [ ] Apply the fix respecting strict boundaries
    - [ ] Verify no other layers are negatively impacted

4.  **Verification**
    - [ ] Run tests to confirm fix: `npm test`
    - [ ] Ensure no new dependencies were added

> **WARNING**: Do not "patch" the UI for a backend bug. Fix it in the backend.
