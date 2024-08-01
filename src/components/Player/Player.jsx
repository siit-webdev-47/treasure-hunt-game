import "./Player.css";
import { PlayerContext } from "../Game/Game";
import { useContext } from "react";
import energyLevel from "../Functions/energyLevel";

function Player() {
  const player = useContext(PlayerContext);
  const { playerName, playerEnergy, playerAvatar } = player;

  return (
    <>
      <h3>{playerName}</h3>
      <img
        src={playerAvatar}
        alt={`${playerName}'s player`}
        className={`avatar ${energyLevel(playerEnergy)}`}
      />
      <p className={energyLevel(playerEnergy)}>
        Energy Level : {playerEnergy}
      </p>

    </>
  );
}

export default Player;
