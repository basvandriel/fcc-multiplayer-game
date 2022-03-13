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
    const gameWidth = settings.width - PADDING;
    const gameHeight = settings.height - PADDING - UPPER_GAP;

    const actualY = this.y - PADDING / 2 - UPPER_GAP;
    console.log(actualY);
    switch (dir) {
      case "up":
        const afterY = actualY - speed;
        if (afterY < 0) return;
        this.#y -= speed;

        break;
      case "down":
        // const after = actualY

        // const after = actualY - PADDING / 2 - UPPER_GAP + speed;

        // console.log(after);
        // const afterY2 = this.#y + speed - (PADDING / 2 - UPPER_GAP);

        // console.log(afterY2);

        this.#y += speed;
        break;
      case "right":
        this.#x += speed;
        break;
      case "left":
        this.#x -= speed;
        break;
    }
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
