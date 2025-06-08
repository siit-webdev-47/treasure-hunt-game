import "./Teleport.css";
import PropTypes from "prop-types";
import { energyLevels } from "../Functions/energyLevel";


export default function Teleport({ onActivateTeleport }) {

  return (
    <div  className="teleport-available" >
      <p>Teleport available!</p>
      <p>Energy cost: {energyLevels.maxMidEnergy}</p>
      <button onClick={onActivateTeleport}>Activate Teleport</button>
    </div>
  );
}

Teleport.propTypes = {
  onActivateTeleport: PropTypes.func.isRequired,
};
