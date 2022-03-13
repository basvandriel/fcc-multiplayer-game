import Player from "./Player.mjs";
import Collectible from "./Collectible.mjs";

import Drawer from "./drawer.mjs";

// Can call it like this because same domain
const socket = io();
const canvas = document.getElementById("game-window");

/**
 * Default frames per second for the game
 */
const FPS = 30;

/**
 *  @type {CanvasRenderingContext2D}
 */
const context = canvas.getContext("2d");

/**
 * Renders the game on the canvas
 */
function render() {
  const drawer = new Drawer(context, canvas);

  drawer.drawBackground();
  drawer.drawGameField();
  drawer.drawHeader();

  return setTimeout(() => requestAnimationFrame(render), 1000 / FPS);
}

/**
 * Render the game
 */
requestAnimationFrame(render);
