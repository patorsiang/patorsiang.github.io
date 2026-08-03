import type { KaboomCtx } from "kaboom";

/**
 * Map and sprite scale, carried over from legacy-v1's constants. Spawn points
 * are multiplied by this, so changing it moves the player off the map.
 */
export const scaleFactor = 3;

/** Player movement speed in pixels per second. */
export const playerSpeed = 250;

export const assetFolder = "/assets/2d-game-portfolio";

/** Zoom out on portrait screens so the room still reads on a phone. */
export function setCamScale(k: KaboomCtx) {
  const resizeFactor = k.width() / k.height();

  k.camScale(k.vec2(resizeFactor < 1 ? 1 : 1.5));
}
