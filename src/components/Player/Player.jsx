import { useState } from "react";
import "./Player.css";


function Player(props) {
  const {playerName, playerEnergy, playerAvatar} = props.playerData;

  const energyColor = (energy) => {
    if (energy > 50) {
      return "green";
    } else {
      if (energy >= 25 && energy <= 50) {
        return "yellow";
      } else {
        return "red";
      }
    }
  };

  return (
    <>
      <h3>{playerName}</h3>
      <img
        src={playerAvatar}
        alt={`${playerName}'s player`}
        className="avatar"
      />
      <p className="energy" style={{ color: energyColor(playerEnergy) }}>
        Energy Level : {playerEnergy}
      </p>
    </>
  );
}

export default Player;
