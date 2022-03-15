import Player from "../Player.mjs";
import Drawer from "./drawer.mjs";

/**
 * The player img size
 */
export const PLAYER_SIZE = 30;

export default class PlayerDrawer extends Drawer {
  /**
   * Jah
   *
   * @param {Player} player
   */
  draw(player) {
    const { avatar, x, y } = player;

    const img = new Image();
    img.src = avatar;

    this.context.drawImage(img, x, y, PLAYER_SIZE, PLAYER_SIZE);
  }
}
