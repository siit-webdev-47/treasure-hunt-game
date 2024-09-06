import { useContext, useEffect, useState } from "react";
import "./GameOver.css";
import PropTypes from "prop-types";
import { AppSettingsContext } from "../../App";

export default function GameOver({newGame, resetGame, gameOverMsg}) {
  const { gamePhase } = useContext(AppSettingsContext)
  
  return (
    <>
      {gamePhase === 'GAME_OVER' && (
        <div className="game-over-wrapper">
          <div className="game-over-container">
            <p>Game Over!</p>
            <p>{gameOverMsg}</p>
            <div className="game-over-buttons">
              <button onClick={resetGame}  className="reset round">Reset Round</button>
              <button onClick={newGame} className="reset game">Reset Game</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

GameOver.propTypes = {
  resetGame: PropTypes.func.isRequired,
  newGame: PropTypes.func.isRequired,
  gameOverMsg: PropTypes.string.isRequired,
};