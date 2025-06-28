import "./IncreaseViewrange.css";
import PropTypes from "prop-types";
import { energyLevels } from "../Functions/energyLevel";
import { useContext } from "react";
import { AppSettingsContext } from "../../App";
import distanceToTreasure from "../Functions/distanceToTreasure";

export default function IncreaseViewRange({ onActivateSeeDistance, isIncreaseViewRangeAvailable }) {
  const { player, map } = useContext(AppSettingsContext);
  const {message, color} = distanceToTreasure(map);
  let classProperty = (isIncreaseViewRangeAvailable  || player.canIncreaseViewRange) ? "increase-viewrange-available" : "increase-viewrange-unavailable";

  return (
    <div  className={`see-distance ${classProperty}`}>
      {!player.canIncreaseViewRange && (
      <div className ={`${classProperty}`}>
        <p>Extend view range with one extra tile { isIncreaseViewRangeAvailable ? "available!" : "" }</p>
        <p>Energy cost: {energyLevels.maxLowEnergy}</p>
        { isIncreaseViewRangeAvailable && (
        <button onClick={onActivateSeeDistance}>
          Activate Increase View Range
        </button>)}
      </div>
      )}
    {player.canIncreaseViewRange && (
    <div style={{ color: color }}>
        <p>{message}</p>
    </div>
)}

    </div>
  );
}

IncreaseViewRange.propTypes = {
  onActivateSeeDistance: PropTypes.func,
  isIncreaseViewRangeAvailable: PropTypes.bool,
};
