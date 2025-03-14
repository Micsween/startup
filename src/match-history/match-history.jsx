import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./match-history.css";

/*YOU NEED TO UPATE TIME TAGS TO BE JAVASCRIPT DATE OBJECTS ONCE YOU HAVE YOUR DATABASE*/
/*Also add a feature where you can route to different matchHistory pages depending on the player you select */

// const opponentList = opponents.map((opponent) =>
//   <li key={opponent.userID}>{opponent.username}</li>
// );
async function getQuote() {
  let url = "https://zenquotes.io/api";
  let response = await fetch(url, {
    mode: "no-cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response.json());
  return response;
}
export function MatchHistory({ username }) {
  const [quote, setQuote] = React.useState("No quote yet");
  const [quoteAuthor, setQuoteAuthor] = React.useState("idk, some dude.");
  const [movie, setMovie] = React.useState("From the best movie ever");
  //turn this into a fetch request for star wars quotes
  //const response = await fetch(url, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ username: username, password: password }),
  // });
  React.useEffect(() => {
    getQuote()
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.q);
        setQuoteAuthor(data.a);
      });
    // setQuote("Do or do not. There is no try.");
    // setQuoteAuthor("Yoda");
    // setMovie("Star Wars");
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
      matchHistory.push(
        <tr key={index}>
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
