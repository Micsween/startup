import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./game.css";
import { DrawPile } from './draw-pile';

export function Game() {
  const [lastCard, setLastCard]  = React.useState("none");
  const [players, setPlayers] = React.useState(["Michelle", "Lauren", "Eryn", "James"]);
  const [hand, setHand] = React.useState([]);
  React.useState(() => {
    let cards = ["card-images/blue-cards/1.png", "card-images/blue-cards/7.png", "card-images/green-cards/3.png", "card-images/yellow-cards/8.png"];
    let newHand = [];
    cards.forEach(card => {
      newHand.push(<img src={card} className="playing-card" />);
    });
    setHand(newHand);
  });

  const [enemyHand, setEnemyHand] = React.useState([]);
  React.useState(() => {
    let cards = [, "card-images/card-back.svg", "card-images/card-back.svg", "card-images/card-back.svg", "card-images/card-back.svg"];
    let newHand = [];
    cards.forEach(card => {
      newHand.push(<img src={card} className="playing-card" />);
    });
    setEnemyHand(newHand);
  });

  const [enemySideHand, setEnemySideHand] = React.useState([]);
  React.useState(() => {
    let cards = ["card-images", "card-images/card-back.svg", "card-images/card-back.svg", "card-images/card-back.svg"];
    let newHand = [];
    cards.forEach(card => {
      newHand.push(<img src={card} className="playing-card" id="card-back"/>);
    });
    setEnemySideHand(newHand);
  });


  return (
    <main>
      <div id="game">
        <div id="grid-container">
          <div className="grid-item main-user">
            <div className="player-info main-user">
              <img
                className="player-icon"
                src="https://overwatchitemtracker.com/resources/heroes/all/icons/kittymari.png"
                alt="profile picture"
                width="40"
              />
              <p id="player-name">Player1 (7) {lastCard}</p>
            </div>
            <div className="player-hand main-user">
              {hand}
            </div>
          </div>
          <div className="grid-item player-top">
            <div className="player-info top">
              <img
                className="player-icon"
                src="https://overwatchitemtracker.com/resources/heroes/all/icons/kittymari.png"
                alt="profile picture"
                width="40"
              />
              <p id="player-name">Player3</p>
              <p>(6)</p>
            </div>
            <div className="player-hand top-user">
              {enemyHand}
            </div>
          </div>
          <div className="grid-item player-left">
            <div className="player-hand enemy-hand">
            {enemySideHand}
            </div>
            <div className="player-info">
              <img
                className="player-icon"
                src="https://overwatchitemtracker.com/resources/heroes/all/icons/kittymari.png"
                alt="profile picture"
                width="40"
              />
              <p id="player-name">Player2</p>
              <p>(4)</p>
            </div>
          </div>

          <div className="grid-item player-right">
            <div className="player-hand enemy-hand">
            {enemySideHand}
            </div>
            <div className="player-info">
              <img
                className="player-icon"
                src="https://overwatchitemtracker.com/resources/heroes/all/icons/kittymari.png"
                alt="profile picture"
                width="40"
              />
              <p id="player-name"> Player4</p>
              <p>(8)</p>
            </div>
          </div>
          <div className="grid-item draw-discard-piles">
           <DrawPile
             setLastCard={setLastCard} />
            <img src="card-images/yellow-3.svg" className="playing-card" />
          </div>
        </div>
      </div>
    </main>
  );
}

//make a card a property
//make a playericon property
