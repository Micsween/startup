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
  path: "/ws",
});

io.on("connection", (socket) => {
  console.log("Client connected to websocket server");
  socket.on("message", (msg) => {
    console.log(`Message received: ${msg}`);
    io.emit("message", `Server received: ${msg}`);
  });

  socket.on("join lobby", (lobbyCode) => {
    console.log(`Lobby joined: ${lobbyCode}`);
    socket.join(lobbyCode);
    db.getLobby(lobbyCode).then((lobby) => {
      io.emit("join lobby", lobby);
    });
  });

  socket.on("leave lobby", async (lobbyCode, username) => {
    await db.leaveLobby(lobbyCode, username);
    socket.leave(lobbyCode);
    db.getLobby(lobbyCode).then((lobby) => {
      console.log("Lobby after leaving: ", lobby);
      io.to(lobbyCode).emit("leave lobby", lobby);
    });
  });

  socket.on("start game", async (gameCode) => {
    console.log("Starting game: ", gameCode);
    const lobby = await db.getLobby(gameCode);
    const game = new UnoGame(lobby);
    await game.startGame();
    db.addGame(game).then(() => {
      io.to(gameCode).emit("start game", gameCode);
    });
  });

  socket.on("load state", async (gameCode) => {
    console.log("Loading state: ", gameCode);
    db.getGame(gameCode).then((game) => {
      io.to(gameCode).emit("load state", game.state);
    });
  });

  socket.on("play card", async (gameCode, card) => {
    console.log("Playing card: ", card);
    const gameData = await db.getGame(gameCode);
    const game = new UnoGame(gameData.state);
    game.setState(gameData.state);

    await game.playCard(card);
    db.updateGame(gameCode, game.state).then(() => {
      console.log("Game state updated: ", game.state);
      io.to(gameCode).emit("load state", game.state);
    });
  });

  socket.on("draw card", async (gameCode) => {
    console.log("Drawing card: ", gameCode);
    const gameData = await db.getGame(gameCode);
    const game = new UnoGame(gameData.state);
    game.setState(gameData.state);
    await game.drawCard();
    db.updateGame(gameCode, game.state).then(() => {
      io.to(gameCode).emit("load state", game.state);
    });
  });

  socket.on("create lobby", async (lobbyCode, username) => {
    console.log("Creating lobby: ", lobbyCode);
    console.log("Username: ", username);

    await db.addLobby(createLobby(username, lobbyCode));
    db.getLobbies().then((lobbies) => {
      console.log("Lobbies: ", lobbies);
      io.emit("lobby update", lobbies);
    });
  });

  socket.on("get lobbies", () => {
    console.log("Getting lobbies...");
    db.getLobbies().then((lobbies) => {
      io.emit("lobby update", lobbies);
    });
  });
});

function getDate() {
  const date = new Date();
  const hours = date.getHours();
  let period = hours >= 12 ? "PM" : "AM";
  let standardHour = hours % 12 || 12;

  return `${date.getMonth()}/${date.getDate()} ${standardHour}:${date.getMinutes()} ${period}`;
}

async function endGame(gameCode, winner) {
  let game = await db.getGame(gameCode);

  await db.addMatch({
    winner: winner,
    players: game.state.players.map((player) => player.username),
    date: getDate(),
  });

  await db.removeLobby(gameCode);
  await db.removeGame(gameCode).then(() => {
    io.to(gameCode).emit("end game", winner);
  });
}

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
  const authCookie = req.cookies[authCookieName];
  console.log("authCookie: ", authCookie);

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

apiRouter.get("/matches/:username", async (req, res) => {
  console.log("getting matches..", req.params.username);
  const username = req.params.username;
  let matches = await db.getMatches(username);
  res.send(matches);
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
      winner: null,
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
  }

  gameIsWon() {
    if (this.state.players[this.state.turn].hand.length === 0) {
      this.state.winner = this.state.players[this.state.turn].username;
      return true;
    } else return false;
  }

  canPlay(card) {
    return (
      this.state.discardPile[0].color == card.color ||
      this.state.discardPile[0].number == card.number
    );
  }

  removeCard(currentHand, cardToRemove) {
    this.state.players[this.state.turn].hand = currentHand.filter(
      (card) =>
        card.color !== cardToRemove.color || card.number !== cardToRemove.number
    );
  }

  discard(card) {
    this.state.discardPile[0] = card;
  }

  playCard(cardToRemove) {
    let currentHand = this.state.players[this.state.turn].hand;
    if (this.canPlay(cardToRemove)) {
      this.removeCard(currentHand, cardToRemove);
      this.discard(cardToRemove);
      this.updateTurn();
    }

    if (this.gameIsWon()) {
      endGame(this.state.gameCode, this.state.winner);
    }

    return this.serializeState();
  }
}
