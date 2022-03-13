import Player from "./Player.mjs";

/**
 * The amount of padding on the side of the game
 *
 * Gets split across both x and y sides; so divise this by 2
 */
export const PADDING = 20;

/**
 * The upper gap for the title
 */
export const UPPER_GAP = PADDING * 2;

/**
 * The player img size
 */
export const PLAYER_SIZE = 30;

class Drawer {
  /**
   * @type {CanvasRenderingContext2D}
   */
  context;

  /**
   * @type {HTMLElement}
   */
  canvas;

  /**
   *
   * @param {CanvasRenderingContext2D} context
   * @param {HTMLElement} canvas
   */
  constructor(context, canvas) {
    this.context = context;
    this.canvas = canvas;
  }

  /**
   * No need to use begin path when only drawing one thing
   */
  drawBackground() {
    const { width, height } = this.canvas;

    this.context.fillStyle = "#8DC796";
    this.context.fillRect(0, 0, width, height);
  }

  /**
   * The drawing logic for the game itself
   *
   * @param {*} width
   * @param {*} height
   */
  drawGameField() {
    const { width, height } = this.canvas;

    this.context.lineWidth = 2;

    const rectWidth = width - PADDING;
    const rectHeight = height - PADDING;

    const x = width / 2 - rectWidth / 2;
    const y = height / 2 - rectHeight / 2 + UPPER_GAP;

    // Draw the outline on the mid x position (w / 2)
    this.context.strokeStyle = "#1B8E67";
    this.context.strokeRect(x, y, rectWidth, rectHeight - UPPER_GAP);
  }

  drawHeader() {
    const { width } = this.canvas;

    // Calculate the vertical center position for the padding + the upper gap
    // to vertically center the text in
    const oneSidePadding = PADDING / 2;
    const verticalCenterY = UPPER_GAP / 2 + oneSidePadding;

    // Draw the game title
    this.context.textBaseline = "middle";
    this.context.fillStyle = "#030E05";

    this.context.font = "16px 'Press Start 2P'";
    this.context.textAlign = "center";
    this.context.fillText("Coiny Chase", width / 2, verticalCenterY);

    // Draw the controls
    this.context.textAlign = "start";
    this.context.font = "12px 'Press Start 2P'";
    this.context.fillText("Controls: WASD", oneSidePadding, verticalCenterY);

    // Draw the rank
    this.context.textAlign = "end";
    this.context.font = "12px 'Press Start 2P'";
    this.context.fillText(
      "Rank: 1 / 1",
      width - oneSidePadding,
      verticalCenterY
    );
  }

  /**
   *
   * @param {Player} player
   */
  drawPlayer(player) {
    const { avatar, x, y } = player;

    const img = new Image();
    img.src = avatar;

    console.log("Drawing player " + player.id);
    this.context.drawImage(img, x, y, PLAYER_SIZE, PLAYER_SIZE);
  }
}
export default Drawer;
