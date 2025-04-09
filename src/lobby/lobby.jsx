//I need a use client and not usinng promises
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./lobby.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUser } from "../client";
import { gameClient } from "../join/join";

export function createGameCode() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let newGameCode = "";
  for (let i = 0; i < 4; i++) {
    const random = Math.floor(Math.random() * alphabet.length);
    newGameCode += alphabet[random];
  }
  return newGameCode;
}

function listPlayers(players) {
  const playerList = [];
  players.forEach((player, index) => {
    if (playerList.length === 0) {
      playerList.push(
        <li key={index} id="host" className="list-group-item">
          {player} 👑
        </li>
      );
    } else {
      playerList.push(
        <li key={index} className="list-group-item">
          {player}
        </li>
      );
    }
  });
  return playerList;
}
export function Lobby() {
  const navigate = useNavigate();
  let { gameCode } = useParams();
  const [players, setPlayers] = React.useState([]);

  function loadPlayers(lobby) {
    if (lobby == null) {
      navigate("/join");
      return;
    }
    setPlayers(lobby.players ?? []);
  }

  React.useEffect(() => {
    gameClient.socket.on("join lobby", (lobby) => {
      loadPlayers(lobby);
    });

    gameClient.socket.on("leave lobby", (lobby) => {
      console.log("leave lobby", lobby);
      loadPlayers(lobby);
    });

    gameClient.socket.on("start game", (gameCode) => {
      console.log("start game", gameCode);
      navigate(`/game/${gameCode}`);
    });

    gameClient.joinLobby(gameCode);
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

        <div id="start-leave">
          <input
            className="btn btn-dark"
            id="start"
            type="submit"
            value="Leave Game"
            onClick={() => {
              try {
                getUser().then((user) => {
                  console.log("retrieved user:", user.username);
                  gameClient.leaveLobby(gameCode, user.username);
                });
              } catch (e) {
                console.log(e);
              }
              navigate("/join");
            }}
          />
          <input
            className="btn btn-danger"
            type="submit"
            id="start"
            value="Start Game"
            onClick={async () => {
              try {
                //switch to websocket
                gameClient.startGame(gameCode);
                //await startGame(gameCode);
                //await deleteLobby(gameCode);
                //xnavigate(`/game/${gameCode}`);
              } catch (e) {
                console.log(e);
              }
            }}
          />
        </div>
      </div>
    </main>
  );
}
