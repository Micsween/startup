//I need a use client and not usinng promises
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./lobby.css";
async function findGame(gameCode) {
  return new Promise((resolve) => {
    let games = JSON.parse(localStorage.getItem("games"));
    const foundGame = games.find((game) => game.gameCode === gameCode);
    resolve(foundGame);
  });
}
function getPlayerList(gameCode) {
  return findGame(gameCode).then((foundGame) => {
    const playerList = [];
    if (foundGame && foundGame.players != null && foundGame.players != undefined) {
      const host = foundGame.host;
      playerList.push(
        <li id="host" className="list-group-item">
         {host} 👑
        </li>
      );

    const players = foundGame.players;
    players.forEach((player) => {
      playerList.push(
        <li key={player.userID} className="list-group-item">
          {player.username}
        </li>
      );
      });
    }else {
      playerList.push(
        <li className="list-group-item">
          Invite your friends!
        </li>
      );
    }
    return playerList;
  });
}


export function Lobby({ gameCode }) {
  const [players, setPlayers] = React.useState([<li className="list-group-item">
        Invite your friends!
      </li>]);
  React.useEffect(() => {
    getPlayerList(gameCode).then((playerList) => {
      setPlayers(playerList);
  }).catch((error) => {
    console.log("Error:" + error)}
    );
  }, [gameCode]);

  return (
    <main>
      <div id="lobby">
        <form method="get" action="game">
          <ul id="player-list" className="list-group">
            <h1>Game Code: {gameCode}</h1>
            {players}
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
