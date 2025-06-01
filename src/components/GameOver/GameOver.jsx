import "./GameOver.css";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import GameOverStatistics from "./GameOverStatistics";
import ReviewQuestions from "./ReviewQuestions";
import { calculateTimeStats } from "../Functions/gameStatistics";
import { AppSettingsContext } from "../../App";
import FinalScore from "./FinalScore";
import HallOfFame from "./HallOfFame";
import generateHallOfFameObj from "../Functions/generateHallOfFameObj";

export default function GameOver({ newGame, resetGame, gameOverMsg }) {
  const [showReviewQuestions, setShowReviewQuestions] = useState(false);
  const [showGameOverStatistics, setShowGameOverStatistics] = useState(false);
  const [showHallOfFame, setShowHallOfFame] = useState(false);
  const { map, player } = useContext(AppSettingsContext);

  calculateTimeStats(player);
  const playerResult = generateHallOfFameObj(player, map);
  console.log("Player Result:", playerResult);
  console.log("Player Date:", playerResult.date.getMonth());

  
  
  const reviewQuestionsClick = () => {
    setShowReviewQuestions(true);
  };

  const onCloseReview = () => {
    setShowReviewQuestions(false);
  };

  const gameOverStatisticsClick = () => {
    setShowGameOverStatistics(true);
  };

  const onCloseStatistics = () => {
    setShowGameOverStatistics(false);
  };

  const hallOfFameClick = () => {
    setShowHallOfFame(true);
  }

  const onCloseHallOfFame = () => {
    setShowHallOfFame(false);
  }

  return (
    <div className="game-over-wrapper">
      <div className="game-over-container">
        <div>
          <p>Game Over!</p>
          <p>{gameOverMsg}</p>
          <FinalScore player={player} map={map} />
        </div>
        {showGameOverStatistics && (
          <GameOverStatistics onCloseStatistics={onCloseStatistics} />
        )}
        {showReviewQuestions && (
          <ReviewQuestions onCloseReview={onCloseReview} />
        )}
        {showHallOfFame && (
          <HallOfFame playerResult={playerResult} onCloseHallOfFame={onCloseHallOfFame} />
        )}
        <div className="game-over-buttons">
          <div className="info-buttons-container">
            <button onClick={reviewQuestionsClick} className="info-buttons">
              Review Questions
            </button>
            <button onClick={gameOverStatisticsClick} className="info-buttons">
              Game Over Statistics
            </button>
            <button onClick={hallOfFameClick} className="info-buttons">
              Hall of fame
            </button>
          </div>
          <div className="reset-buttons-container">
            <button onClick={resetGame} className="reset-buttons round">
              Reset Round
            </button>
            <button onClick={newGame} className="reset-buttons game">
              Reset Game
            </button>
          </div>
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
