import { useContext } from "react";
import { questionScore } from "../Functions/gameStatistics";
import PropTypes from "prop-types";
import { AppSettingsContext } from "../../App";

export default function QuestionsScore({ player }) {
  const { map } = useContext(AppSettingsContext);
  return (
    <div className="statisticsText">
      <h3>
        Questions Score: {questionScore(player.playerResponses, map)} points
      </h3>
      <div className="infoIcon">
        {"ℹ️"}
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
          <h5>
            If the player finds the treasure, he receives a bonus of 10 points.
          </h5>
        </div>
      </div>
    </div>
  );
}

QuestionsScore.propTypes = {
  player: PropTypes.any.isRequired,
};
