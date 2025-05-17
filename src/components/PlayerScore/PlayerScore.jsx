import PropTypes from "prop-types";
import { calculateFinalScore } from "../Functions/gameStatistics";

export default function PlayerScore({ player, map }) {
  return (
    <div className="statisticsText">
      <h4>Current Score: {calculateFinalScore(map, player).toFixed(2)}</h4>
          
    </div>
  );
}

PlayerScore.propTypes = {
  player: PropTypes.any,
  map: PropTypes.any,
};
