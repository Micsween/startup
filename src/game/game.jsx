import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./game.css";
import { DrawPile } from './draw-pile';
import { DiscardPile } from './discard-pile';
export function Game() {
  const [lastCard, setLastCard] = React.useState("card-images/card-back.svg");
  const [players, setPlayers] = React.useState(["Michelle", "Lauren", "Eryn", "James"]);
  const [hand, setHand] = React.useState([]);
  const [isHovered, setIsHovered] = React.useState(false);
  React.useState(() => {
    let cards = ["card-images/blue-cards/1.png", "card-images/blue-cards/7.png", "card-images/green-cards/3.png", "card-images/yellow-cards/8.png"];
    let newHand = [];
    cards.forEach(card => {
      newHand.push(<img src={card} className="user-card" 
        onClick={(e) => {
          setLastCard(e.target.getAttribute("src"));
          newHand = newHand.filter((card) => card.props.src !== e.target.getAttribute("src"));
          setHand(newHand)
        }}
      onHover={() => {
        setIsHovered(true);
      }}/>);
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
           <DrawPile
             hand = {hand}
             setHand = {setHand}
             />
             <DiscardPile
              lastCard = {lastCard}
             />
            
          </div>
        </div>
      </div>
    </main>
  );
}

//make a card a property
//make a playericon property
