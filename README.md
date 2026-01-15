# Agent Monorepo

This repository is a monorepo structured using **Turborepo** (implied by structure) or standard NPM workspaces. It organizes code into **Apps** (deployable applications) and **Libs** (shared libraries).

## Architecture

The following diagram illustrates the dependency relationship between the various components in this repository.

```mermaid
graph LR
    %% Apps
    subgraph Apps
        UI["apps/ui <br/> (Vite + React)"]
        API["apps/api <br/> (Nitro Server)"]
        WS["apps/ws <br/> (WebSocket Server)"]
    end

    Partners["Partners <br/> (External Consumers)"] --> API
    Partners --> WS

    %% Libs
    subgraph Libs
        UILib["libs/ui <br/> (Component Library / Storybook)"]
        Services["libs/services <br/> (Business Logic)"]
        Contracts["libs/api-contracts <br/> (API Types)"]
        Shared["libs/shared <br/> (Utilities)"]
    end

    %% Dependencies
    UI --> API
    UI --> WS
    UI --> UILib
    API --> Services
    WS --> Services
    
    Services --> Contracts
    
    %% Note: Indirect deps or shared utils might be used widely
```

## Components

### Apps (Deployable)

| App | Path | Description |
| :--- | :--- | :--- |
| **@repo/api** | `apps/api` | The backend API server built with **Nitro**. It handles RESTful requests and orchestration. |
| **@repo/ui** | `apps/ui` | The main frontend application built with **React** and **Vite**. It consumes `@repo/api` and uses `@repo/ui-lib`. |
| **@repo/ws** | `apps/ws` | A specialized **WebSocket** server for real-time capabilities. |

### Libs (Shared)

| Lib | Path | Description |
| :--- | :--- | :--- |
| **@repo/services** | `libs/services` | Contains core business logic and service layer used by the API. |
| **@repo/ui-lib** | `libs/ui` | Shared React component library, developed and tested with **Storybook**. |
| **@repo/api-contracts**| `libs/api-contracts` | TypeScript definitions and Zod schemas used to define the API surface area. |
| **@repo/shared** | `libs/shared` | General purpose utilities used across the repository. |

## Getting Started

1.  **Install Dependencies**: `npm install`
2.  **Run Development**: Use the root scripts (managed by Turbo or similar) to start dev servers.
    *   `npm run dev` (typical)

## Sync vs Async Logic

Business logic lives in `@repo/services`, organized by domain:

- `libs/services/src/domains/<domain>/sync/*`: synchronous use-cases called by HTTP/WebSocket entrypoints
- `libs/services/src/domains/<domain>/async/*`: async consumers/handlers for Kafka/SQS/SNS-style message processing

Async handlers are wired through `libs/services/src/domains/index.ts` (`allConsumers`) and can be executed by a transport adapter implementing `AsyncTransport` (`libs/services/src/async/types.ts`). A runnable in-memory example is in `tools/async-worker.ts`.
