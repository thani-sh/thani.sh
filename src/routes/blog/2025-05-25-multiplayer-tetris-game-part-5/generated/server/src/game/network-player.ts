import { ShapeActionName } from "./shape_action.js";

type Callback = (action: ShapeActionName) => void;

export interface Player {
  color: number;
  listen: (fn: Callback) => void;
  destroy: () => void;
}

export interface NetworkPlayer extends Player {
  triggerAction(action: ShapeActionName): void;
}

export const createNetworkPlayer = (color: number): NetworkPlayer => {
  const callbacks: Callback[] = [];

  const triggerAction = (action: ShapeActionName) => {
    for (const callback of callbacks) {
      callback(action);
    }
  };

  const listen = (fn: Callback): void => {
    callbacks.push(fn);
  };

  const destroy = () => {
    // Network players don't need cleanup like keyboard listeners
  };

  return {
    color,
    listen,
    destroy,
    triggerAction,
  };
};
