import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./join.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { createGameCode } from "../lobby/lobby";
import { joinGame, getGames } from "../client.js";

async function fetchGames() {
  let response = await getGames();
  return await response.json();
}

export function Join({ username }) {
  const [gameCode, setGameCode] = React.useState("");
  const [games, setGames] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchGames().then((games) => setGames(games));
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
          <tbody>{listGames(games)}</tbody>
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
            <input
              id="join-button"
              className="btn btn-dark"
              type="submit"
              value="Create Game"
              onClick={() => {
                let newCode = createGameCode();
                navigate(`/lobby/${newCode}`);
              }}
            />
          </div>
        </form>
      </div>
    </main>
  );
}

function listGames(games) {
  const gameList = [];
  for (const [index, game] of games.entries()) {
    gameList.push(
      <tr key={index}>
        <td>{game.gameCode}</td>
        <td>{game.host}</td>
        <td>{game.players.length}</td>
      </tr>
    );
  }
  return gameList;
}

function updateGame() {
  //for now, this does nothing. but once I have a database it will update the database with a new player
}
