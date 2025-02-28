import React from "react";

export function PlayerInfo() {
  return (
    <div className="player-info main-user">
      <img
        className="player-icon"
        src="https://overwatchitemtracker.com/resources/heroes/all/icons/kittymari.png"
        alt="profile picture"
        width="40"
      />
      <p id="player-name">USERNAME</p>
    </div>
  );
}
