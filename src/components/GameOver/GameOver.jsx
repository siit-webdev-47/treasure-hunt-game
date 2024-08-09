import { useContext, useEffect, useState } from "react";
import "./GameOver.css";
import { PlayerContext } from "../Game/Game";
import PropTypes from "prop-types";

export default function GameOver({ map }) {
  const player = useContext(PlayerContext);
  // console.log(map.playerPosition);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverMsg, setGameOverMsg] = useState("");

  const { row, col } = map.playerPosition;

  //    console.log(player.playerEnergy);

  useEffect(() => {
    if (player.playerEnergy <= 0) {
      setGameOver(true);
      setGameOverMsg("Sorry!You're dead!");
    }
    if (map.tiles[row][col].hasTreasure) {
      setGameOver(true);
      setGameOverMsg("Yey!You won!🏆");
    }
  }, [player.playerEnergy, col, row, map.tiles]);

  return (
    <>
      {gameOver && (
        <div className="game-over-container">
          <p>Game Over!</p>
          <p>{gameOverMsg}</p>
          <button>Reset Round</button>
          <button>Reset Game</button>
        </div>
      )}
    </>
  );
}

GameOver.propTypes = {
  map: PropTypes.any,
};
