import "./TreasurePosition.css";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AppSettingsContext } from "../../App";
import MiniMap from "./MiniMap";


export default function TreasurePosition({ treasurePosition, onCloseTreasurePosition }) {
  const { player , map} = useContext(AppSettingsContext);

  return (
    <div className="treasure-position">
      <h2>Treasure Position</h2>
      {treasurePosition && (
            <span className="treasure-location"> The treasure was at row {treasurePosition.row}, column {treasurePosition.col}.</span>
          )}
      <br />
       <MiniMap
                mapData={map}
                playerData={player}
              />
      <button onClick={onCloseTreasurePosition}>Close</button>
    </div>
  );
}

TreasurePosition.propTypes = {
  // isVisible: PropTypes.bool,
  onCloseTreasurePosition: PropTypes.func.isRequired,
};
