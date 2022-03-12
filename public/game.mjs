import Player from "./Player.mjs";
import Collectible from "./Collectible.mjs";

// Can call it like this because same domain
const socket = io();
const canvas = document.getElementById("game-window");
const context = canvas.getContext("2d");
