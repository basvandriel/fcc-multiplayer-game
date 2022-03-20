import { PADDING, UPPER_GAP } from "./drawer/BoardDrawer.mjs";
import { PLAYER_SIZE as SIZE } from "./drawer/PlayerDrawer.mjs";

import settings from "./settings.mjs";

import intersects from "./lib/intersects.mjs";

import Collectible, {
  DEFAULT_SIZE as COLLECTIBLE_SIZE,
} from "./Collectible.mjs";

class Player {
  id;
  score;
  y;
  x;

  avatar = "https://avatars.githubusercontent.com/u/5286260?v=4";

  constructor({ x, y, score, id }) {
    this.id = id;
    this.score = score;
    this.y = y;
    this.x = x;
  }

  /**
   *
   * @param {"up" | "down" | "right" | "left"} dir
   * @param {number} speed
   */
  move(dir, speed) {
    const minY = PADDING / 2 + UPPER_GAP;
    const maxY = settings.height - UPPER_GAP;

    const minX = PADDING / 2;
    const maxX = settings.width - PADDING * 2;

    switch (dir) {
      case "up":
        if (this.y - speed < minY) {
          return;
        }
        this.y -= speed;
        break;
      case "down":
        if (this.y + speed > maxY) {
          return;
        }
        this.y += speed;
        break;
      case "right":
        if (this.x + speed > maxX) {
          return;
        }
        this.x += speed;
        break;
      case "left":
        if (this.x - speed < minX) {
          return;
        }
        this.x -= speed;
        break;
    }
  }


  /**
   *
   * @param {Collectible} item
   *
   * @returns {bool} boolean
   */
  collision(item) {
    const { x: x1, y: y1 } = this;
    const { x: x2, y: y2 } = item;

    return intersects(
      x1,
      y1,
      SIZE,
      SIZE,
      x2,
      y2,
      COLLECTIBLE_SIZE,
      COLLECTIBLE_SIZE
    );
  }

  calculateRank(arr) {}
}

export default Player;
