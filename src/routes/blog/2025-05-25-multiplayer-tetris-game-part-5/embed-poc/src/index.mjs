// Multiplayer client for server-based game
import { ShapeActionName } from "./game/shape_action";

const WS_URL = "ws://localhost:8080";

const KEYMAP = {
  ArrowUp: ShapeActionName.ROTATE,
  ArrowLeft: ShapeActionName.MOVE_LEFT,
  ArrowDown: ShapeActionName.MOVE_DOWN,
  ArrowRight: ShapeActionName.MOVE_RIGHT,
};

let ws;
let playerId = null;

function connect() {
  ws = new WebSocket(WS_URL);
  ws.onopen = () => {
    ws.send(
      JSON.stringify({
        type: "join",
        player: { name: "Player", color: 0x6fa8dc },
      })
    );
  };
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.type === "player_joined" && !playerId) {
      playerId = msg.player.id;
    }
    if (msg.type === "state") {
      renderGame(msg);
    }
    // handle other server messages as needed
  };
}

function sendAction(action) {
  if (!playerId) return;
  ws.send(
    JSON.stringify({
      type: "action",
      playerId,
      action,
    })
  );
}

document.addEventListener("DOMContentLoaded", () => {
  connect();
  document.addEventListener("keydown", (e) => {
    if (KEYMAP[e.code]) {
      sendAction(KEYMAP[e.code]);
    }
  });
});

function renderGame(state) {
  // TODO: Implement rendering using PixiJS or canvas based on state from server
  // Example: state.players, state.shapes, state.scores, state.tick
}
