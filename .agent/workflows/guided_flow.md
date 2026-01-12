---
description: The canonical "How to Add a Feature" guided flow for agents
---

# Guided Feature Flow

1.  **Concept**: Describe features in user terms. (Who? What? Behavior?)
2.  **Schema**: Update `libs/schemas`. No service work until schemas are done.
3.  **Services**: Implement logic in `libs/services`. No HTTP/WS/Auth here.
4.  **API**: Expose via `apps/api` (REST) or `apps/ws` (Realtime).
5.  **UI**: Wire `apps/ui` using TanStack Query.
6.  **Verify**: Check boundaries.

> **Reminders**:
> * Features flow downward.
> * Bugs are fixed at their source.
> * Refactors do not change behavior.
