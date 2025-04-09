import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./game.css";
import { useNavigate } from "react-router-dom";
import { PlayerInfo, UserInfo } from "./player-info";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../client.js";
import { gameClient } from "../join/join";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

export function Game() {
  const { gameCode } = useParams();
  const [state, setState] = useState();
  const [user, setUser] = useState();
  const [gameWon, setGameWon] = useState(false);
  const [winner, setWinner] = useState("none yet");

  useEffect(() => {
    gameClient.socket.on("load state", (state) => {
      console.log("load state", state);
      setState(state);
    });
    gameClient.loadState(gameCode);
    getUser().then(setUser);
  }, []);

  gameClient.socket.on("end game", (winner) => {
    console.log("game ended, winner:", winner);
    console.log("winner:", winner);
    setGameWon(true);
    setWinner(winner);
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
      {gameWon && <GameWonAlert winner={winner} />}
      <div id="game">
        <div id="grid-container">
          <div className="grid-item main-user">
            <UserInfo user={user} isTurn={thisPlayer.position === state.turn} />
            <div className="player-hand top-user">
              {thisPlayer.hand.map((card, index) => (
                <Card
                  key={index}
                  card={card}
                  onCardClick={async () => {
                    gameClient.playCard(gameCode, card);
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
                  <EnemyCard key={index} card={card} />
                ))}
              </div>
              <PlayerInfo
                player={player}
                isTurn={player.position === state.turn}
              />
            </div>
          ))}
          <div className="grid-item draw-discard-piles">
            <DrawPile
              drawPile={state.drawPile}
              onDrawCard={async () => {
                gameClient.drawCard(gameCode);
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

export function EnemyCard({ card }) {
  return (
    <img
      color={`${card.color}`}
      number={`${card.number}`}
      src={`/card-images/uno-card-back.png`}
      className="playing-card user-card"
    />
  );
}

function GameWonAlert({ winner }) {
  const navigate = useNavigate();
  return (
    <Alert variant="light">
      {" "}
      <Alert.Heading>{`${winner} has won the game!`}</Alert.Heading>
      <div className="d-flex justify-content-end">
        <Button
          onClick={() => {
            navigate("/join");
          }}
          variant="warning"
        >
          Quit
        </Button>
      </div>
    </Alert>
  );
}
