import { v4 as uuidv4 } from "uuid";
import { createGameWorld } from "./game/world.js";
import {
  createNetworkPlayer,
  type NetworkPlayer,
} from "./game/network-player.js";
import { createNetworkRenderer } from "./game/network-renderer.js";
import { createTicker } from "./game/ticker.js";
import { createWorldRules } from "./game/world_rule.js";
import { ShapeActionName } from "./game/shape_action.js";
import type { WebSocket } from "ws";

export interface GamePlayer {
  id: string;
  name: string;
  color: number;
  socket: WebSocket;
  networkPlayer: NetworkPlayer;
  ready: boolean;
}

export interface GameInstance {
  id: string;
  players: Map<string, GamePlayer>;
  started: boolean;
  cleanup?: () => void;
}

export class GameManager {
  private games = new Map<string, GameInstance>();
  private playerToGame = new Map<string, string>();

  createGame(): string {
    const gameId = uuidv4();
    const game: GameInstance = {
      id: gameId,
      players: new Map(),
      started: false,
    };
    this.games.set(gameId, game);
    return gameId;
  }

  joinGame(
    gameId: string,
    playerId: string,
    playerName: string,
    color: number,
    socket: WebSocket
  ): boolean {
    const game = this.games.get(gameId);
    if (!game || game.started) {
      return false;
    }

    const networkPlayer = createNetworkPlayer(color);
    const player: GamePlayer = {
      id: playerId,
      name: playerName,
      color,
      socket,
      networkPlayer,
      ready: false,
    };

    game.players.set(playerId, player);
    this.playerToGame.set(playerId, gameId);

    // Notify all players in the game about the new player
    this.broadcastToGame(
      gameId,
      {
        type: "player_joined",
        player: {
          id: playerId,
          name: playerName,
          color,
        },
      },
      playerId
    );

    return true;
  }

  leaveGame(playerId: string): void {
    const gameId = this.playerToGame.get(playerId);
    if (!gameId) return;

    const game = this.games.get(gameId);
    if (!game) return;

    game.players.delete(playerId);
    this.playerToGame.delete(playerId);

    // If game is empty, clean it up
    if (game.players.size === 0) {
      if (game.cleanup) {
        game.cleanup();
      }
      this.games.delete(gameId);
      return;
    }

    // Notify remaining players
    this.broadcastToGame(gameId, {
      type: "player_left",
      playerId,
    });
  }

  setPlayerReady(playerId: string): void {
    const gameId = this.playerToGame.get(playerId);
    if (!gameId) return;

    const game = this.games.get(gameId);
    if (!game) return;

    const player = game.players.get(playerId);
    if (!player) return;

    player.ready = true;

    // Check if all players are ready
    const allReady = Array.from(game.players.values()).every((p) => p.ready);
    if (allReady && game.players.size > 0) {
      this.startGame(gameId);
    }
  }

  handlePlayerAction(playerId: string, action: ShapeActionName): void {
    const gameId = this.playerToGame.get(playerId);
    if (!gameId) return;

    const game = this.games.get(gameId);
    if (!game || !game.started) return;

    const player = game.players.get(playerId);
    if (!player) return;

    player.networkPlayer.triggerAction(action);
  }

  private startGame(gameId: string): void {
    const game = this.games.get(gameId);
    if (!game) return;

    game.started = true;

    // Create renderers for each player
    const renderers = Array.from(game.players.values()).map((player) => {
      const renderer = createNetworkRenderer((message) => {
        this.broadcastToGame(gameId, message);
      });
      renderer.setPlayerId(player.id);
      return renderer;
    });

    // Create a combined renderer that forwards to all player renderers
    const combinedRenderer = {
      insertShape: (shape: any) =>
        renderers.forEach((r) => r.insertShape(shape)),
      updateShape: (shape: any) =>
        renderers.forEach((r) => r.updateShape(shape)),
      removeShape: (shape: any) =>
        renderers.forEach((r) => r.removeShape(shape)),
      updatePoints: (points: number) =>
        renderers.forEach((r) => r.updatePoints(points)),
      clearLines: (lines: number[]) =>
        renderers.forEach((r) => r.clearLines(lines)),
    };

    // Start the game
    const players = Array.from(game.players.values()).map(
      (p) => p.networkPlayer
    );
    const ticker = createTicker();

    const cleanup = createGameWorld({
      players,
      renderer: combinedRenderer,
      ruleset: createWorldRules(),
      ticker,
    });

    game.cleanup = cleanup;

    // Notify all players that the game has started
    this.broadcastToGame(gameId, {
      type: "game_started",
      players: Array.from(game.players.values()).map((p) => ({
        id: p.id,
        name: p.name,
        color: p.color,
      })),
    });
  }

  private broadcastToGame(
    gameId: string,
    message: any,
    excludePlayerId?: string
  ): void {
    const game = this.games.get(gameId);
    if (!game) return;

    const messageStr = JSON.stringify(message);
    for (const player of game.players.values()) {
      if (excludePlayerId && player.id === excludePlayerId) continue;
      if (player.socket.readyState === 1) {
        // WebSocket.OPEN
        player.socket.send(messageStr);
      }
    }
  }

  getPlayerGameId(playerId: string): string | undefined {
    return this.playerToGame.get(playerId);
  }

  getGame(gameId: string): GameInstance | undefined {
    return this.games.get(gameId);
  }
}
