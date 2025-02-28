import React from "react";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export function getUser() {
  return localStorage.getItem("username");
}

export function logoutUser() {
  return localStorage.removeItem("username");
}
export function Unauthenticated({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function loginUser() {
    localStorage.setItem("username", username);
    onLogin(username);
  }
  async function createUser() {
    localStorage.setItem("username", username);
    onLogin(username);
  }

  return (
    <div id="login-form">
      <div>
        <label htmlFor="username">Username:</label>
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="username"
          id="username"
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
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
