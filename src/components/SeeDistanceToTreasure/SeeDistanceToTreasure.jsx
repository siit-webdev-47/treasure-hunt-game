import "./SeeDistanceToTreasure.css";
import PropTypes from "prop-types";
import { energyLevels } from "../Functions/energyLevel";
import { useContext } from "react";
import { AppSettingsContext } from "../../App";
import distanceToTreasure from "../Functions/distanceToTreasure";

export default function SeeDistanceToTreasure({ onActivateSeeDistance }) {
  const { player, map } = useContext(AppSettingsContext);
  const {message, color} = distanceToTreasure(map);
  return (
    <div  className="see-distance">
      {!player.canSeeDistance && (
      <div>
        <p>See aproximative distance until treasure available!</p>
        <p>Energy cost: {energyLevels.maxLowEnergy}</p>
        <button onClick={onActivateSeeDistance}>
          Activate See the distance
        </button>
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
};
