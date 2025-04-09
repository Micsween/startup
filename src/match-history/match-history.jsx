import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./match-history.css";
import { getQuote, getMatches, getUser } from "../client.js";
import Button from "react-bootstrap/Button";
export function MatchHistory() {
  const [quote, setQuote] = React.useState("No quote yet");
  const [quoteAuthor, setQuoteAuthor] = React.useState("idk, some dude.");
  const [username, setUsername] = React.useState("Player");
  const [matches, setMatches] = React.useState([]);

  React.useEffect(() => {
    getUser().then((user) => {
      setUsername(user.username);
      getMatches(user.username).then((matches) => setMatches(matches));
    });

    fetchQuote().then((data) => {
      setQuote(data.q);
      setQuoteAuthor(data.a);
    });
  }, []);

  return (
    <main>
      <div id="content">
        <h1>{username}'s Match History</h1>
        <table id="match-history" className="table table-striped ">
          <tbody>{listMatchHistory(matches, username)}</tbody>
        </table>
        <div id="quote" className="card">
          <div className="card-body">
            <blockquote className="blockquote mb-0">
              <p>{quote}</p>
              <footer className="blockquote-footer">
                <cite title="Source Title">({quoteAuthor} )</cite>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </main>
  );
}

async function fetchQuote() {
  let response = await getQuote();
  return await response.json();
}

function listMatchHistory(matches, username) {
  const matchHistory = [];
  if (matches) {
    for (const [index, match] of matches.entries()) {
      let winner = match.winner;
      let outcome = winner === username ? "Won" : "Lost";
      matchHistory.push(
        <tr key={index}>
          <td id={outcome}>{outcome}</td>
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
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              {getOpponentList(match.players)}
            </ul>
          </td>
        </tr>
      );
    }
  } else {
    matchHistory.push(
      <tr key="0">
        <td>Play a game to see your match History!</td>
      </tr>
    );
  }
  return matchHistory;
}

function getOpponentList(opponents) {
  const opponentList = [];

  if (opponents != null) {
    for (const [index, opponent] of opponents.entries()) {
      opponentList.push(
        <li key={index}>
          <Button className="dropdown-item">{opponent}</Button>
        </li>
      );
    }
  }
  return opponentList;
}
