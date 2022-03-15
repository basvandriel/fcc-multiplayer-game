import Collectible from "../Collectible.mjs";
import Drawer from "./drawer.mjs";

import settings from "../settings.mjs";

export default class CollectibleDrawer extends Drawer {
  /**
   *
   * @param {Collectible} collectible
   */
  draw(collectible) {
    const { x, y } = collectible;
    const { size } = settings.collectible;

    this.context.beginPath();
    this.context.fillStyle = "black";
    this.context.rect(x, y, size, size);
    this.context.fill();
    this.context.closePath();
  }
}
