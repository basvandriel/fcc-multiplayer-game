import Player from "./Player.mjs";
import Collectible from "./Collectible.mjs";

import BoardDrawer from "./drawer/BoardDrawer.mjs";
import PlayerDrawer, { PLAYER_SIZE } from "./drawer/PlayerDrawer.mjs";
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
 * 
 */
const OPP_AVATAR_URL = 'https://scontent-amt2-1.xx.fbcdn.net/v/t31.18172-8/21122342_1822234054453368_2189204337892011691_o.jpg?_nc_cat=109&ccb=1-5&_nc_sid=174925&_nc_ohc=ol8bz6D4rz8AX9i6kZ9&_nc_ht=scontent-amt2-1.xx&oh=00_AT_JK7GKfqRNY2lbnng-QBEXQLktoF931jE9T52KeDDHXg&oe=625C8483'

/**
 *  @type {CanvasRenderingContext2D}
 */
const context = canvas.getContext("2d");

/**
 * @type {Player | undefined} The current player
 */
let player;

/**
 * @type {string} The rank string
 */
let rank;

/**
 * @type {Player[]} The opponents of the player
 */
let opponents = [];

/**
 * @type {Collectible | undefined} The current collectible
 */
let collectible;

socket.on("connect", () => {
  const score = 0;
  const id = socket.id;

  const { x, y } = calculateRandomPosition();

  player = new Player({ x, y, score, id });
  rank = player.calculateRank([player, ...opponents])
  
  socket.emit("join", player);
});

/**
 * Add or update the collible object
 */
socket.on("collectible", (collectable) => {
  collectible = collectable;
});

/**
 * The player scores
 */
socket.on("score", (value) => {
  player.score += value;  
  rank = player.calculateRank([player, ...opponents])

  console.log(`You scored! Current score is now ${player.score}`);
});

socket.on("opponents_join", (players) => {
  // On every refresh, refresh the opponents array
  opponents = []

  players.forEach((opponent) => {
    opponent.avatar = OPP_AVATAR_URL
    opponents.push(opponent)
  })

  rank = player.calculateRank([player, ...opponents])
});

/**
 * This get's run to much
 */
socket.on("opponent_broadcast", (player) => {
  // On every refresh, refresh the opponents array
  opponents = []

  player.avatar = OPP_AVATAR_URL
  opponents.push(player)
})

/**
 * A opponent has moved, or scored or whatever. Let's update.
 */
socket.on("opponent_update", ({ id, x, y, score }) => {
  const index = opponents.findIndex(o => o.id == id)

  opponents[index].x = x
  opponents[index].y = y
  opponents[index].score = score

  rank = player.calculateRank([player, ...opponents])
})

socket.on("opponent_leave", (player_id) => {
  const index = opponents.findIndex(o => o.id == player_id)
  opponents.splice(index, 1)
})

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
  if(!player) return requestAnimationFrame(render)
  new BoardDrawer(context, rank).draw();
  new PlayerDrawer(context, player).draw();

  if (collectible) {
    const drawer = new CollectibleDrawer(context, collectible);
    drawer.draw();
  }

  opponents.forEach((opponent) => {
    const drawer = new PlayerDrawer(context, opponent)
    drawer.draw()
  })

  if (player && collectible && player.collision(collectible)) {
    socket.emit("playerCollideWithCollectible", player, collectible);
  }

  return setTimeout(() => requestAnimationFrame(render), 1000 / FPS);
}

/**
 * Render the game
 */
requestAnimationFrame(render);
