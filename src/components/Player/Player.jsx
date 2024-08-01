import "./Player.css";
import { useContext} from "react";
import { PlayerContext } from "../../App";
import energyLevel from "../Functions/energyLevel";


function Player() {
  const player = useContext(PlayerContext);
  const {playerName, playerEnergy, playerAvatar} = player;

  return (
    <>
      <h3>{playerName}</h3>
      <img
        src={playerAvatar}
        alt={`${playerName}'s player`}
        className = { `avatar ${energyLevel(playerEnergy)}`}
      />
      <p className={energyLevel(playerEnergy)}>
             Energy Level : {playerEnergy}
      </p>

    </>
  );
}

export default Player;
