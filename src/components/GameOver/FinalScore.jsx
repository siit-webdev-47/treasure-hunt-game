import PropTypes from "prop-types";
import {  calculateFinalScore,  calculateMapDifficulty,  questionScore,  timeDifficultyIndex, startingBonus, finishBonus} from "../Functions/gameStatistics";

export default function FinalScore({ player, map }) {
  return (
    <div className="statisticsText">
      <h3>Final Score: {calculateFinalScore(map, player).toFixed(2)}</h3>
      <div className="infoIcon">
        {"ℹ️"}
        <div className="infoWindow">
          <h4>
            This score is calculated based on the questions answered, the time
            spent answering them and the difficulty of the map.
          </h4>
          <h5>
            If the player finds the treasure, he receives a bonus of 10 points.
          </h5>
          <h5>
            There is a bonus for starting energy level : 40 points for hard, 20
            points for medium and 0 points for easy.
          </h5>
          <h5>
            The score is calculated as follows: [ (questions score) * (time
            difficulty index) * (map difficulty index) ] + (starting energy
            level bonus) + (treasure bonus) =
          </h5>
          <h5>
            = ( {questionScore(player, map)} *{" "}
            {timeDifficultyIndex(player).toFixed(2)} *{" "}
            {calculateMapDifficulty(map) / 100} ) + ( {startingBonus(player)} +{" "}
            {finishBonus(player, map)} ) =
          </h5>
          <h5>= {calculateFinalScore(map, player).toFixed(2)}</h5>
        </div>
      </div>
    </div>
  );
}

FinalScore.propTypes = {
  player: PropTypes.any,
  map: PropTypes.any,
};
