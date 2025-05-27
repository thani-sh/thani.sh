import { WebSocketServer, WebSocket } from "ws";
import {
  createGameWorld,
  type GameWorldOptions,
  type GameWorld,
} from "./game/world";
import { createWorldRules } from "./game/world_rule";
import { ShapeActionName } from "./game/shape_action";
import { SHAPE_TYPES } from "./game/shape_type";
import { WORLD_W, WORLD_H } from "./game/config";
import { createBasicTicker } from "./game/ticker";

// --- Types for protocol ---
type ClientMessage =
  | { type: "join"; player: { name: string; color: number } }
  | { type: "action"; playerId: string; action: ShapeActionName };

type ServerMessage =
  | {
      type: "state";
      players: any[];
      shapes: any[];
      scores: Record<string, number>;
      tick: number;
    }
  | { type: "player_joined"; player: any }
  | { type: "player_left"; playerId: string }
  | { type: "game_over"; reason: string };

// --- Player and connection management ---
interface PlayerConn {
  id: string;
  name: string;
  color: number;
  ws: WebSocket;
}

const wss = new WebSocketServer({ port: 8080 });
const players: PlayerConn[] = [];
let tick = 0;

// --- Renderer Proxy ---
function createRendererProxy(broadcast: (msg: ServerMessage) => void) {
  return {
    insertShape: (shape: any) => {},
    updateShape: (shape: any) => {},
    removeShape: (shape: any) => {},
    updatePoints: (points: number) => {},
    broadcastState: (state: any) => {
      broadcast({ type: "state", ...state, tick });
    },
  };
}

// --- Game World Setup ---
let gameWorld: GameWorld | null = null;

function startGame() {
  if (gameWorld) gameWorld.cleanup();
  const ruleset = createWorldRules();
  const ticker = createBasicTicker(500);
  const renderer = createRendererProxy(broadcastToAll);
  const options: GameWorldOptions = {
    players: players.map((p) => ({ color: p.color })),
    renderer,
    ruleset,
    ticker,
  };
  gameWorld = createGameWorld(options);
}

function handleAction(data: any) {
  if (!gameWorld) return;
  const pidx = players.findIndex((p) => p.id === data.playerId);
  if (pidx === -1) return;
  gameWorld.handleAction(pidx, data.action);
}

function broadcastToAll(msg: ServerMessage) {
  for (const p of players) {
    p.ws.send(JSON.stringify(msg));
  }
}

function handleJoin(ws: WebSocket, data: any) {
  const id = Math.random().toString(36).slice(2);
  const player: PlayerConn = {
    id,
    name: data.player.name,
    color: data.player.color,
    ws,
  };
  players.push(player);
  ws.send(
    JSON.stringify({
      type: "player_joined",
      player: { id, name: player.name, color: player.color },
    })
  );
  broadcastToAll({
    type: "player_joined",
    player: { id, name: player.name, color: player.color },
  });
  if (players.length === 1) startGame();
}

wss.on("connection", (ws) => {
  ws.on("message", (msg) => {
    let data: ClientMessage;
    try {
      data = JSON.parse(msg.toString());
    } catch {
      return;
    }
    if (data.type === "join") {
      handleJoin(ws, data);
    } else if (data.type === "action") {
      handleAction(data);
    }
  });
  ws.on("close", () => {
    // TODO: Remove player, broadcast player_left
  });
});

console.log("WebSocket server running on ws://localhost:8080");
