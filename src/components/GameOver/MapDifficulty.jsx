import { calculateMapDifficulty } from "../Functions/gameStatistics";
import PropTypes from "prop-types";

export default function MapDifficulty({ map }) {
  return (
    <div className="statisticsText">
      <h3>Map Difficulty Index: {calculateMapDifficulty(map)}%</h3>
      <div className="infoIcon">
        <div>ℹ️</div>
        <div className="infoWindow">
          <h4>
            This index represents the difficulty of the map according to its
            size
          </h4>
          <h5>
            A map with a size of 10 columns and 10 rows is considered normal, with the difficulty index equal to 100%. 
          </h5>
          <h5>
            The maximum difficulty index is 200%, for a map of 20 x 20, and the minimum value of the index is 68%, for a map of 6 x 6 .
          </h5>
        </div>
      </div>
    </div>
  );
}

MapDifficulty.propTypes = {
  map: PropTypes.any.isRequired,
};
