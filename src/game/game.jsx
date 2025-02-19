import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./game.css";
export function Game() {
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
              <img src="card-images/green-3.svg" className="playing-card" />
              <img src="card-images/yellow-3.svg" className="playing-card" />
              <img src="card-images/green-3.svg" className="playing-card " />
              <img src="card-images/yellow-3.svg" className="playing-card" />
              <img src="card-images/green-3.svg" className="playing-card " />
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
              <img src="card-images/card-back.svg" className="playing-card" />
              <img src="card-images/card-back.svg" className="playing-card" />
              <img src="card-images/card-back.svg" className="playing-card" />
              <img src="card-images/card-back.svg" className="playing-card" />
              <img src="card-images/card-back.svg" className="playing-card" />
            </div>
          </div>
          <div className="grid-item player-left">
            <div className="player-hand enemy-hand">
              <img
                src="card-images/card-back.svg"
                id="card-back"
                className="playing-card"
              />
              <img
                src="card-images/card-back.svg"
                id="card-back"
                className="playing-card"
              />
              <img
                src="card-images/card-back.svg"
                id="card-back"
                className="playing-card"
              />
              <img
                src="card-images/card-back.svg"
                id="card-back"
                className="playing-card"
              />
              <img
                src="card-images/card-back.svg"
                id="card-back"
                className="playing-card"
              />
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
              <img
                src="card-images/card-back.svg"
                id="card-back"
                className="playing-card"
              />
              <img
                src="card-images/card-back.svg"
                id="card-back"
                className="playing-card"
              />
              <img
                src="card-images/card-back.svg"
                id="card-back"
                className="playing-card"
              />
              <img
                src="card-images/card-back.svg"
                id="card-back"
                className="playing-card"
              />
              <img
                src="card-images/card-back.svg"
                id="card-back"
                className="playing-card"
              />
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
            <img src="card-images/card-back.svg" className="playing-card" />
            <img src="card-images/yellow-3.svg" className="playing-card" />
          </div>
        </div>
      </div>
    </main>
  );
}

//make a card a property
//make a playericon property
