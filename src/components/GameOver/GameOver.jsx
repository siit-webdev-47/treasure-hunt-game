import { useContext, useEffect, useState } from "react";
import "./GameOver.css";
import PropTypes from "prop-types";
import { AppSettingsContext } from "../../App";

export default function GameOver({setGamePhase, newGame, resetGame}) {
  const { player, map, gamePhase } = useContext(AppSettingsContext);

  const [gameOverMsg, setGameOverMsg] = useState("");
  
  const { row, col } = map.playerPosition;
  
  useEffect(() => {
    if (player.playerEnergy <= 0) {
      setGamePhase('gameOver');
      setGameOverMsg("Well, you ran out of energy and you're dead!🪦");
      return;
    }
    if (map.tiles[row][col].hasTreasure) {
      setGamePhase('gameOver');
      setGameOverMsg("Yey, you found the treasure!🏆💰");
      return;
    }

  }, [player.playerEnergy, col, row, map.tiles, setGamePhase]);

  
  function handleResetRound(){
    resetGame();
  }

  function handleResetGame(){
    newGame();
  }

  return (
    <>
      {gamePhase === 'gameOver' && (
        <div className="game-over-wrapper">
          <div className="game-over-container">
            <p>Game Over!</p>
            <p>{gameOverMsg}</p>
            <div className="game-over-buttons">
              <button onClick={handleResetRound}  className="reset round">Reset Round</button>
              <button onClick={handleResetGame} className="reset game">Reset Game</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

GameOver.propTypes = {
  setGamePhase: PropTypes.object.isRequired,
  newGame: PropTypes.object.isRequired,
  resetGame: PropTypes.any,
};
