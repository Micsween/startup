import express from "express";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";
const app = express();
const port = 4000;

const bcryptjs = bcrypt;
const authCookieName = "authCookie";
let users = [];
let liveGames = [];
let match = {
  result: "Win",
  date: "2/19/2025",
  opponents: [
    { username: "Player2", userID: "1234" },
    { username: "Player3", userID: "5678" },
    { username: "Player4", userID: "91011" },
  ],
};
let match2 = {
  result: "Lose",
  date: "10/07/2003",
  opponents: [
    { username: "username2", userID: "7777" },
    { username: "username3", userID: "8888" },
    { username: "username4", userID: "9999" },
  ],
};
let matches = [match, match2];

app.use(express.json());
app.use(cookieParser());
let apiRouter = express.Router();

apiRouter.post("/user/create", async (req, res) => {
  console.log("Creating account..");
  console.dir(req.body);
  if (!findUser("username", req.body.username)) {
    const user = createUser(req.body.username, req.body.password);
    setCookie(res, user.authToken);
    res.send(user);
  } else {
    res.status(401).send({ msg: "User already exists" });
  }
});

apiRouter.post("/user/login", async (req, res) => {
  console.log("Loggin in..");
  const user = verifyUser(req.body.username, req.body.password);
  if (user) {
    user.authToken = v4();
    setCookie(res, user.authToken);
    res.send(user.authToken);
  } else {
    res.status(401).send({ message: "User not verified." });
  }
});
//make a function that finds a user by the authToken

apiRouter.delete("/user/logout", async (req, res) => {
  console.log("Logging out...");
  const authCookie = req.cookies[authCookieName];
  users.forEach((registeredUser) => {
    if (registeredUser.authToken == authCookie) {
      res.clearCookie(authCookieName);
      registeredUser.authToken = null;
    }
  });
  res.send(users);
});

apiRouter.get("/matches", async (req, res) => {
  console.log("Loading matches..");
  //verify the user
  //get match history, which for now is stored on the server
  const authCookie = req.cookies[authCookieName];
  //add a function that checks if the authtoken is valid
  if (authCookie) {
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

app.use(`/api`, apiRouter);

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

function createUser(username, password) {
  let user = {
    username: username,
    password: password,
    authToken: v4(),
  };
  users.push(user);
  return user;
}
function setCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    //httpOnly: true;
    //secure: true
    sameSite: "strict",
  });
}

function findUser(field, value) {
  return !value ? null : users.find((u) => u[field] === value);
}

//verifies a user and returns the user that was found
function verifyUser(username, password) {
  const user = findUser("username", username);
  return user && user.password == password ? user : null;
}

export class UnoGame {
  constructor(gameCode, host) {
    this.state = {
      gameCode: gameCode,
      host: host,
      players: [],
      discardPile: [],
      drawPile: [],
      turn: 0,
    };
  }

  //change this to return a promise
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
      username,
      hand: [],
    };

    this.state.players.push(player);
  }

  startGame() {
    this.createDeck();
    this.shuffleDeck();
    this.deal();
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
    if (this.state.turn === 4) {
      this.state.turn = 0;
    }
  }
  drawCard() {
    //setHand(hand.concat(drawPile[0]));
    let player = this.state.players[this.state.turn];
    player.hand.push(this.state.drawPile.pop());
    this.updateTurn();
    if (drawPile.isEmpty()) {
      drawPile.createDeck();
      drawPile.shuffleDeck();
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
    this.state.discardPile.unshift(cardToRemove);
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

//you can use fetch requests to get the gamestate
//   type Card {
//       color: string,
//       number: number;
//   }
//
//  type Player {
//      username: string,
//      hand: Card[],
//  }
//
//  type GameState {
//    gameCode: string,
//    host: string,
//    players: Player[],
//    discardPile: Card[],
//    drawPile: Card[],
//    turn: number,
//  }
//
