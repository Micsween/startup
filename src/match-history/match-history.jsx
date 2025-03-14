import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./match-history.css";
import { getQuote } from "../client.js";
async function fetchQuote() {
  let response = await getQuote();
  return await response.json();
}
export function MatchHistory({ username }) {
  const [quote, setQuote] = React.useState("No quote yet");
  const [quoteAuthor, setQuoteAuthor] = React.useState("idk, some dude.");

  React.useEffect(() => {
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
          <tbody>{listMatchHistory()}</tbody>
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

function listMatchHistory() {
  const [matches, setMatches] = React.useState([]);
  React.useEffect(() => {
    let url = "/api/matches";
    const response = fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => setMatches(json));
  }, []);

  const matchHistory = [];
  if (matches) {
    for (const [index, match] of matches.entries()) {
      let result = match.result;
      matchHistory.push(
        <tr key={index}>
          <td id={result}>{match.result}</td>
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
              {getOpponentList(match.opponents)}
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
          <a className="dropdown-item" href="#">
            {opponent.username}
          </a>
        </li>
      );
    }
  }
  return opponentList;
}
