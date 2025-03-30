import "./GameOver.css";
import PropTypes from "prop-types";
import { useState } from "react";
import GameOverStatistics from "./GameOverStatistics";
import ReviewQuestions from "./ReviewQuestions";

export default function GameOver({ newGame, resetGame, gameOverMsg }) {
  const [showReviewQuestions, setShowReviewQuestions] = useState(false);

  const reviewQuestionsClick = () => {
    setShowReviewQuestions(true);
  };

  const onClose = () => {
    setShowReviewQuestions(false);
  }

  return (
    <div className="game-over-wrapper">
      <div className="game-over-container">
        <p>Game Over!</p>
        <p>{gameOverMsg}</p>
        <GameOverStatistics />
        {showReviewQuestions && (
          <ReviewQuestions
            onClose={onClose}
          />
        )}
        <div className="game-over-buttons">
          <button onClick={resetGame} className="reset round">
            Reset Round
          </button>
          <button onClick={newGame} className="reset game">
            Reset Game
          </button>
          <button onClick={reviewQuestionsClick} className="reset game">
            Review Questions
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
