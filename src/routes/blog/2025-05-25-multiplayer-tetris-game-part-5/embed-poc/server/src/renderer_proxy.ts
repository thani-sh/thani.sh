// Renderer proxy interface for server
export interface Renderer {
  insertShape(shape: any): void;
  updateShape(shape: any): void;
  removeShape(shape: any): void;
  updatePoints(points: number): void;
  broadcastState(state: any): void;
}
