---
description: How to execute a PRD using the Agent Router and strict workflows
---

# PRD Execution Workflow

This workflow describes how to turn a Product Requirement Document (PRD) into code using the Agent Router.

## 1. Context Loading (The "Meta" Step)

**User Action:**
Paste the PRD into the chat (or provide a file path).

**Agent Action:**
1.  **Read the PRD**.
2.  **Load the Router**: Read `.agent/prompts/router.md`.
3.  **Load the Guided Flow**: Read `.agent/workflows/guided_flow.md`.

## 2. Decomposition (The "Router" Step)

The agent must break the PRD down into discrete, layer-specific tasks.

*   **Example Prompt to Agent:**
    > "Here is the PRD. Using the rules in `guided_flow.md` and `router.md`, break this down into a step-by-step implementation plan. For each step, specify which Agent Role (and prompt file) is required."

*   **Expected Agent Output:**
    1.  **Schema Phase** (Role: Database Agent & Contracts Agent)
        *   **Prompt**: `.agent/prompts/db.md` and `.agent/prompts/contracts.md`
        *   **Goal**: Define the data structures in `libs/schemas` (Zod/Drizzle) and `libs/api-contracts`.
        *   **Output**: Drizzle tables, Zod schemas, Enum definitions.
    2.  **Backend Phase** (Role: Backend Services Agent)
        *   **Prompt**: `.agent/prompts/backend.md`
        *   **Goal**: Implement business logic in `libs/services`.
        *   **Output**: Service functions, event emitters.
    3.  **API Phase** (Role: API Agent, Prompt: `.agent/prompts/api.md`)
        *   Task: Add `POST /users` endpoint.
    4.  **UI Phase** (Role: Frontend Agent, Prompt: `.agent/prompts/frontend.md`)
        *   Task: Build registration form with TanStack Query.

## 3. Execution (The "Work" Steps)

Execute the steps **sequentially**.

**Crucial Rule:**
Before starting each step, the agent **MUST** explicitly load the prompt for that specific role.

*   *Step 1 starts...* agent reads `.agent/prompts/db.md`... writes code...
*   *Step 2 starts...* agent reads `.agent/prompts/backend.md`... writes code...

## 4. Verification

After all steps:
1.  Run `npm run typecheck`
2.  Run `npm test`
3.  Verify the feature against the PRD requirements.
