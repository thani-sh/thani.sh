# 05. WebSocket API for Multiplayer Support

Date: 2025-05-25

## Status

Accepted

## Context

To enable multiplayer gameplay across multiple devices, the game must support real-time communication between clients and a central server. The server is responsible for maintaining the authoritative game state, processing player actions, and broadcasting state updates. Clients capture player input and render the game state as received from the server. A WebSocket-based protocol is required to support low-latency, bidirectional communication for this architecture.

## Decision

- **Protocol:** Use WebSockets for real-time, bidirectional communication between clients and the server.
- **Message Format:** All messages are JSON objects with a `type` field indicating the message type. Additional fields depend on the message type.
- **Client-to-Server Messages:**
  - `join`: Sent when a client connects. Includes player info (e.g., color, name).
  - `action`: Sent when a player performs an action (move, rotate, etc.). Includes player ID and action name.
- **Server-to-Client Messages:**
  - `state`: Broadcast after each tick or action. Contains the full authoritative game state (shapes, positions, scores, etc.).
  - `player_joined`: Notifies clients when a new player joins.
  - `player_left`: Notifies clients when a player disconnects.
  - `game_over`: Notifies clients when the game ends.

### Message Schemas

#### Client → Server

- **join**
  `{ "type": "join", "player": { "name": "string", "color": "number" } }`

- **action**
  `{ "type": "action", "playerId": "string", "action": "MOVE_LEFT" | "MOVE_RIGHT" | "MOVE_DOWN" | "ROTATE" }`

#### Server → Client

- **state**
  `{ "type": "state", "players": [...], "shapes": [...], "scores": {...}, "tick": "number" }`

- **player_joined**
  `{"type": "player_joined", "player": { "id": "string", "name": "string", "color": "number" }}`

- **player_left**
  `{ "type": "player_left", "playerId": "string" }`

- **game_over**
  `{ "type": "game_over", "reason": "string" }`

## Consequences

- Enables real-time multiplayer gameplay across devices.
- The server is the single source of truth for game state, reducing cheating and desync.
- The protocol is extensible for future features (e.g., chat, spectators).
- Requires careful handling of network latency and error cases.

---

_See also: [04-client-server-components.md](./04-client-server-components.md)_
