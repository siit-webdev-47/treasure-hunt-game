import "./SeeDistanceToTreasure.css";
import PropTypes from "prop-types";
import { energyLevels } from "../Functions/energyLevel";
import { useContext } from "react";
import { AppSettingsContext } from "../../App";
import distanceToTreasure from "../Functions/distanceToTreasure";

export default function SeeDistanceToTreasure({ onActivateSeeDistance, isSeeDistanceAvailable }) {
  const { player, map } = useContext(AppSettingsContext);
  const {message, color} = distanceToTreasure(map);
  let classProperty = (isSeeDistanceAvailable  || player.canSeeDistance) ? "see-distance-available" : "see-distance-unavailable";

  return (
    <div  className={`see-distance ${classProperty}`}>
      {!player.canSeeDistance && (
      <div className ={`${classProperty}`}>
        <p>See aproximative distance until treasure { isSeeDistanceAvailable ? "available!" : "" }</p>
        <p>Energy cost: {energyLevels.maxLowEnergy}</p>
        { isSeeDistanceAvailable && (
        <button onClick={onActivateSeeDistance}>
          Activate See the distance
        </button>)}
      </div>
      )}
    {player.canSeeDistance && (
    <div style={{ color: color }}>
        <p>{message}</p>
    </div>
)}

    </div>
  );
}

SeeDistanceToTreasure.propTypes = {
  onActivateSeeDistance: PropTypes.func,
  isSeeDistanceAvailable: PropTypes.bool,
};
