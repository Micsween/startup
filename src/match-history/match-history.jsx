import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./match-history.css";

/*YOU NEED TO UPATE TIME TAGS TO BE JAVASCRIPT DATE OBJECTS ONCE YOU HAVE YOUR DATABASE*/
/*Also add a feature where you can route to different matchHistory pages depending on the player you select */

function getOpponentList(opponents) {
  const opponentList = [];
  if (opponents != null) {
    for (const [index, opponentName] of opponents.entries()) {
      opponentList.push(
        <li key={opponentName}>
          <a className="dropdown-item" href="#" >
            {opponentName}
          </a>
        </li>
      );
    }
  }
  return opponentList;
}

export function MatchHistory() {
  const [quote, setQuote] = React.useState("No quote yet");
  const [quoteAuthor, setQuoteAuthor] = React.useState("idk, some dude.");
  const [movie, setMovie] = React.useState("From the best movie ever");

  React.useEffect(() => {
    setQuote("Do or do not. There is no try.");
    setQuoteAuthor("Yoda");
    setMovie("Star Wars");
  }, []);

  const [username, setUsername] = React.useState("Oblivion Phoenix");
  React.useEffect(() => {
    setUsername("Autobotkilla");
  }, []);
  //should make a match object to make this easier
  //matches is an array of match objects
  const [matches, setMatches] = React.useState([
    {
      gameName: "The best Game",
      result: "Win",
      date: "2/19/2025",
      oponents: [
        "Player2's username",
        "Player3's username",
        "Player4's username",
      ],
    },
  ]);
  //const listItems = items.map((item) => 
  //<li key={item.id}>{item.text}</li>
//);
  //update this later to update the values of gameName, result, etc.
  React.useEffect(() => {
    //a match has: a game name
    //a result (win or loss)
    //a date
    //a list of opponents
    //{gameName: "The best Game", result: "Win", date : new Date(2/19/25), oponents: ["Player2's username", "Player3's username", "Player4's username"]}
  }, []);
  //replace USERNAMe with the actual username

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
            {/* I got rid of a div here so be careful*/}
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
        </tbody>
      );
    }
  } else {
  }

  return (
    <main>
      <div id="content">
        <h1>{username}'s Match History</h1>
        <table id="match-history" className="table table-striped ">

            {matchHistory}
    
          <tbody>
            <tr>
              <th scope="row"> Game 2</th>
              <td id="game-loss">Loss</td>
              <td>
                {" "}
                <time> 1/26/2025</time>
              </td>
              <td>
                <div>
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
                    <li>
                      <a className="dropdown-item" href="#">
                        Player2's username
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Player3's username
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Player4's username
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th scope="row"> Game 3</th>
              <td id="game-win">Win</td>
              <td>
                {" "}
                <time> 1/28/2025</time>
              </td>
              <td>
                <div>
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
                    <li>
                      <a className="dropdown-item" href="#">
                        Player2's username
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Player3's username
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Player4's username
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th scope="row"> Game 5</th>
              <td id="game-loss">Loss</td>
              <td>
                {" "}
                <time> 1/30/2025</time>
              </td>
              <td>
                <div>
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
                    <li>
                      <a className="dropdown-item" href="#">
                        Player2's username
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Player3's username
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Player4's username
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
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
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
        crossOrigin="anonymous"
      ></script>
    </main>
  );
}
