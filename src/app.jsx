import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Game } from "./game/game";
import { Join } from "./join/join";
import { Lobby } from "./lobby/lobby";
import { Login } from "./login/login";
import { MatchHistory } from "./match-history/match-history";
import { logoutUser, getUser } from "./client.js";
import Button from "react-bootstrap/Button";
// import { socket } from "./socket";

export default function App() {
  //var socket = io();
  // const [isConnected, setIsConnected] = React.useState(socket.connected);

  const [username, setUsername] = React.useState("");
  function onLogin(username) {
    setUsername(username);
  }
  function onLogout() {
    logoutUser();
    setUsername("");
    location = "/";
  }
  React.useEffect(() => {
    // function onConnect() {
    //   setIsConnected(true);
    // }
    // function onDisconnect() {
    //   setIsConnected(false);
    // }

    // socket.on("connect", onConnect);
    // socket.on("disconnect", onDisconnect);

    getUser().then((user) => {
      setUsername(user.username);
    });

    return () => {
      // socket.off("connect", onConnect);
      // socket.off("disconnect", onDisconnect);
      // socket.off("message", (message) => {
      //   console.log(message);
      // });
    };
  }, []);

  return (
    <BrowserRouter>
      <div>
        <header>
          <nav className="navbar navbar-expand-lg">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div className="navbar-nav me-auto mb-2 mb-lg-0">
                {!username && (
                  <NavLink className="nav-link" to="/">
                    Login
                  </NavLink>
                )}
                {username && (
                  <>
                    <NavLink className="nav-link" to="match-history">
                      Match History
                    </NavLink>
                    <NavLink className="nav-link" to="join">
                      Join Game
                    </NavLink>
                    <Button variant="danger" onClick={onLogout}>
                      Logout
                    </Button>
                  </>
                )}
              </div>
            </div>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Login onLogin={onLogin} />} exact />
          <Route path="/join" element={<Join username={username} />} exact />
          <Route
            path="/match-history"
            element={<MatchHistory username={username} />}
          />
          <Route path="/lobby" element={<Join username={username} />} />
          <Route path="/lobby/:gameCode" element={<Lobby />} />
          <Route path="/game/:gameCode" element={<Game />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <footer
          id="footer"
          className="d-flex flex-wrap justify-content-between align-items-center p-1 px-md-4 mb-2 bg-light border-top"
        >
          <span>Michelle Sweeney is awesome.</span>
          <a
            className="nav-link"
            href="https://github.com/Micsween/startup.git"
          >
            My GitHub!
          </a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <main className="container-fluid bg-secondary text-center">
      {" "}
      There's nothing here. :O{" "}
    </main>
  );
}
