//I need a use client and not usinng promises
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./lobby.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { startGame } from "../client";

export function createGameCode() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let newGameCode = "";
  for (let i = 0; i < 4; i++) {
    const random = Math.floor(Math.random() * alphabet.length);
    newGameCode += alphabet[random];
  }
  return newGameCode;
}

async function getGame(gameCode) {
  if (!gameCode || gameCode === undefined) {
    alert("Missing game Code");
    location = "/join";
  }
  let response = await fetch(`/api/game/${gameCode}`);
  return await response.json();
}

function listPlayers(players) {
  const playerList = [];
  players.forEach((player, index) => {
    if (playerList.length === 0) {
      playerList.push(
        <li key={index} id="host" className="list-group-item">
          {player.username} 👑
        </li>
      );
    } else {
      playerList.push(
        <li key={index} className="list-group-item">
          {player.username}
        </li>
      );
    }
  });
  return playerList;
}

export function Lobby() {
  const navigate = useNavigate();
  let { gameCode } = useParams();
  console.log("I am here");
  const [players, setPlayers] = React.useState([]);
  React.useEffect(() => {
    getGame(gameCode).then((game) => {
      console.log(game);
      setPlayers(game.players ?? []);
    });
  }, []);

  return (
    <main>
      <div id="lobby">
        <ul id="player-list" className="list-group">
          <h1>Game Code: {gameCode}</h1>
          {players.length === 0 ? (
            <li className="list-group-item">Invite your friends!</li>
          ) : (
            listPlayers(players)
          )}
        </ul>
        <div id="start-button">
          <input
            className="btn btn-danger"
            type="submit"
            value="Start Game"
            onClick={async () => {
              await startGame(gameCode);
              navigate(`/game/${gameCode}`);
            }}
          />
        </div>
      </div>
    </main>
  );
}
