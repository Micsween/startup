import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./match-history.css";

/*YOU NEED TO UPATE TIME TAGS TO BE JAVASCRIPT DATE OBJECTS ONCE YOU HAVE YOUR DATABASE*/
/*Also add a feature where you can route to different matchHistory pages depending on the player you select */

// const opponentList = opponents.map((opponent) =>
//   <li key={opponent.userID}>{opponent.username}</li>
// );
export function MatchHistory({username}) {
  const [quote, setQuote] = React.useState("No quote yet");
  const [quoteAuthor, setQuoteAuthor] = React.useState("idk, some dude.");
  const [movie, setMovie] = React.useState("From the best movie ever");

  React.useEffect(() => {
    setQuote("Do or do not. There is no try.");
    setQuoteAuthor("Yoda");
    setMovie("Star Wars");
  }, []);

  

  return (
    <main>
      <div id="content">
        <h1>{username}'s Match History</h1>
        <table id="match-history" className="table table-striped ">
          {listMatchHistory()}
        </table>
        <div id="quote" className="card">
          <div className="card-body">
            <blockquote className="blockquote mb-0">
              <p>{quote}</p>
              <footer className="blockquote-footer">
                {quoteAuthor} <cite title="Source Title">({movie})</cite>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </main>
  );
}

function listMatchHistory() {
  const [matches, setMatches] = React.useState([]);
  React.useEffect(() => {
    setMatches(JSON.parse(localStorage.getItem("matches")));
  }, []);

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

function getOpponentList(opponents) {
  const opponentList = [];

  if (opponents != null) {
    for (const [index, opponent] of opponents.entries()) {
      opponentList.push(
        <li key={opponent.userID}>
          <a className="dropdown-item" href="#">
            {opponent.username}
          </a>
        </li>
      );
    }
  }
  return opponentList;
}

/*
for setting up local storage:
let matches = [
  {
        gameName: "The best Game",
        result: "Win",
        date: "2/19/2025",
        opponents: [
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
        gameName: "The second best Game",
        result: "Win",
        date: "2/20/2025",
        opponents: [
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
        gameName: "The third best Game",
        result: "lose",
        date: "2/20/2000",
        opponents: [
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
]
localStorage.setItem('matches',JSON.stringify(matches));
console.log(JSON.parse(localStorage.getItem('matches')));
*/
