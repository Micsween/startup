import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./join.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { createGameCode } from "../lobby/lobby";
import { joinGame } from "../client.js";
import { GameClient } from "../socket.js";
// async function fetchLobbies() {
//   let response = await getLobbies();
//   return await response.json();
// }
/*CREATE A WEBSOCKET CONNECTION FOR THE LIST OF LOBBIES 
SO THAT IT LIVE UPDATES WHEN PEOPLE JOIN/A NEW LOBBY IS CREATED */
//let gameClient;
export let gameClient;
export function Join({ username }) {
  const [gameCode, setGameCode] = React.useState("");
  const [lobbies, setLobbies] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    gameClient = new GameClient();
    gameClient.socket.on("lobby update", (lobbies) => {
      console.log("lobbies have been updated ", lobbies);
      setLobbies(lobbies);
    });
    gameClient.getLobbies();

    //fetchLobbies().then((lobbies) => setLobbies(lobbies));
  }, []);

  return (
    <main>
      <div id="join">
        <h1>Active Games</h1>
        <table id="active-games" className="table table-striped ">
          <thead>
            <tr>
              <th scope="col">Game Code </th>
              <th scope="col">Host </th>
              <th scope="col">Current Players </th>
            </tr>
          </thead>
          <tbody>{listLobbies(lobbies)}</tbody>
        </table>
        <form>
          <p id="username">{username}</p>
          <div>
            <input
              type="text"
              maxLength="4"
              placeholder="Enter Game Code"
              value={gameCode}
              onChange={(e) => setGameCode(e.target.value)}
            />
            <Button
              className="btn btn-danger join-button"
              disabled={!gameCode}
              //create a functiont that checks for a valid game code
              onClick={async () => {
                let foundGame = await joinGame(gameCode);
                if (foundGame) {
                  navigate(`/lobby/${gameCode}`);
                } else {
                  alert("The code you entered was incorrect.");
                }
              }}
            >
              Join Game
            </Button>
            <Button
              className="btn btn-dark"
              onClick={async () => {
                const newCode = createGameCode();
                gameClient.createLobby(newCode, username);
              }}
            >
              Create Game
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

function listLobbies(lobbies) {
  const lobbyList = [];

  for (const [index, lobby] of lobbies.entries()) {
    lobbyList.push(
      <tr key={index}>
        <td>{lobby.gameCode}</td>
        <td>{lobby.host}</td>
        <td>{lobby.players.length}</td>
      </tr>
    );
  }
  return lobbyList;
}

function updateGame() {
  //for now, this does nothing. but once I have a database it will update the database with a new player
}
