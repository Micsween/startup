import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./game.css";
import { DrawPile } from './draw-pile';

export function Game() {
  const [players, setPlayers] = React.useState(["Michelle", "Lauren", "Eryn", "James"]);
  const [hand, setHand] = React.useState([]);
  React.useState(() => {
    let cardPath = "card-images/red-uno-cards/"
    let cards = [];
    for(let i = 1; i <= 10; i++) {
      cards.push(`${cardPath}` + `${i}.png`);
    }
    //iterate 1-10
    //make an array with the card path + number.png
    //let cards = ["card-images/green-3.svg", "card-images/yellow-3.svg", "card-images/green-3.svg","card-images/yellow-3.svg", "card-images/green-3.svg"];
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

  const [drawPile, setDrawPile] = React.useState([]);
  React.useState(() => {
    const cards = [];
    let drawPile = [];
    cards.forEach(card => {
      drawPile.push(<img src={card} className="playing-card" id="card-back"/>);
    });
    setDrawPile(drawPile);
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
              <p id="player-name">Player1 (7)</p>
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
           <DrawPile />
            <img src="card-images/yellow-3.svg" className="playing-card" />
          </div>
        </div>
      </div>
    </main>
  );
}

//make a card a property
//make a playericon property
