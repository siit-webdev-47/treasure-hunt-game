import { useEffect, useState } from "react";
import "./GameOver.css";
// import { PlayerContext } from "../Game/Game";
import PropTypes from "prop-types";
import generateMapTiles from "../Functions/generateMapTiles";

export default function GameOver({ player, map, setPlayer, setMap }) {
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
  
  function handleResetRound(){
    setPlayer({
      playerName: "Rodica",
      playerEnergy: 15,
      get playerAvatar() {
        return `https://api.dicebear.com/9.x/micah/svg?seed=${this.playerName}`;
      }})
      setMap((prevMap) => ({
        ...prevMap,
        tiles: generateMapTiles(prevMap.rows, prevMap.cols), 
        playerPosition: {
          row: 0,
          col: 0,
        },
      }));
  }

  return (
    <>
      {gameOver && (
        <div className="game-over-wrapper">
          <div className="game-over-container">
            <p>Game Over!</p>
            <p>{gameOverMsg}</p>
            <div className="game-over-buttons">
              <button onClick={handleResetRound} className="reset round">Reset Round</button>
              <button className="reset game">Reset Game</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

GameOver.propTypes = {
  player: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  setPlayer: PropTypes.any,
  setMap: PropTypes.any,
};
