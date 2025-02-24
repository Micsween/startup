import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./lobby.css";
async function findGame(gameCode){
  let games = await JSON.parse(localStorage.getItem("games"));
  const foundGame = games.find((game) => game.gameCode === gameCode);
  return foundGame;

}
async function getPlayerList(gameCode) {
  let foundGame = await findGame(gameCode);
  const playerList = [];
  if (foundGame.players != null) {
    const host = foundGame.host;
    playerList.push(
      <li id="host" className="list-group-item">
        {host} 👑
      </li>
    );
    
    const players = foundGame.players;
    for (const [index, player] of players.entries()) {
      playerList.push(
        <li key={player.userID}  className="list-group-item">
          {player.username}
        </li>
      );
    }
  }else{
    playerList.push(
      <li className="list-group-item">
        Invite your friends!
      </li>
    );
  }
  return playerList;
}

export function Lobby({ gameCode }) {
  
  return (
    <main>
      <div id="lobby">
        <form method="get" action="game">
          <ul id="player-list" className="list-group">
            <h1>Game Code: {gameCode}</h1>
            {getPlayerList(gameCode)}
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
/*
 <li id="host" className="list-group-item">
              Player 1 👑
            </li>
            <li className="list-group-item">Player 2</li>
            <li className="list-group-item">Player 3</li>
            <li className="list-group-item">Player 4</li>
*/
