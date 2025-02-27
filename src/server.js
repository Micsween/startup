function shuffleCards(cards) {
  let shuffledDeck = [];
  for (let i = 0; i < cards.length; i++) {
    let random = Math.floor(Math.random() * cards.length);
    shuffledDeck.push(cards[random]);
  }
  return shuffledDeck;
}
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
//

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

  drawCard() {
    //setHand(hand.concat(drawPile[0]));
    console.log("before pop: " + this.state.drawPile.length);
    let player = this.state.players[this.state.turn];
    player.hand.push(this.state.drawPile.pop());
    console.log("After pop: " + this.state.drawPile.length);
    return this.serializeState();
  }

  deal() {
    this.state.players.forEach((player) => {
      player.hand = this.state.drawPile.splice(0, 7);
    });
  }

  playCard(card) {}
}

//drawPile
//players
//every player has a:
//  hand, username, handsize
//  game (whose turn it is)
// cards
//    discard (what can/cannot be played)
//    dr

//   createDeck() {
//     let cardTypes = ["red", "blue", "yellow", "green"];
//     for (let i = 0; i < 4; i++) {
//       let cardPath = "card-images/" + cardTypes[i] + "-cards/";
//       for (let i = 0; i <= 9; i++) {
//         this.state.cards.push(`${cardPath}` + `${i}.png`);
//       }
//     }

//   }
