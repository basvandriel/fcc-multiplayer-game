import Player from "./Player.mjs";
import Collectible from "./Collectible.mjs";

import Drawer, { UPPER_GAP, PADDING, PLAYER_SIZE } from "./drawer.mjs";

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
 * @type {Player} The current player
 */
let player = null;

/**
 * @type {Collectible} The current collectible
 */
let collectible = null;

const getPlayFieldSize = () => ({
  width: canvas.width - PADDING,
  height: canvas.height - PADDING - UPPER_GAP,
});

function getStartCoordinates() {
  const { width, height } = getPlayFieldSize();

  const oneSidePadding = PADDING / 2;

  const centerX = width / 2 - PLAYER_SIZE / 2;
  const x = oneSidePadding + centerX * Math.random();

  const centerY = height / 2 - PLAYER_SIZE / 2;
  const y = oneSidePadding + UPPER_GAP + centerY * Math.random();

  return { x, y };
}

socket.on("connect", () => {
  // Start location is generated from the center of the game board
  const { x, y } = getStartCoordinates();

  const score = 0;
  const id = socket.id;

  player = new Player({ x, y, score, id });
  socket.emit("join", player);
});

document.addEventListener("keydown", ({ key }) => {
  const speed = 10;

  switch (key) {
    case "w":
      player.move("up", speed);
      break;
    case "s":
      player.move("down", speed);
      break;
    case "a":
      player.move("left", speed);
      break;
    case "d":
      player.move("right", speed);
      break;
    default:
    // do nothing
  }
});

/**
 * Renders the game on the canvas
 */
function render() {
  const drawer = new Drawer(context, canvas);

  drawer.drawBackground();
  drawer.drawGameField();
  drawer.drawHeader();

  // If the player connected, start drawing
  if (player) {
    drawer.drawPlayer(player);
  }

  return setTimeout(() => requestAnimationFrame(render), 1000 / FPS);
}

/**
 * Render the game
 */
requestAnimationFrame(render);
