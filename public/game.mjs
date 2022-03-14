import Player from "./Player.mjs";
import Collectible from "./Collectible.mjs";

import Drawer from "./drawer.mjs";

import calculateRandomPosition from "./calculateRandomPosition.mjs";
import settings from "./settings.mjs";

// Can call it like this because same domain
const socket = io();
const canvas = document.getElementById("game-window");

// Set the size based on the settings
canvas.width = settings.width;
canvas.height = settings.height;

/**
 * Default frames per second for the game
 */
const FPS = 60;

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

socket.on("connect", () => {
  // Start location is generated from the center of the game board
  const { x, y } = calculateRandomPosition();

  const score = 0;
  const id = socket.id;

  player = new Player({ x, y, score, id });
  socket.emit("join", player);
});

socket.on("collectible", (collectable) => {
  if (collectible) {
    return;
  }
  collectible = collectable;
});

document.addEventListener("keydown", ({ key }) => {
  const speed = 5;

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
  socket.emit("update", player);
});

/**
 * Renders the game on the canvas
 */
function render() {
  context.clearRect(0, 0, settings.width, settings.height);
  const drawer = new Drawer(context, canvas);

  drawer.drawBackground();
  drawer.drawGameField();
  drawer.drawHeader();

  if (collectible) {
    const { x, y } = collectible;
    const { size } = settings.collectible;

    context.fillStyle = "black";
    context.rect(x, y, size, size);
    context.fill();
  }

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
