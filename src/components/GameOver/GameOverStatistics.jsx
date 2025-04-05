import "./GameOverStatistics.css";
import { useContext } from "react";
import PropTypes from "prop-types";
import { AppSettingsContext } from "../../App";
import difficultyIndex, { finalScore } from "../Functions/gameStatistics";

export default function GameOverStatistics({ onCloseStatistics }) {
  const { player } = useContext(AppSettingsContext);

  return (
    <div className="game-over-statistics">
      <h2>Game Over Statistics</h2>
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

      <div className="statisticsText">
        <h3>Final Score: {finalScore(player.playerResponses)} points</h3>
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

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Easy</th>
            <th>Medium</th>
            <th>Hard</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Correct</td>
            <td>{player.playerResponses.easyCorrect}</td>
            <td>{player.playerResponses.mediumCorrect}</td>
            <td>{player.playerResponses.hardCorrect}</td>
            <td>
              {player.playerResponses.easyCorrect +
                player.playerResponses.mediumCorrect +
                player.playerResponses.hardCorrect}
            </td>
          </tr>
          <tr>
            <td>Wrong</td>
            <td>{player.playerResponses.easyWrong}</td>
            <td>{player.playerResponses.mediumWrong}</td>
            <td>{player.playerResponses.hardWrong}</td>
            <td>
              {player.playerResponses.easyWrong +
                player.playerResponses.mediumWrong +
                player.playerResponses.hardWrong}
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <button onClick={onCloseStatistics}>Close</button>
    </div>
  );
}
GameOverStatistics.propTypes = {
  onCloseStatistics: PropTypes.func.isRequired,
};
