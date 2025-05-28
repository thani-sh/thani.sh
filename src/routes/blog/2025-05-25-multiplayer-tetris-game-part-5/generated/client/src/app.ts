// PIXI.js is loaded via CDN script tag in HTML
declare const PIXI: any;

import { createCanvasRenderer } from "./game/renderer.js";
import { createKeyboardPlayer } from "./game/player.js";
import { ShapeActionName } from "./game/shape_action.js";

interface GameState {
  currentPage: string;
  gameId: string | null;
  playerId: string | null;
  players: Map<string, any>;
  socket: WebSocket | null;
  renderer: any;
  score: number;
}

class TetrisClient {
  private state: GameState = {
    currentPage: "landing",
    gameId: null,
    playerId: null,
    players: new Map(),
    socket: null,
    renderer: null,
    score: 0,
  };

  private serverUrl = "ws://localhost:8000";

  constructor() {
    this.setupEventListeners();
    this.showPage("landing");
  }

  private setupEventListeners(): void {
    // Landing page
    document
      .getElementById("create-game-btn")
      ?.addEventListener("click", () => this.createGame());
    document
      .getElementById("join-game-btn")
      ?.addEventListener("click", () => this.showJoinForm());
    document
      .getElementById("join-game-confirm-btn")
      ?.addEventListener("click", () => this.joinGame());
    document
      .getElementById("cancel-join-btn")
      ?.addEventListener("click", () => this.hideJoinForm());

    // Lobby page
    document
      .getElementById("ready-btn")
      ?.addEventListener("click", () => this.setReady());
    document
      .getElementById("leave-lobby-btn")
      ?.addEventListener("click", () => this.leaveLobby());

    // Game page
    document
      .getElementById("leave-game-btn")
      ?.addEventListener("click", () => this.leaveGame());

    // Game over page
    document
      .getElementById("play-again-btn")
      ?.addEventListener("click", () => this.playAgain());
    document
      .getElementById("back-to-home-btn")
      ?.addEventListener("click", () => this.backToHome());

    // Error page
    document
      .getElementById("back-to-home-error-btn")
      ?.addEventListener("click", () => this.backToHome());
  }

