import express from "express";
import CookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import { v4 as UUID } from "uuid";
const app = express();
const port = 4000;

const cookieParser = CookieParser();
const bcryptjs = bcrypt;
const uuid = UUID();

let users = [];
let matches = [];

app.use(express.json());
let apiRouter = express.Router();
app.use(`/api`, apiRouter);

// app.post("/login/create-user", (req, res) => {
//   let user = { username: req.body.username, password: req.body.password };
//   users.push(user);
//   res.status(200);
//   res.send(user);
// });\
//find the user
//if it it exists, dont create the acct and throw an error
// otherwise create the accoutn

apiRouter.post("/user/create", async (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
    authToken: 1234,
  };
  users.push(user);
  res.send(user);
});

apiRouter.post("/user/login", async (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
    authToken: "1234",
  };
  let newAuthToken = "5678";
  users.forEach((registeredUser) => {
    if (
      registeredUser.username == user.username &&
      registeredUser.password == user.password
    ) {
      //create a new authToken on logins
      registeredUser.authToken = newAuthToken;
    }
  });
  res.send(newAuthToken);
});

apiRouter.delete("/user/logout", async (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
    authToken: 1234,
  };
  users.find(user).authToken = null;
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

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

//ENDPOINT TESTS:
//curl -X POST -H "Content-Type: application/json" -d '{"username":"firstuser", "password":"firstpassword"}' http://localhost:4000/user/create
//curl -X POST -H "Content-Type: application/json" -d '{"username":"firstuser", "password":"firstpassword"}' http://localhost:4000/api/user/login
