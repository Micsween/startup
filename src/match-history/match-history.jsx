import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./match-history.css";

/*YOU NEED TO UPATE TIME TAGS TO BE JAVASCRIPT DATE OBJECTS ONCE YOU HAVE YOUR DATABASE*/
/*Also add a feature where you can route to different matchHistory pages depending on the player you select */
export function MatchHistory() {
  const[quote, setQuote] = React.useState("No quote yet");
  const[quoteAuthor, setQuoteAuthor] = React.useState("idk, some dude.");
  const[movie, setMovie] = React.useState("From the best movie ever");

  React.useEffect(() => {
    setQuote("Do or do not. There is no try.");
    setQuoteAuthor("Yoda");
    setMovie("Star Wars");
  }, []);
  return (
    <main>
      <div id="content">
        <h1>Username's Match History</h1>
        <table id="match-history" className="table table-striped ">
          <tbody>
            <tr>
              <th scope="row"> Game 1</th>
              <td id="game-win">Win</td>
              <td>
                {" "}
                <time> 1/25/2025</time>
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
