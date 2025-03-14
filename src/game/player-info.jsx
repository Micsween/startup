import React from "react";

export function PlayerInfo({ player }) {
  console.log("Player: " + player.username);
  return (
    <div className="player-info main-user">
      <img
        className="player-icon"
        src="https://overwatchitemtracker.com/resources/heroes/all/icons/kittymari.png"
        alt="profile picture"
        width="40"
      />
      <p id="player-name">{player.username}</p>
    </div>
  );
}
export function UserInfo({ user }) {
  console.log("The user:" + user);
  return (
    <div className="player-info main-user">
      <img
        className="player-icon"
        src="https://overwatchitemtracker.com/resources/heroes/all/icons/kittymari.png"
        alt="profile picture"
        width="40"
      />
      <p id="player-name">{user.username}</p>
    </div>
  );
}
