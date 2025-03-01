import { useContext } from "react";
import "./GameOver.css";
import PropTypes from "prop-types";
import { AppSettingsContext } from "../../App";

export default function GameOver({ newGame, resetGame, gameOverMsg }) {
  const { player } = useContext(AppSettingsContext);
  //  Create an array with the values of the playerResponses object
  //  We know the exact order of the values
  let playerResponsesArray = Object.values(player.playerResponses);
  let averageSum =
    (playerResponsesArray[0] + playerResponsesArray[1]) * 0.33 +
    (playerResponsesArray[2] + playerResponsesArray[3]) * 0.66 +
    (playerResponsesArray[4] + playerResponsesArray[5]) * 1;
  let totalSumResponses = playerResponsesArray.reduce(
    (sum, curr) => sum + curr,
    0
  );
  let difficultyIndex = (averageSum / totalSumResponses).toFixed(2);
  let finalScore =
    playerResponsesArray[0] * 2 -
    playerResponsesArray[1] * 3 +
    playerResponsesArray[2] * 4 -
    playerResponsesArray[3] * 2 +
    playerResponsesArray[4] * 6 -
    playerResponsesArray[5] * 1;

  return (
    <div className="game-over-wrapper">
      <div className="game-over-container">
        <p>Game Over!</p>
        <p>{gameOverMsg}</p>
        <div className="game-over-statistics">
          <h3>Difficulty Index: {difficultyIndex * 100}%</h3>
          <h3>Final Score: {finalScore}</h3>
          <br />
          <span>Correct Easy Answers: {playerResponsesArray[0]}</span>
          <span>Wrong Easy Answers: {playerResponsesArray[1]}</span>
          <span>Correct Medium Answers: {playerResponsesArray[2]}</span>
          <span>Wrong Medium Answers: {playerResponsesArray[3]}</span>
          <span>Correct Hard Answers: {playerResponsesArray[4]}</span>
          <span>Wrong Hard Answers: {playerResponsesArray[5]}</span>
        </div>
        <div className="game-over-buttons">
          <button onClick={resetGame} className="reset round">
            Reset Round
          </button>
          <button onClick={newGame} className="reset game">
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
}

GameOver.propTypes = {
  resetGame: PropTypes.func.isRequired,
  newGame: PropTypes.func.isRequired,
  gameOverMsg: PropTypes.string.isRequired,
};
