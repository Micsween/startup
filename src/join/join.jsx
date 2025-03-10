import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./join.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { createGameCode } from "../lobby/lobby";

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

export function Join({ username }) {
  const [gameCode, setGameCode] = React.useState("");
  const navigate = useNavigate();

  const [games, setGames] = React.useState([]);

  React.useEffect(() => {
    setGames(JSON.parse(localStorage.getItem("games") ?? "[]"));
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
            {/*
            make it so that when you click the button it gets the gameObject associated with thtat gameCode
            You can't call the function when doing onClick(), you need to create one that will be called when its clicked*/}
            <Button
              className="btn btn-danger join-button"
              disabled={!gameCode}
              onClick={() => {
                navigate(`/lobby/${gameCode}`);
              }}
            >
              Join Game
            </Button>
            {/*<Button variant='primary' onClick={() => loginUser()} disabled={!userName || !password}>
             */}
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

/*
function listMatchHistory() {



  const matchHistory = [];
  if (matches.length) {
    for (const [index, match] of matches.entries()) {
      matchHistory.push(
        <tbody>
          <tr>
            <th scope="row"> {match.gameName}</th>
            <td id="game-win">{match.result}</td>
            <td>{match.date}</td>
            <td>
              {" "}
              <button
                className="btn btn-warning dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Opponents
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                {getOpponentList(match.opponents)}
              </ul>
            </td>
          </tr>
        </tbody>
      );
    }
  } else {
    matchHistory.push(
      <tbody>
        <tr>
          <td>Play a game to see your match History!</td>
        </tr>
      </tbody>
    );
  }
  return matchHistory;
}
*/
/*
setting up games in local storage
let games = [
  {
        gameName: "The best Game",
        gameCode: "GHWC",
        host: "Username",
        players: [
        { 
            username: "Autobotkilla", 
            userID: 1980  
          },
          { 
            username: "Player2's username", 
            userID: 1234
          },
          { 
            username: "Player3's username", 
            userID: 5678
          },
          { 
            username: "Player4's username", 
            userID: 1000
          },
        ],
      },
        {
        gameName: "Another Game",
        gameCode: "MEEP",
        host: "Some dude",
        players: [
        { 
            username: "Some dude", 
            userID: 1980  
          },
        ],
      },
    
]
localStorage.setItem('games',JSON.stringify(games));
console.log(JSON.parse(localStorage.getItem('games')));
*/
