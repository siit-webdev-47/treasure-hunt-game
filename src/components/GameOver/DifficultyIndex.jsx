import difficultyIndex from "../Functions/gameStatistics";
import PropTypes from "prop-types";

export default function DifficultyIndex({ player }) {
  // const { player } = useContext(AppSettingsContext);

  return (
    <div className="statisticsText">
      <h3>Difficulty Index: {difficultyIndex(player.playerResponses)}%</h3>
      <div className="infoWindow">
        <h4>
          This index represents the average difficulty of the questions
          answered. It is calculated as a weighted average.
        </h4>
        <h5>
          Each easy question has a weight of 33%, the medium ones have 66% and
          the hard questions have 100%.
        </h5>
      </div>
    </div>
  );
}

DifficultyIndex.propTypes = {
  player: PropTypes.func.isRequired,
};
