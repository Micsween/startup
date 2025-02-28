import React from "react";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export function Unauthenticated({ username, setUsername, onLogin }) {
  const navigate = useNavigate();
  const [password, setPassword] = React.useState("");

  async function loginUser() {
    localStorage.setItem("username", username);
    console.log(username);
  }
  async function createUser() {
    localStorage.setItem("username", username);
  }

  return (
    <div id="login-form">
      <div>
        <label for="username">Username:</label>
        <input
          value={username.username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="username"
          id="username"
        />
      </div>
      <div>
        <label for="password">Password:</label>
        <input
          placeholder={password}
          type="password"
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div>
        <Button
          variant="danger"
          type="submit"
          onClick={(e) => {
            loginUser();
            navigate("/join", { state: { username: username } });
          }}
          disabled={!username || !password}
        >
          {" "}
          Login{" "}
        </Button>
        <Button
          variant="dark"
          type="submit"
          onClick={(e) => {
            createUser();
          }}
          disabled={!username || !password}
        >
          Create
        </Button>
      </div>
      <a href="">Forgot password?</a>
    </div>
  );
}
