import "./Player.css";
import { useContext } from "react";
import { AppSettingsContext } from "../../App";
import energyLevel from "../Functions/energyLevel";
import Answers from "../Question/answers";


function Player() {
  const { player } = useContext(AppSettingsContext);
  const { playerName, playerEnergy, playerAvatar } = player;


  return (
    <>
      <h3>{playerName}</h3>
      <img
        src={playerAvatar}
        alt={`${playerName}'s player`}
        className={`avatar ${energyLevel(playerEnergy)}`}
      />
      <p className={energyLevel(playerEnergy)}>Energy Level : {playerEnergy}</p>
      <Answers/>
      
    </>
  );
}

export default Player;
