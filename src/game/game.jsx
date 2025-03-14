import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./game.css";
import { useNavigate } from "react-router-dom";
import { PlayerInfo, UserInfo } from "./player-info";
import { UnoGame } from "./uno-game.js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, getGameState, drawCard, playCard } from "../client.js";
let game;
//LATER YOU NEED TO UPDATE THIS SO THAT

export function Game() {
  let { gameCode } = useParams();
  const [state, setState] = useState();
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [lastCard, setLastCard] = React.useState("card-images/card-back.svg");
  const [players, setPlayers] = React.useState([
    "Michelle",
    "Lauren",
    "Eryn",
    "James",
  ]);
  const [hand, setHand] = React.useState([]);
  const [isHovered, setIsHovered] = React.useState(false);

  useEffect(() => {
    //game = new UnoGame();
    getGameState(gameCode).then((state) => {
      console.log(state);
      setState(state);
    });
    getUser().then(setUser);

    // game.joinGame("Michelle");
    // game.joinGame("Lauren");
    // game.joinGame("Eryn");
    // const gameState = game.startGame();
    // setState(gameState);
  }, []);
  React.useState(() => {
    let cards = [
      "card-images/blue-cards/1.png",
      "card-images/blue-cards/7.png",
      "card-images/green-cards/3.png",
      "card-images/yellow-cards/8.png",
    ];
    setHand(cards);
  }, []);

  const [enemyHand, setEnemyHand] = React.useState([]);
  React.useState(() => {
    let cards = [
      ,
      "card-images/card-back.svg",
      "card-images/card-back.svg",
      "card-images/card-back.svg",
      "card-images/card-back.svg",
    ];
    let newHand = [];
    cards.forEach((card, index) => {
      newHand.push(<img key={index} src={card} className="playing-card" />);
    });
    setEnemyHand(newHand);
  });

  const [enemySideHand, setEnemySideHand] = React.useState([]);
  React.useState(() => {
    let cards = [
      "card-images",
      "card-images/card-back.svg",
      "card-images/card-back.svg",
      "card-images/card-back.svg",
    ];
    let newHand = [];
    cards.forEach((card, index) => {
      newHand.push(
        <img key={index} src={card} className="playing-card" id="card-back" />
      );
    });
    setEnemySideHand(newHand);
  });
  if (!state || !user) {
    return <div>Loading...</div>;
  }

  const thisPlayer = state.players.find(
    (player) => player.username == user.username
  );
  const otherPlayers = state.players.filter(
    (player) => player.username != user.username
  );

  return (
    <main>
      <div id="game">
        <div id="grid-container">
          <div className="grid-item main-user">
            <UserInfo user={user} />
            <div className="player-hand top-user">
              {thisPlayer.hand.map((card, index) => (
                <Card
                  key={index}
                  card={card}
                  onCardClick={async () => {
                    // console.log("I am being clicked!!!");
                    // console.log(card);
                    console.log(gameCode);
                    setState(await playCard(gameCode, card));
                  }}
                  isTurn={thisPlayer.position === state.turn}
                />
              ))}
            </div>
          </div>
          {otherPlayers.map((player, index) => (
            <div className={`grid-item ${playerPosition(index)}`}>
              <div className="player-hand top-user">
                {player.hand.map((card, index) => (
                  <Card
                    key={index}
                    card={card}
                    onCardClick={async () => {
                      console.log("I am being clicked!!!");
                      console.log(card);
                      setState(await playCard(gameCode, card));
                    }}
                    isTurn={player.position === state.turn}
                  />
                ))}
              </div>
              <PlayerInfo player={player} />
            </div>
          ))}
          <div className="grid-item draw-discard-piles">
            <DrawPile
              drawPile={state.drawPile}
              onDrawCard={async () => {
                //when i have a server add async
                setState(await drawCard(gameCode));
              }}
            />
            <DiscardPile discardPile={state.discardPile} />
          </div>
        </div>
      </div>
    </main>
  );
}

function playerPosition(index) {
  if (index == 0) {
    return "player-left";
  } else if (index == 1) {
    return "player-top";
  } else if (index == 2) {
    return "player-right";
  }
}
export function DrawPile({ drawPile, onDrawCard }) {
  return (
    <div>
      <img
        src="/card-images/card-back.svg"
        className="playing-card user-card"
        onClick={onDrawCard}
      />
    </div>
  );
}
export function DiscardPile({ discardPile }) {
  return (
    <img
      src={`/card-images/${discardPile[0].color}-cards/${discardPile[0].number}.png`}
      className="playing-card"
    />
  );
}
export function Card({ card, onCardClick, isTurn }) {
  return (
    <img
      color={`${card.color}`}
      number={`${card.number}`}
      src={`/card-images/${card.color}-cards/${card.number}.png`}
      className="playing-card user-card"
      onClick={isTurn ? onCardClick : undefined}
      style={{ cursor: isTurn ? "pointer" : "not-allowed" }}
    />
  );
}
