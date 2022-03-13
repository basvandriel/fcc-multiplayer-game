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
    switch (dir) {
      case "up":
        this.#y -= speed;
        break;
      case "down":
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
