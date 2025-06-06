import PropTypes from "prop-types";
import { energyLevels } from "../Functions/energyLevel";


export default function Teleport({ onActivateTeleport }) {
    console.log("Teleport");
    console.log("Required energy:", energyLevels.maxMidEnergy);
  return (
    <div >
      <p>Teleport available!</p>
      <p>Energy cost: {energyLevels.maxMidEnergy}</p>
      <button onClick={onActivateTeleport}>Activate Teleport</button>
    </div>
  );
}

Teleport.propTypes = {
  onActivateTeleport: PropTypes.func.isRequired,
};
