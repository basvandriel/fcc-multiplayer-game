import { PADDING, UPPER_GAP } from "./drawer.mjs";
import settings from "./settings.mjs";

class Player {
  id;
  score;
  #y;
  #x;

  #avatar = "https://avatars.githubusercontent.com/u/5286260?v=4";

  constructor({ x, y, score, id }) {
    this.id = id;
    this.score = score;
    this.#y = y;
    this.#x = x;
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
        this.#y -= speed;
        break;
      case "down":
        if (this.y + speed > maxY) {
          return;
        }
        this.#y += speed;
        break;
      case "right":
        if (this.#x + speed > maxX) {
          console.log("nee");

          return;
        }

        this.#x += speed;
        break;
      case "left":
        if (this.#x - speed < minX) {
          return;
        }
        this.#x -= speed;
        break;
    }

    console.log(this.y);
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  collision(item) {}

  calculateRank(arr) {}

  /**
   * Get's the avatar
   */
  get avatar() {
    return this.#avatar;
  }
}

export default Player;
