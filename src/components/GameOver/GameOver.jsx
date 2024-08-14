import { useEffect, useState } from "react";
import "./GameOver.css";
// import { PlayerContext } from "../Game/Game";
import PropTypes from "prop-types";

export default function GameOver({ player, map }) {
  // const player = useContext(PlayerContext);
  // console.log({player});
  // console.log({map});
  
  const [gameOver, setGameOver] = useState(false);
  const [gameOverMsg, setGameOverMsg] = useState("");
  
  const { row, col } = map.playerPosition;
  
  console.log(map.playerPosition);
  console.log(`treasure is found: ${map.tiles[row][col].hasTreasure}`);

  useEffect(() => {
    console.log('checking game over conditions');
    
    if (player.playerEnergy <= 0) {
      // console.log(player.playerEnergy)  
      console.log("energy is 0 or less. triggering game over.");
      setGameOver(true);
      setGameOverMsg("Well, you ran out of energy and you're dead!🪦");
      return;
    }
    if (map.tiles[row][col].hasTreasure) {
      // console.log(map.tiles[row][col].hasTreasure);
      console.log("treasure found. triggering game over.");

      setGameOver(true);
      setGameOverMsg("Yey, you found the treasure!🏆💰");
      return;
    }

    console.log('no game over condition is met, resetting game');
    
    setGameOver(false)
  }, [player.playerEnergy, col, row, map.tiles]);

  console.log("GameOver:", { gameOver, gameOverMsg });
  

  return (
    <>
      {gameOver && (
        <div className="game-over-container">
          <p>Game Over!</p>
          <p>{gameOverMsg}</p>
          <div className="game-over-buttons">
            <button className="reset round">Reset Round</button>
            <button className="reset game">Reset Game</button>
          </div>
        </div>
      )}
    </>
  );
}

GameOver.propTypes = {
  player: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
};
