require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const expect = require("chai");
const cors = require("cors");

const fccTestingRoutes = require("./routes/fcctesting.js");
const runner = require("./test-runner.js");
const nocache = require("nocache");
const helmet = require("helmet");
const socket = require("socket.io");
const { default: Player } = require("./public/Player.mjs");
const Collectible = require("./public/Collectible.mjs");
const { nanoid } = require("nanoid");
const {
  default: calculateRandomPosition,
} = require("./public/lib/calculateRandomPosition.mjs");

const {
  default: CollectibleFactory
}  = require('./public/collectible/CollectibleFactory.mjs')

const app = express();

// Create a basic HTTP server for using a socket
// const httpServer = http.createServer(app);

// Prevent the client from trying to guess / sniff the MIME type.
app.use(helmet.noSniff());

// Nothing from the website is cached in the client.
app.use(nocache());

// The headers say that the site is powered by "PHP 7.4.3" even though it isn't (as a security measure).
app.use((req, res, next) => {
  res.setHeader("X-Powered-By", "PHP 7.4.3");

  next();
});

app.use("/public", express.static(process.cwd() + "/public"));
app.use("/assets", express.static(process.cwd() + "/assets"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//For FCC testing purposes and enables user to connect from outside the hosting platform
app.use(cors({ origin: "*" }));

// Index page (static HTML)
app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

//For FCC testing purposes
fccTestingRoutes(app);

// 404 Not Found Middleware
app.use(function (req, res, next) {
  res.status(404).type("text").send("Not Found");
});

const portNum = process.env.PORT || 3000;

// Set up server and tests
const server = app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
  if (process.env.NODE_ENV === "test") {
    console.log("Running Tests...");
    setTimeout(function () {
      try {
        runner.run();
      } catch (error) {
        console.log("Tests are not valid:");
        console.error(error);
      }
    }, 1500);
  }
});

const io = socket(server);

/**
 * 
 */
const collectibleFactory = new CollectibleFactory()

/**
 * The active players
 */
const players = [];

/**
 * The current collectible
 */
const collectible = collectibleFactory.create() || undefined

/**
 * Helper function to find the player index
 * 
 * @param {number} id 
 * @returns 
 */
const findPlayerIndex = (id) => players.findIndex((o) => o.id == id)

// Handle connection
io.on("connection", function (socket) {
  socket.emit("opponents_join", players)
  socket.emit("collectible", collectible);

  socket.on("join", (player) => {
    players.push(player);

    // Send the current player to everyone
    socket.broadcast.emit("opponent_broadcast", player)
  });

  socket.on("update", (player) => {
    const idx = findPlayerIndex(player.id)
    if (idx < 0) return;
    players[idx] = player;

    socket.broadcast.emit('opponent_update', player)
  });

  socket.on("playerCollideWithCollectible", (player, collectible) => {
    socket.emit("score", collectible.value);
    socket.emit('update', player)

    // Update the entire object
    collectible = collectibleFactory.create()
    
    socket.emit("collectible", collectible);
    socket.broadcast.emit('collectible', collectible)
    
    socket.broadcast.emit('opponent_update', player)
  });

  socket.on("disconnect", () => {
    const index = findPlayerIndex(socket.id)
    players.splice(index, 1)

    socket.broadcast.emit("opponent_leave", socket.id)
  });
});

module.exports = app; // For testing
