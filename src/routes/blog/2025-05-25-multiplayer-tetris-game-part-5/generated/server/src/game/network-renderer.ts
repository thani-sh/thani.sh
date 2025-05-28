import type { Shape } from "./shape.js";

export interface Renderer {
  insertShape(shape: Shape): void;
  updateShape(shape: Shape): void;
  removeShape(shape: Shape | { id: number }): void;
  updatePoints(points: number): void;
  clearLines(lines: number[]): void;
}

export interface NetworkRenderer extends Renderer {
  setPlayerId(playerId: string): void;
}

export const createNetworkRenderer = (
  sendMessage: (message: any) => void
): NetworkRenderer => {
  let playerId: string | null = null;

  const insertShape = (shape: Shape) => {
    sendMessage({
      type: "insert_shape",
      playerId,
      shape: {
        id: shape.id,
        type: shape.type,
        posX: shape.posX,
        posY: shape.posY,
        color: shape.color,
      },
    });
  };

  const updateShape = (shape: Shape) => {
    sendMessage({
      type: "update_shape",
      playerId,
      shape: {
        id: shape.id,
        type: shape.type,
        posX: shape.posX,
        posY: shape.posY,
        color: shape.color,
      },
    });
  };

  const removeShape = (shape: Shape | { id: number }) => {
    sendMessage({
      type: "remove_shape",
      playerId,
      shapeId: shape.id,
    });
  };

  const updatePoints = (points: number) => {
    sendMessage({
      type: "update_points",
      playerId,
      points,
    });
  };

  const clearLines = (lines: number[]) => {
    sendMessage({
      type: "clear_lines",
      playerId,
      lines,
    });
  };

  const setPlayerId = (id: string) => {
    playerId = id;
  };

  return {
    insertShape,
    updateShape,
    removeShape,
    updatePoints,
    clearLines,
    setPlayerId,
  };
};
