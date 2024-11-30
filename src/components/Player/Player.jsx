import "./Player.css";
import { useContext } from "react";
import { AppSettingsContext } from "../../App";
import energyLevel from "../Functions/energyLevel";
import Answers from "../Question/Answers";
import randomizeAnsw from "../Functions/randomizeAnsw";


function Player() {
  const { player, map } = useContext(AppSettingsContext);
  const { playerName, playerEnergy, playerAvatar } = player;
  const { row, col } = map.playerPosition;
  const { question, trueAnsw, falseAnsw } = map.tiles[row][col];

  let listAnsw = randomizeAnsw(trueAnsw, falseAnsw);

  return (
    <>
      <h3>{playerName}</h3>
      <img
        src={playerAvatar}
        alt={`${playerName}'s player`}
        className={`avatar ${energyLevel(playerEnergy)}`}
      />
      <p className={energyLevel(playerEnergy)}>Energy Level : {playerEnergy}</p>
      <Answers listAnsw={listAnsw}/>
      
    </>
  );
}

export default Player;
