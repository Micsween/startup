import express from "express";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";
import { database as db } from "./database.js";
import { Server } from "socket.io";
import http from "http";

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  //DELETE THIS
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"], // Specify allowed HTTP methods
    credentials: true, // Allow cookies or credentials if needed
  },
  path: "/ws",
});

io.on("connection", (socket) => {
  console.log("Client connected to websocket server");
  socket.on("message", (msg) => {
    console.log(`Message received: ${msg}`);
    io.emit("message", `Server received: ${msg}`);
  });

  //a room is different from a lobby object
  socket.on("join lobby", (lobbyCode) => {
    console.log(`Lobby joined: ${lobbyCode}`);
    socket.join(lobbyCode);
    db.getLobby(lobbyCode).then((lobby) => {
      io.to(lobbyCode).emit("join lobby", lobby);

      //callback(lobby);
    });
    //callback function  that will update the usestate a list of all current players in the lobby
  });
});
//io.listen(4000);
// io.on("connection", (socket) => {
//   console.log("Client connected to websocket server");
//   socket.on("message", (message) => {
//     console.log("Received message:", message);

//     socket.emit("message", message);
//   });
// });

const bcryptjs = bcrypt;
const authCookieName = "authCookie";

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
let apiRouter = express.Router();

apiRouter.post("/user/create", async (req, res) => {
  if (await db.getUser(req.body.username)) {
    res.status(401).send({ message: "User already exists" });
  }

  const user = createUser(req.body.username, req.body.password);
  setCookie(res, user.authToken);
  await db.addUser(user);
  res.send(user);
});

apiRouter.post("/user/login", async (req, res) => {
  console.log("Loggin in..");
  const user = await verifyUser(req.body.username, req.body.password);
  if (user) {
    user.authToken = v4();
    await db.updateUserAuth(user);
    setCookie(res, user.authToken);
    res.send(user.authToken);
  } else {
    res.status(401).send({ message: "User not verified." });
  }
});

apiRouter.get("/user", async (req, res) => {
  console.log("Retrieving User..");
  const authCookie = req.cookies[authCookieName];
  if (authCookie) {
    let user = await db.getUserAuth(authCookie);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } else {
    res.status(401).send({ message: "User not verified." });
  }
});

apiRouter.delete("/user/logout", async (req, res) => {
  const authCookie = req.cookies[authCookieName];
  let user = await db.getUserAuth(authCookie);
  user.authToken = null;
  if (user) {
    res.clearCookie(authCookieName);
    await db.updateUserAuth(user);
  }
  res.send({ message: "User logged out." });
});

apiRouter.get("/matches", async (req, res) => {
  console.log("Loading matches..");
  const authCookie = req.cookies[authCookieName];
  if (authCookie) {
    let matches = await db.getMatches();
    res.send(matches);
  } else {
    res.status(401).send({ message: "User not verified." });
  }
});

apiRouter.get("/quote", async (req, res) => {
  let url = "https://zenquotes.io/api/random";
  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let quoteData = await response.json();
  res.send(quoteData[0]);
});

apiRouter.put("/game", async (req, res) => {
  console.log("Joining game...");
  const authCookie = req.cookies[authCookieName];
  if (!authCookie) {
    res.status(401).send({ message: "User not verified." });
  }
  let user = await db.getUserAuth(authCookie);
  let lobby = await db.getLobby(req.body.gameCode);
  if (!lobby) {
    res.status(404).send({ message: "Game not found" });
  }
  if (!lobby.players.includes(user.username)) {
    await db.joinLobby(req.body.gameCode, user.username);
  }
  res.send(lobby);
});

apiRouter.post("/lobby/:gameCode", async (req, res) => {
  console.log("Creating lobby...");
  const authCookie = req.cookies[authCookieName];
  const gameCode = req.params.gameCode;
  if (!authCookie) {
    res.status(401).send({ message: "User not verified." });
  }
  const user = await db.getUserAuth(authCookie);
  await db.addLobby(createLobby(user.username, gameCode));
});

apiRouter.get("/lobby/:gameCode", async (req, res) => {
  console.log("Getting game...");
  const authCookie = req.cookies[authCookieName];
  const gameCode = req.params.gameCode;
  const lobby = await db.getLobby(gameCode);
  if (!authCookie) {
    res.status(401).send({ message: "User not verified." });
    return;
  }
  if (!lobby) {
    res.status(404).send({ message: "Lobby not found." });
    return;
  }
  res.send(lobby);
});

apiRouter.delete("/lobby/:gameCode", async (req, res) => {
  console.log("Deleting lobby...");
  const gameCode = req.params.gameCode;
  const lobby = await db.getLobby(gameCode);
  console.log("lobby 1");
  if (!lobby) {
    res.status(404).send({ message: "Lobby not found." });
    return;
  }
  await db.removeLobby(gameCode);
  console.log("lobby 2");
  res.send({ message: "Lobby deleted." });
});

apiRouter.get("/lobby", async (req, res) => {
  console.log("Getting lobbies...");
  const authCookie = req.cookies[authCookieName];
  if (authCookie) {
    //getLobbies
    const lobbies = await db.getLobbies();
    res.send(lobbies);
  } else {
    res.status(401).send({ message: "User not verified." });
  }
});

