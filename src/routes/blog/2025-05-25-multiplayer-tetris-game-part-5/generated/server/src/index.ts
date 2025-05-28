import { WebSocketServer, WebSocket } from "ws";
import { v4 as uuidv4 } from "uuid";
import { GameManager } from "./game-manager.js";
import { ShapeActionName } from "./game/shape_action.js";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;

interface ClientMessage {
  type: string;
  [key: string]: any;
}

interface JoinMessage extends ClientMessage {
  type: "join";
  player: {
    name: string;
    color: number;
  };
  gameId?: string;
}

interface ReadyMessage extends ClientMessage {
  type: "ready";
  playerId: string;
}

interface ActionMessage extends ClientMessage {
  type: "action";
  playerId: string;
  action: ShapeActionName;
}

interface LeaveMessage extends ClientMessage {
  type: "leave";
  playerId: string;
}

class TetrisServer {
  private wss: WebSocketServer;
  private gameManager: GameManager;
  private playerSockets = new Map<string, WebSocket>();

  constructor() {
    this.wss = new WebSocketServer({ port: PORT });
    this.gameManager = new GameManager();
    this.setupWebSocketServer();
  }

  private setupWebSocketServer(): void {
    this.wss.on("connection", (ws: WebSocket) => {
      console.log("New client connected");

      ws.on("message", (data: Buffer) => {
        try {
          const message: ClientMessage = JSON.parse(data.toString());
          this.handleMessage(ws, message);
        } catch (error) {
          console.error("Error parsing message:", error);
          this.sendError(ws, "Invalid message format");
        }
      });

      ws.on("close", () => {
        console.log("Client disconnected");
        this.handleDisconnection(ws);
      });

      ws.on("error", (error) => {
        console.error("WebSocket error:", error);
      });
    });

    console.log(`Tetris WebSocket server running on port ${PORT}`);
  }

  private handleMessage(ws: WebSocket, message: ClientMessage): void {
    switch (message.type) {
      case "join":
        this.handleJoin(ws, message as JoinMessage);
        break;
      case "ready":
        this.handleReady(ws, message as ReadyMessage);
        break;
      case "action":
        this.handleAction(ws, message as ActionMessage);
        break;
      case "leave":
        this.handleLeave(ws, message as LeaveMessage);
        break;
      default:
        this.sendError(ws, `Unknown message type: ${message.type}`);
    }
  }

  private handleJoin(ws: WebSocket, message: JoinMessage): void {
    const playerId = uuidv4();
    const { name, color } = message.player;

    // Create a new game if no gameId provided
    const gameId = message.gameId || this.gameManager.createGame();

    const success = this.gameManager.joinGame(
      gameId,
      playerId,
      name,
      color,
      ws
    );

    if (success) {
      this.playerSockets.set(playerId, ws);

      // Send confirmation to the player
      this.sendMessage(ws, {
        type: "joined",
        playerId,
        gameId,
        player: { id: playerId, name, color },
      });

      // Send current players list to the new player
      const game = this.gameManager.getGame(gameId);
      if (game) {
        const players = Array.from(game.players.values()).map((p) => ({
          id: p.id,
          name: p.name,
          color: p.color,
        }));

        this.sendMessage(ws, {
          type: "lobby_state",
          players,
        });
      }
    } else {
      this.sendError(ws, "Failed to join game");
    }
  }

  private handleReady(ws: WebSocket, message: ReadyMessage): void {
    this.gameManager.setPlayerReady(message.playerId);
  }

  private handleAction(ws: WebSocket, message: ActionMessage): void {
    const validActions = Object.values(ShapeActionName);
    if (!validActions.includes(message.action)) {
      this.sendError(ws, `Invalid action: ${message.action}`);
      return;
    }

    this.gameManager.handlePlayerAction(message.playerId, message.action);
  }

  private handleLeave(ws: WebSocket, message: LeaveMessage): void {
    this.gameManager.leaveGame(message.playerId);
    this.playerSockets.delete(message.playerId);
  }

  private handleDisconnection(ws: WebSocket): void {
    // Find the player associated with this socket and remove them
    for (const [playerId, socket] of this.playerSockets.entries()) {
      if (socket === ws) {
        this.gameManager.leaveGame(playerId);
        this.playerSockets.delete(playerId);
        break;
      }
    }
  }

  private sendMessage(ws: WebSocket, message: any): void {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  }

  private sendError(ws: WebSocket, message: string): void {
    this.sendMessage(ws, {
      type: "error",
      message,
    });
  }
}

// Start the server
new TetrisServer();
