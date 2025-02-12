import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./join.css";
export function Join() {
  return (
    <main>
      <div id="join">
        <h1>Active Games</h1>
        <table id="active-games" className="table table-striped ">
          <thead>
            <tr>
              <th scope="col">Game Code </th>
              <th scope="col">Host </th>
              <th scope="col">Current Players </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row"> GHWC</th>
              <td>Username</td>
              <td>3</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th scope="row"> SCSZ</th>
              <td>Username</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
        <form method="get" action="lobby">
          <p id="username">User's Username</p>
          <div>
            <input type="text" value="Enter Game Code" maxLength="4" />
            <input
              id="join-button"
              className="btn btn-danger"
              type="submit"
              value="Join Game"
            />
            <input
              id="join-button"
              className="btn btn-dark"
              type="submit"
              value="Create Game"
            />
          </div>
        </form>
      </div>
    </main>
  );
}
