import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./login.css";

export function Login() {
  return (
    <main>
      <div id="login">
        <img
          alt="uno"
          src="https://upload.wikimedia.org/wikipedia/commons/f/f9/UNO_Logo.svg"
          width="250"
        />
        <h1> Welcome to Online Multiplayer Uno!</h1>
        <form method="get" action="join">
          <div id="login-form">
            <div>
              <label for="username">Username:</label>
              <input type="username" id="username" />
            </div>
            <div>
              <label for="password">Password:</label>
              <input type="password" id="password" value="password" />
            </div>
            <div>
              <input className="btn btn-danger" type="submit" value="Login" />
              <input className="btn btn-dark" type="submit" value="Create" />
            </div>
            <a href="">Forgot password?</a>
          </div>
        </form>
      </div>
    </main>
  );
}
