---
description: Improve code structure without changing observable behavior
---

# Refactor Workflow

This workflow enforces the rule: "Refactors do not change behavior."

1.  **Planning**
    - [ ] Define the structural goal (e.g., "Move auth logic to middleware", "Split broad service into domains")
    - [ ] Confirm that public schemas/API contracts will NOT change

2.  **Execution**
    - [ ] **Agent Config**: Load `.agent/prompts/router.md` to switch between contexts if needed
    - [ ] Move files / Rename symbols
    - [ ] Update imports

3.  **Enforcement**
    - [ ] Check dependency graph: `libs/*` must NEVER import `apps/*`
    - [ ] Check circular dependencies

4.  **Verification**
    - [ ] `npm run typecheck` MUST pass
    - [ ] `npm test` MUST pass without modification (unless tests were moved)

> **CRITICAL**: If you change behavior, it is NOT a refactor. It is a Feature or a Breaking Change.
