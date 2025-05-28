# 04. Client vs. server components

Date: 2025-05-25

## Status

Accepted

## Context

To support multiplayer gameplay across multiple devices, the architecture must be adapted to split responsibilities between a client (running on each player's device) and a server (coordinating game state and player actions). The current implementation is single-process and single-device, with all game logic, rendering, and input handling running in the browser. Supporting multiple devices requires a clear separation of concerns and communication protocol between client and server.

## Decision

- **Client responsibilities:**
  - Capture player input (keyboard, touch, etc.) and send actions to the server.
  - Render the game state as received from the server using PixiJS.
  - Display points, game over, and other UI elements.
  - Maintain minimal local state (only for rendering and input buffering).
- **Server responsibilities:**
  - Maintain the authoritative game state, including all players, shapes, and world rules.
  - Apply game rules, process player actions, and advance the game (e.g., via a server-side ticker).
  - Broadcast updated game state to all connected clients after each tick or action.
  - Handle player join/leave and synchronize new clients with the current game state.
- **Communication:**
  - Use WebSockets for real-time, bidirectional communication between clients and server.
  - Define a protocol for sending player actions (from client to server) and game state updates (from server to clients).

## Consequences

- The game logic and world state must be refactored to run on the server, with the client acting as a thin view/controller.
- The renderer and input modules remain on the client, but are decoupled from the game world logic.
- Network latency and synchronization must be considered; the server is the source of truth for all game state.
- Enables true multiplayer gameplay across devices, but increases complexity in state management and error handling.
