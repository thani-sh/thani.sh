import type { Player } from "./player";
import type { Renderer } from "../renderer_proxy";
import type { Ticker, CancelTicker } from "./ticker";
import type { Shape } from "./shape";
import type { WorldRule } from "./world_rule";
import { WORLD_W } from "./config";
import { WORLD_ACTION } from "./world_action";
import { ShapeActionName, SHAPE_ACTIONS } from "./shape_action";
import { type ShapeType, SHAPE_TYPES } from "./shape_type";

export interface GameWorldOptions {
  players: Player[];
  renderer: Renderer;
  ruleset: WorldRule[];
  ticker: Ticker;
}

export interface GameWorld {
  handleAction: (playerIdx: number, action: ShapeActionName) => void;
  cleanup: () => void;
}

export const createGameWorld = (options: GameWorldOptions): GameWorld => {
  // ...implement server-side logic here, see client version for reference...
  // For now, return stubs to satisfy type checker
  return {
    handleAction: () => {},
    cleanup: () => {},
  };
};
