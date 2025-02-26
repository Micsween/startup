//I need a use client and not usinng promises
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./lobby.css";
import { useParams } from 'react-router-dom';

function createGameCode() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let newGameCode = "";
  for (let i = 0; i < 4; i++) {
    const random = Math.floor(Math.random() * alphabet.length);
    newGameCode += alphabet[random];
  }
  return newGameCode;
}

function findGame(gameCode){
  const foundGame = JSON.parse(localStorage.getItem(`game-${gameCode}`));
  return foundGame;
}

function createGame(gameCode) {
  let game = {
    gameName: "Another Game",
    gameCode: gameCode,
    host: "Potato",
    players: ["Potato's friend"],
  } 
  
  localStorage.setItem(`game-${gameCode}`, JSON.stringify(game));
  return game;
}

async function findOrCreateGame(gameCode) {
  if (!gameCode) {
    gameCode = createGameCode();
  }
  let game = findGame(gameCode);
  if (!game) {
    game = createGame(gameCode);
  }
  return Promise.resolve(game);
}

function getPlayerList(gameCode) {
  return findGame(gameCode).then((foundGame) => {
    const playerList = [];
    if (
      foundGame &&
      foundGame.players != null &&
      foundGame.players != undefined
    ) {
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
    } else {
      playerList.push(
        <li className="list-group-item">Invite your friends!</li>
      );
    }
    return playerList;
  });
}
function listPlayers(players){
  const playerList = [];
  players.forEach((player) => {
    if (playerList.length === 0) {
      playerList.push(
        <li id="host" className="list-group-item">
          {player} 👑
        </li>
      );
    } else {
      playerList.push(
        <li className="list-group-item">
          {player}
        </li>
      );
    }
  });
  return playerList;
}
    

export function Lobby() {
  const { gameCode } = useParams();
  console.log("I am here");
  const [players, setPlayers] = React.useState([]);
  React.useEffect(() => {
    findOrCreateGame(gameCode).then((game) =>{
      console.log(game);
      setPlayers(game.players ?? []);
    });
  }, []);

  return (
    <main>
      <div id="lobby">
        <form method="get" action="game">
          <ul id="player-list" className="list-group">
            <h1>Game Code: {gameCode}</h1>
            {(players.length === 0) ?
              <li className="list-group-item">Invite your friends!</li> : listPlayers(players)
            }
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
