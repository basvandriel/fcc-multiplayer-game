import Player from "./Player.mjs";
import Collectible from "./Collectible.mjs";

import BoardDrawer from "./drawer/BoardDrawer.mjs";
import PlayerDrawer from "./drawer/PlayerDrawer.mjs";
import CollectibleDrawer from "./drawer/CollectibleDrawer.mjs";

import calculateRandomPosition from "./lib/calculateRandomPosition.mjs";
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
 * @type {Player | undefined} The current player
 */
let player;

/**
 * @type {Player[]} The opponents of the player
 */
let opponents = [];

/**
 * @type {Collectible | undefined} The current collectible
 */
let collectible;

socket.on("connect", () => {
  const { x, y } = calculateRandomPosition();

  const score = 0;
  const id = socket.id;

  player = new Player({ x, y, score, id });
  socket.emit("join", player);
});

/**
 * Add or update the collible object
 */
socket.on("collectible", (collectable) => (collectible = collectable));

/**
 * The player scores
 */
socket.on("score", (value) => {
  player.score += value;

  console.log(`You scored! Current score is now ${player.score}`);
  socket.emit("update", player);
});

socket.on("opponent_join", (player) => {
  opponents.push(player);
});

document.addEventListener("keydown", ({ key }) => {
  const speed = 5;

  switch (key) {
    case "w":
    case "W":
      player.move("up", speed);
      break;
    case "s":
    case "S":
      player.move("down", speed);
      break;
    case "a":
    case "A":
      player.move("left", speed);
      break;
    case "d":
    case "D":
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
  new BoardDrawer(context).draw();

  if (collectible) {
    const drawer = new CollectibleDrawer(context);
    drawer.draw(collectible);
  }

  // If the player connected, start drawing
  if (player) {
    // console.log("hallo");
    const drawer = new PlayerDrawer(context);
    drawer.draw(player);
  }

  for (const opponent in opponents) {
    // console.log("yeah rendering a new odpponent");
    // drawer.drawPlayer(opponent);
  }

  if (player && collectible && player.collision(collectible)) {
    socket.emit("playerCollideWithCollectible", player, collectible);
  }

  return setTimeout(() => requestAnimationFrame(render), 1000 / FPS);
}

/**
 * Render the game
 */
requestAnimationFrame(render);