apiRouter.post("/game/:gameCode/start", async (req, res) => {
  console.log("Starting game...");
  const authCookie = req.cookies[authCookieName];
  const gameCode = req.params.gameCode;
  const lobby = await db.getLobby(gameCode);
  console.log("game 1" + lobby);
  if (!authCookie) {
    res.status(401).send({ message: "User not verified." });
  }
  if (!lobby) {
    res.status(404).send({ message: "Lobby not found." });
  }

  let unoGame = new UnoGame(lobby);
  let gameState = unoGame.startGame();
  console.log("game 2");
  await db.addGame(unoGame);
  console.log("game 3");
  res.send(gameState);
});

apiRouter.get("/game/:gameCode/state", async (req, res) => {
  const authCookie = req.cookies[authCookieName];
  const gameCode = req.params.gameCode;
  if (!authCookie) {
    res.status(401).send({ message: "User not verified." });
  }
  const gameData = await db.getGame(gameCode);
  if (!gameData) {
    res.status(404).send({ message: "Game not found." });
  }
  res.send(gameData.state);
});

apiRouter.post("/game/:gameCode/take-turn", async (req, res) => {
  console.log("taking a turn...");
  const authCookie = req.cookies[authCookieName];
  const gameCode = req.params.gameCode;

  if (!authCookie) {
    res.status(401).send({ message: "User not verified." });
  }
  const gameData = await db.getGame(gameCode);
  const game = new UnoGame(gameData.state);

  if (!game) {
    res.status(404).send({ message: "Game not found." });
  }
  game.setState(gameData.state);
  let turn = req.body;

  if (turn.action == "drawCard") {
    await game.drawCard();
  } else if (turn.action == "playCard") {
    await game.playCard(turn.card);
  }
  await db.updateGame(gameCode, game.state);
  res.send(game.state);
});

app.use(`/api`, apiRouter);

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

httpServer.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

function createUser(username, password) {
  let user = {
    username: username,
    password: password,
    authToken: v4(),
  };
  return user;
}

function setCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    //httpOnly: true;
    //secure: true
    sameSite: "strict",
  });
}

async function verifyUser(username, password) {
  const user = await db.getUser(username);
  return user && user.password == password ? user : null;
}

function createLobby(username, gameCode) {
  return {
    gameCode: gameCode,
    host: username,
    players: [username],
  };
}

export class UnoGame {
  constructor(game) {
    this.state = {
      gameCode: game.gameCode,
      host: game.host,
      players: game.players.map((username) => ({ username })),
      discardPile: [],
      drawPile: [],
      turn: 0,
    };
  }

  setState(state) {
    this.state = state;
  }

  serializeState() {
    return JSON.parse(JSON.stringify(this.state));
  }

  deserializeJSON(jsonString) {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Error parsing JSON:", error.message);
      return null;
    }
  }

  joinGame(username) {
    let player = {
      position,
      username,
      hand: [],
    };

    this.state.players.push(player);
  }

  startGame() {
    this.createDeck();
    this.shuffleDeck();
    this.deal();
    this.state.players.forEach((player, index) => {
      player.position = index;
    });
    this.state.turn = 0;
    return this.serializeState();
  }

  createDeck() {
    ["red", "blue", "yellow", "green"].forEach((color) => {
      for (let i = 0; i <= 9; i++) {
        this.state.drawPile.push({
          color: color,
          number: i,
        });
      }
    });
  }

  shuffleDeck() {
    for (let i = this.state.drawPile.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.state.drawPile[i], this.state.drawPile[j]] = [
        this.state.drawPile[j],
        this.state.drawPile[i],
      ];
    }
  }
  updateTurn() {
    this.state.turn++;
    if (this.state.turn === this.state.players.length) {
      this.state.turn = 0;
    }
  }
  drawCard() {
    let player = this.state.players[this.state.turn];
    player.hand.push(this.state.drawPile.pop());
    this.updateTurn();
    if (this.state.drawPile.length === 0) {
      this.state.drawPile.createDeck();
      this.state.drawPile.shuffleDeck();
    }
    return this.serializeState();
  }

  deal() {
    this.state.players.forEach((player) => {
      player.hand = this.state.drawPile.splice(0, 7);
    });

    this.state.discardPile = this.state.drawPile.splice(0, 1);
    console.log(
      `The discard pile after all cards have been dealt:${this.state.discardPile[0].color} ${this.state.discardPile[0].number}`
    );
  }

  playCard(cardToRemove) {
    console.log(`current turn: ${this.state.turn}`);
    let currentHand = this.state.players[this.state.turn].hand;
    this.state.players[this.state.turn].hand = currentHand.filter(
      (card) =>
        card.color !== cardToRemove.color || card.number !== cardToRemove.number
    );
    //this.state.discardPile.unshift(cardToRemove);
    this.state.discardPile[0] = cardToRemove;
    console.log(
      `current player's hand: ${
        this.state.players[this.state.turn].hand.length
      }`
    );

    this.updateTurn();
    console.log(`current turn: ${this.state.turn}`); //add the card to the TOP of the discard pile
    return this.serializeState();
  }
}
