import "../../App.css";
import Map from "../Map/Map";
import Player from "../Player/Player";
import usePlayerMovement from "../Custom-Hooks/usePlayerMovement";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AppSettingsContext } from "../../App";

function Game({ onPlayerMove }) {
  const { player, setPlayer, map, setMap, gamePhase } = useContext(AppSettingsContext);
  const { row, col } = map.playerPosition;

  function handlePlayerMove(newRow, newCol) {
    const tileEnergy =
      map.tiles[newRow][newCol].yieldValue -
      map.tiles[newRow][newCol].requiredEnergy;
    const newPlayerEnergy = player.playerEnergy + tileEnergy;


    if (player.playerEnergy > 0 && newPlayerEnergy > 0 && !map.tiles[row][col].hasTreasure) {      
       setMap((prevMap) => {   
        const updatedTiles = [...prevMap.tiles] 
        
        if (updatedTiles[row] !== updatedTiles[newRow]) {
          console.log('ROW & COL are different');
          
          updatedTiles[row] = [...updatedTiles[row]]
          updatedTiles[newRow] = [...updatedTiles[newRow]]
        }

        updatedTiles[row][col] = { ...updatedTiles[row][col], visited: true, yieldValue: 0 };
        updatedTiles[newRow][newCol] = { ...updatedTiles[newRow][newCol], visited: true, yieldValue: 0 };

          return{
            ...prevMap,
            playerPosition: {
              row: newRow,
              col: newCol,
            },
            tiles: updatedTiles,
          }  
        })
    }

    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      playerEnergy: newPlayerEnergy,
    }));

    onPlayerMove(newPlayerEnergy, { row: newRow, col: newCol });
  }

  usePlayerMovement(row, col, map.rows, map.cols, handlePlayerMove);

  return (
    <>
      {gamePhase === "ONGOING" && (
        <div className="game-container">
          <Player />
          <Map mapData={map} />
        </div>
      )}
    </>
  );
}

export default Game;

Game.propTypes = {
  onPlayerMove: PropTypes.func.isRequired,
};


// const updatedTiles = prevMap.tiles.map((rowTiles, rowIndex) =>
//   rowTiles.map((tile, colIndex) => {
//     if (
//       (rowIndex === row && colIndex === col) ||  (rowIndex === newRow && colIndex === newCol)
//     ) {
//       return { ...tile, visited: true, yieldValue: 0};
//     }
//     return tile;
//   })
// );
