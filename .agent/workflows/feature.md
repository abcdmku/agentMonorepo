---
description: Build a new user-facing feature with strict architectural enforcement
---

# Feature Build Workflow

This workflow enforces the "Features flow downward" rule: Schemas -> Services -> Adapters -> UI.

1.  **Preparation**
    - [ ] Read the request and identify the user (System/Partner/UI)
    - [ ] Create a mental model of the feature
    - [ ] Switch to **PLANNING** mode to document the plan

2.  **Schema / Data Layer** (Source of Truth)
    - [ ] **Agent Config**: Load `.agent/prompts/schema.md`
    - [ ] Define Drizzle schemas in `libs/schemas`
    - [ ] Define Zod validation schemas
    - [ ] Define Domain Events in `libs/domain-events`

3.  **Business Logic Layer** (Pure)
    - [ ] **Agent Config**: Load `.agent/prompts/backend.md`
    - [ ] Implement service functions in `libs/services`
    - [ ] Enforce `AuthContext`
    - [ ] Emit domain events
    - [ ] Write unit tests for logic

4.  **Adapter Layer** (Runtime)
    - [ ] **Agent Config**: Load `.agent/prompts/api.md` OR `.agent/prompts/realtime.md`
    - [ ] Expose REST endpoints in `apps/api`
    - [ ] Create WS subscriptions in `apps/ws` (if needed)

5.  **UI Layer** (Consumption)
    - [ ] **Agent Config**: Load `.agent/prompts/frontend.md`
    - [ ] Create TanStack Query hooks in `apps/ui`
    - [ ] Build UI components
    - [ ] Bind WS events to cache invalidation

6.  **Verification**
    - [ ] Run type check: `npm run typecheck`
    - [ ] Run tests: `npm test`
    - [ ] Verify no architectural boundary violations

> **STOP**: If you cannot describe the change in terms of "schema -> service -> app", you are doing it wrong.
