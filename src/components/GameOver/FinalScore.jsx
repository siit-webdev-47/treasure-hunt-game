import PropTypes from "prop-types";
import { calculateFinalScore } from "../Functions/gameStatistics";

export default function FinalScore({ player, map }) {
  return (
    <div className="statisticsText">
      <h3>Final Score: {calculateFinalScore(map, player).toFixed(2)}</h3>
      <div className="infoWindow">
        <h4>
          This score is calculated based on the questions answered, the time
          spent answering them and the difficulty of the map.
        </h4>
        <h5>
          The score is calculated as follows: (questions score) * (time
          difficulty index) * (map difficulty index)
        </h5>
      </div>
    </div>
  );
}

FinalScore.propTypes = {
  player: PropTypes.any,
  map: PropTypes.any,
};
