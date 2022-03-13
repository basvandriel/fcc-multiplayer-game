class Player {
  id;
  score;
  y;
  x;

  #avatar = "https://avatars.githubusercontent.com/u/5286260?v=4";

  constructor({ x, y, score, id }) {
    this.id = id;
    this.score = score;
    this.y = y;
    this.x = x;
  }

  movePlayer(dir, speed) {}

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
