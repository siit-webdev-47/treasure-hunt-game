import  { finalScore } from "../Functions/gameStatistics";
import PropTypes from "prop-types";

export default function QuestionsScore({ player }) {

  return (
<div className="statisticsText">
        <h3>Questions Score: {finalScore(player.playerResponses)} points</h3>
        <div className="infoWindow">
          <h4>
            This score represents the total points accumulated by the player.
          </h4>
          <h5>
            For each correct answer, the player receives 2 points for easy, 4
            points for medium and 6 points for hard questions.
          </h5>
          <h5>
            For each wrong answer, the player loses 3 points for easy, 2 points
            for medium and 1 point for hard questions.
          </h5>
        </div>
      </div>
  );
}

QuestionsScore.propTypes = {
  player: PropTypes.func.isRequired,
};
