import PropTypes from "prop-types";
import { timeDifficultyIndex } from "../Functions/gameStatistics";

export default function TimeStatistics({ player }) {
  return (
    <div>
      <div className="statisticsText">
        <h3>
          Time Difficulty Index: { (timeDifficultyIndex(player) *100).toFixed(2) } %
        </h3>
        <div className="infoWindow">
          <h4>
            This index considers the time spent answering questions.
          </h4>
          <h5>
            This index is calculated considering the average time spent answering questions compared to 10 seconds, the time considered normal for answering a question.
          </h5>
        </div>
        </div>
        <h4>
          Total time spent answering questions:{" "}
          {player.timeStats.totalAnsweringTime / 1000} s
        </h4>
        <h4>
          Average time to answer questions:{" "}
          {(player.timeStats.averageAnsweringTime / 1000).toFixed(3)} s
        </h4>
      
    </div>
  );
}

TimeStatistics.propTypes = {
  player: PropTypes.any,
};
