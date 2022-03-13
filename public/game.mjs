import Player from "./Player.mjs";
import Collectible from "./Collectible.mjs";

// Can call it like this because same domain
const socket = io();
const canvas = document.getElementById("game-window");

/**
 * Default frames per second for the game
 */
const FPS = 30;

/**
 * The amount of padding on the side of the game
 *
 * Gets split across both x and y sides; so divise this by 2
 */
const PADDING = 20;

/**
 * The upper gap for the title
 */
const UPPER_GAP = PADDING * 2;

/**
 *  @type {CanvasRenderingContext2D}
 */
const context = canvas.getContext("2d");

function drawBackroundRect(width, height) {
  context.lineWidth = 0;
  context.beginPath();
  context.rect(0, 0, width, height);
  context.fillStyle = "#8DC796";
  context.fill();
  context.closePath();
}

/**
 * The drawing logic for the game itself
 *
 * @param {*} width
 * @param {*} height
 */
function drawGameStroke(width, height) {
  context.lineWidth = 2;

  const rectWidth = width - PADDING;
  const rectHeight = height - PADDING;

  const x = width / 2 - rectWidth / 2;
  const y = height / 2 - rectHeight / 2 + UPPER_GAP;

  context.beginPath();
  // Draw the outline on the mid x position (w / 2)
  context.rect(x, y, rectWidth, rectHeight - UPPER_GAP);
  context.strokeStyle = "#1B8E67";
  context.stroke();
  context.closePath();
}

function drawGameHeader() {
  const { width, height } = canvas;

  // Calculate the vertical center position for the padding + the upper gap
  // to vertically center the text in
  const verticalCenterY = UPPER_GAP / 2 + PADDING / 2;

  // Draw the game title
  context.beginPath();
  context.font = "16px 'Press Start 2P'";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "black";
  context.fillText("Coiny Chase", width / 2, verticalCenterY);
  context.closePath();

  // Draw the controls
  context.beginPath();
  context.textAlign = "start";
  context.font = "12px 'Press Start 2P'";
  context.textBaseline = "middle";

  context.fillText("Controls: WASD", PADDING / 2, verticalCenterY);
  context.closePath();

  // Draw the rank
  context.beginPath();
  context.textAlign = "end";
  context.font = "12px 'Press Start 2P'";
  context.textBaseline = "middle";
  context.fillText("Rank: 1 / 1", width - PADDING / 2, verticalCenterY);
  context.closePath();
}

/**
 * Renders the game on the canvas
 */
function render() {
  const { width, height } = canvas;

  drawBackroundRect(width, height);
  drawGameStroke(width, height);

  drawGameHeader();

  return setTimeout(() => requestAnimationFrame(render), 1000 / FPS);
}

/**
 * Render the game
 */
requestAnimationFrame(render);
