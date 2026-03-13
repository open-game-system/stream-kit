# Stream Kit Phase 2 Plan

This document tracks the work that should happen after the Cloudflare proof point is merged.

## Goal

Move from:

- a validated Cloudflare streaming runtime
- a working but low-level example
- partially productized packages

to:

- an OGS-owned streaming product
- a clean `stream-kit` SDK for game developers
- a control plane exposed through `opengame-api`
- a first-class integration path through `opengame-app`

## Phase 2 Priorities

Work in this order unless a blocker changes priorities.

### 1. Runtime Hardening

Goal: make the existing deployed runtime safe to keep running while product work continues.

Tasks:

- gate `/ice-servers` behind authenticated session creation
- make sure TURN credentials are minted only for authorized, short-lived sessions
- review `/debug-state` and either remove it from production mode or require stronger auth
- add ownership checks so one receiver cannot inspect or affect another session
- decide what logs stay in production and what becomes debug-only

Definition of done:

- no anonymous TURN minting
- no open debug surface
- session isolation enforced at the API boundary

### 2. Public SDK Design

Goal: define what third-party developers actually import and use.

Tasks:

- define the public API for `@open-game-system/stream-kit`
- define the public API for `@open-game-system/stream-kit-react`
- decide what is React-only versus framework-agnostic
- define fallback behavior inside vs outside `opengame-app`
- decide how much of `app-bridge` remains public, if any

Target surface:

- `OGSProvider`
- `CastButton`
- `StreamCanvas`
- `useCastSession()`
- `useTVStream()`
- `createOGSClient()` for non-React users

Definition of done:

- written API proposal
- docs examples for React and non-React
- agreement on what is public, internal, and deprecated

### 3. `opengame-api` Control Plane

Goal: move the product-facing session orchestration into the OGS backend.

Tasks:

- define stream session endpoints
- define cast session endpoints if casting and streaming are distinct products
- add auth, entitlement, and developer/game ownership checks
- add usage accounting and observability
- define the internal contract between `opengame-api` and the runtime

Likely endpoint family:

- `POST /api/v1/stream/session`
- `GET /api/v1/stream/session/:id`
- `DELETE /api/v1/stream/session/:id`
- `POST /api/v1/cast/session`
- `GET /api/v1/cast/session/:id`
- `DELETE /api/v1/cast/session/:id`

Definition of done:

- control-plane routes exist in `opengame-api`
- they create and manage authorized sessions against OGS-owned runtime infrastructure

### 4. `opengame-app` Integration

Goal: make the app the real host of the end-user experience.

Tasks:

- wire cast/stream actions from `app-bridge` or `stream-kit` into real backend sessions
- define the session lifecycle in the app
- define how TV mode differs from in-app cloud rendering
- define what the game sees versus what the native app owns

Definition of done:

- a web game in `opengame-app` can trigger a real OGS-managed stream/cast flow
- app/session state is reflected back to the web game consistently

### 5. Test Automation

Goal: improve confidence without depending only on manual receiver testing.

Tasks:

- add stronger seam tests for session creation and authorization
- add CI-safe integration tests around Worker/runtime request plumbing
- add deploy smoke verification for `health`, session creation, and runtime startup
- reduce known warnings in test output where practical

Definition of done:

- critical session/auth/runtime seams are covered
- deploy regressions are caught earlier than manual testing

## Recommended Branching After Merge

After this PR lands, branch from `main` and tackle the next work in smaller focused branches:

1. `codex/stream-kit-runtime-hardening`
2. `codex/stream-kit-sdk-design`
3. `codex/opengame-api-stream-control-plane`
4. `codex/opengame-app-stream-integration`

## Open Questions

These still need explicit decisions:

- Should cast mode and cloud render mode be separate products or one combined flow?
- Should `stream-kit` remain partly usable outside `opengame-app`, or fully optimize for the OGS app environment?
- Should the runtime stay as a sibling service/repo concern, or become a formal internal package consumed by `opengame-api`?
- What is the supported receiver model for TV playback long term?

## What This Repo Should Track

This `docs/` folder should remain the self-contained source of truth for:

- current architecture
- verified status
- target SDK shape
- next-step execution plan

When Phase 2 starts, update this file first, then implement against it.
