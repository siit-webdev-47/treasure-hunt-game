import "./GameOver.css";
import PropTypes from "prop-types";
import GameOverStatistics from "./GameOverStatistics";

export default function GameOver({ newGame, resetGame, gameOverMsg }) {
  
  return (
    <div className="game-over-wrapper">
      <div className="game-over-container">
        <p>Game Over!</p>
        <p>{gameOverMsg}</p>
        <GameOverStatistics />
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