  private showPage(pageId: string): void {
    // Hide all pages
    document.querySelectorAll(".page").forEach((page) => {
      page.classList.remove("active");
    });

    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add("active");
      this.state.currentPage = pageId;
    }
  }

  private showMessage(
    elementId: string,
    message: string,
    type: "error" | "success" | "info" = "info"
  ): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = `<div class="${type}">${message}</div>`;
      setTimeout(() => {
        element.innerHTML = "";
      }, 5000);
    }
  }

  private showJoinForm(): void {
    const joinForm = document.getElementById("join-form");
    if (joinForm) {
      joinForm.style.display = "block";
    }
  }

  private hideJoinForm(): void {
    const joinForm = document.getElementById("join-form");
    if (joinForm) {
      joinForm.style.display = "none";
    }
  }

  private getPlayerInfo(): { name: string; color: number } {
    const nameInput = document.getElementById(
      "player-name"
    ) as HTMLInputElement;
    const colorInput = document.getElementById(
      "player-color"
    ) as HTMLInputElement;

    return {
      name: nameInput?.value || "Player",
      color: parseInt(colorInput?.value.replace("#", ""), 16) || 0xff6b6b,
    };
  }

  private connectWebSocket(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.state.socket = new WebSocket(this.serverUrl);

      this.state.socket.onopen = () => {
        console.log("Connected to server");
        resolve();
      };

      this.state.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        reject(error);
      };

      this.state.socket.onmessage = (event) => {
        this.handleServerMessage(JSON.parse(event.data));
      };

      this.state.socket.onclose = () => {
        console.log("Disconnected from server");
        this.showError("Connection lost. Please try again.");
      };
    });
  }

  private sendMessage(message: any): void {
    if (this.state.socket && this.state.socket.readyState === WebSocket.OPEN) {
      this.state.socket.send(JSON.stringify(message));
    }
  }

  private async createGame(): Promise<void> {
    try {
      await this.connectWebSocket();
      const playerInfo = this.getPlayerInfo();

      this.sendMessage({
        type: "join",
        player: playerInfo,
      });
    } catch (error) {
      this.showMessage(
        "landing-message",
        "Failed to connect to server",
        "error"
      );
    }
  }

  private async joinGame(): Promise<void> {
    const gameIdInput = document.getElementById("game-id") as HTMLInputElement;
    const gameId = gameIdInput?.value;

    if (!gameId) {
      this.showMessage("landing-message", "Please enter a game ID", "error");
      return;
    }

    try {
      await this.connectWebSocket();
      const playerInfo = this.getPlayerInfo();

      this.sendMessage({
        type: "join",
        player: playerInfo,
        gameId: gameId,
      });
    } catch (error) {
      this.showMessage(
        "landing-message",
        "Failed to connect to server",
        "error"
      );
    }
  }

  private setReady(): void {
    if (this.state.playerId) {
      this.sendMessage({
        type: "ready",
        playerId: this.state.playerId,
      });

      const readyBtn = document.getElementById(
        "ready-btn"
      ) as HTMLButtonElement;
      if (readyBtn) {
        readyBtn.disabled = true;
        readyBtn.textContent = "Waiting for other players...";
      }
    }
  }

  private leaveLobby(): void {
    if (this.state.playerId) {
      this.sendMessage({
        type: "leave",
        playerId: this.state.playerId,
      });
    }
    this.cleanup();
    this.showPage("landing");
  }

  private leaveGame(): void {
    if (this.state.playerId) {
      this.sendMessage({
        type: "leave",
        playerId: this.state.playerId,
      });
    }
    this.cleanup();
    this.showPage("landing");
  }

  private playAgain(): void {
    // For now, just return to landing
    this.cleanup();
    this.showPage("landing");
  }

  private backToHome(): void {
    this.cleanup();
    this.showPage("landing");
  }

  private cleanup(): void {
    if (this.state.socket) {
      this.state.socket.close();
      this.state.socket = null;
    }
    this.state.gameId = null;
    this.state.playerId = null;
    this.state.players.clear();
    this.state.renderer = null;
    this.state.score = 0;
  }

  private showError(message: string): void {
    const errorMessage = document.getElementById("error-message");
    if (errorMessage) {
      errorMessage.textContent = message;
    }
    this.showPage("error");
  }

  private updatePlayersDisplay(): void {
    const container = document.getElementById("players-container");
    if (!container) return;

    container.innerHTML = "";

    for (const player of this.state.players.values()) {
      const playerDiv = document.createElement("div");
      playerDiv.className = "player-item";

      const colorDiv = document.createElement("div");
      colorDiv.className = "player-color";
      colorDiv.style.backgroundColor = `#${player.color
        .toString(16)
        .padStart(6, "0")}`;

      const nameSpan = document.createElement("span");
      nameSpan.textContent = player.name;

      playerDiv.appendChild(colorDiv);
      playerDiv.appendChild(nameSpan);
      container.appendChild(playerDiv);
    }
  }

  private setupGameControls(): void {
    const keyMap = {
      ArrowLeft: ShapeActionName.MOVE_LEFT,
      ArrowRight: ShapeActionName.MOVE_RIGHT,
      ArrowDown: ShapeActionName.MOVE_DOWN,
      ArrowUp: ShapeActionName.ROTATE,
      Space: ShapeActionName.MOVE_DOWN, // Hard drop (using move down for now)
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const action = keyMap[e.code as keyof typeof keyMap];
      if (action && this.state.playerId) {
        e.preventDefault();
        this.sendMessage({
          type: "action",
          playerId: this.state.playerId,
          action: action,
        });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
  }

  private setupRenderer(): void {
    const gameCanvas = document.getElementById("game-canvas");
    if (!gameCanvas) return;

    // Clear previous canvas
    gameCanvas.innerHTML = "";

    this.state.renderer = createCanvasRenderer(gameCanvas);
  }

  private handleServerMessage(message: any): void {
    console.log("Received message:", message);

    switch (message.type) {
      case "joined":
        this.state.playerId = message.playerId;
        this.state.gameId = message.gameId;
        this.showPage("lobby");

        const gameIdSpan = document.getElementById("lobby-game-id");
        if (gameIdSpan) {
          gameIdSpan.textContent = this.state.gameId;
        }
        break;

      case "lobby_state":
        this.state.players.clear();
        message.players.forEach((player: any) => {
          this.state.players.set(player.id, player);
        });
        this.updatePlayersDisplay();
        break;

      case "player_joined":
        this.state.players.set(message.player.id, message.player);
        this.updatePlayersDisplay();
        this.showMessage(
          "lobby-message",
          `${message.player.name} joined the game`,
          "success"
        );
        break;

      case "player_left":
        const leftPlayer = this.state.players.get(message.playerId);
        if (leftPlayer) {
          this.state.players.delete(message.playerId);
          this.updatePlayersDisplay();
          this.showMessage(
            "lobby-message",
            `${leftPlayer.name} left the game`,
            "info"
          );
        }
        break;

      case "game_started":
        this.showPage("game");
        this.setupRenderer();
        this.setupGameControls();
        this.showMessage(
          "game-message",
          "Game started! Use arrow keys to play.",
          "success"
        );
        break;

      case "insert_shape":
        if (this.state.renderer) {
          this.state.renderer.insertShape(message.shape);
        }
        break;

      case "update_shape":
        if (this.state.renderer) {
          this.state.renderer.updateShape(message.shape);
        }
        break;

      case "remove_shape":
        if (this.state.renderer) {
          // Create a temporary shape object for removal
          const tempShape = { id: message.shapeId };
          this.state.renderer.removeShape(tempShape);
        }
        break;

      case "update_points":
        if (message.playerId === this.state.playerId) {
          this.state.score = message.points;
          const scoreElement = document.getElementById("score");
          if (scoreElement) {
            scoreElement.textContent = this.state.score.toString();
          }
        }
        break;

      case "clear_lines":
        // Visual effect for clearing lines could be added here
        console.log("Lines cleared:", message.lines);
        break;

      case "game_over":
        this.showPage("game-over");
        const finalScores = document.getElementById("final-scores");
        if (finalScores && message.results) {
          finalScores.innerHTML = "<h3>Final Scores:</h3>";
          // Display results when they're provided
        }
        break;

      case "error":
        this.showError(message.message);
        break;

      default:
        console.warn("Unknown message type:", message.type);
    }
  }
}

// Initialize the client when the page loads
document.addEventListener("DOMContentLoaded", () => {
  new TetrisClient();
});
