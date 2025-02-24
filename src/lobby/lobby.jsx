import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./lobby.css";

export function Lobby({gameCode}) {
  return (
    <main>
      <div id="lobby">
        <form method="get" action="game">
          <ul id="player-list" className="list-group">
            <h1>Game Code: {gameCode}</h1>
            <li id="host" className="list-group-item">
              Player 1 👑
            </li>
            <li className="list-group-item">Player 2</li>
            <li className="list-group-item">Player 3</li>
            <li className="list-group-item">Player 4</li>
          </ul>
          <div id="start-button">
            <input
              className="btn btn-danger"
              type="submit"
              value="Start Game"
            />
          </div>
        </form>
      </div>
    </main>
  );
}
