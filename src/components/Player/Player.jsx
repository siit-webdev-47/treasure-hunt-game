import { useContext} from "react";
import "./Player.css";
import { PlayerContext } from "../../App";


function Player() {
  // const {playerName, playerEnergy, playerAvatar} = props.playerData;
  const player = useContext(PlayerContext);
  const {playerName, playerEnergy, playerAvatar} = player;

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
