import Player from "../Player.mjs";
import Drawer from "./drawer.mjs";

/**
 * The player img size
 */
export const PLAYER_SIZE = 30;

export default class PlayerDrawer extends Drawer {
  /**
   * @type {Player}
   */
  player;

  /**
   *
   * @param {CanvasRenderingContext2D} context
   * @param {Player} player
   */
  constructor(context, player) {
    super(context);
    this.player = player;
  }

  /**
   * Jah
   */
  draw() {
    const { avatar, x, y } = this.player;

    const img = new Image();
    img.src = avatar;

    this.context.drawImage(img, x, y, PLAYER_SIZE, PLAYER_SIZE);
  }
}
