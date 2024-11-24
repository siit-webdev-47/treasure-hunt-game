import "../../App.css";
import Map from "../Map/Map";
// import Player from "../Player/Player";
import usePlayerMovement from "../Custom-Hooks/usePlayerMovement";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AppSettingsContext } from "../../App";
import fetchQuestion from "../Functions/fetchQuestion";
import question from "../Functions/question";
import QuestionWindow from "../Question/QuestionWindow";

function Game({ onPlayerMove }) {
  const { player, setPlayer, map, setMap } = useContext(AppSettingsContext);
  const { row, col } = map.playerPosition;

  function handlePlayerMove(newRow, newCol) {

    const tileEnergy =
      map.tiles[newRow][newCol].yieldValue -
      map.tiles[newRow][newCol].requiredEnergy;
    const newPlayerEnergy = player.playerEnergy + tileEnergy;

   
    
     // set tiles as visited and clears the energy yeld if the player moved
    if (player.playerEnergy > 0 && newPlayerEnergy > 0 && !map.tiles[row][col].hasTreasure) {
      // clears the visible property for the tiles around the player (2 tiles around)
      for (let i = -2; i <= 2; i++) {
        for (let j = -2; j <= 2; j++) {
          if (((newRow + i) >= 0) && ((newCol + j) >= 0) &&
            ((newRow + i) < map.rows) && ((newCol + j) < map.cols)) {
            map.tiles[newRow + i][newCol + j].visible = false;
          }
        }
      }

      // sets the visible property for the tiles around the player (1 tile around)
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (((newRow + i) >= 0) && ((newCol + j) >= 0) &&
            ((newRow + i) < map.rows) && ((newCol + j) < map.cols)) {
            map.tiles[newRow + i][newCol + j].visible = true;
          }
        }
      }

      setMap((prevMap) => {
        const updatedTiles = [...prevMap.tiles]
        updatedTiles[newRow][newCol] = { ...updatedTiles[newRow][newCol], visited: true, yieldValue: 0 };

        return {
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
    <div className="game-container">
      {/* <QuestionWindow></QuestionWindow> */}
      {/* <Player /> */}
      <Map mapData={map} />
    </div>
  );
}

export default Game;

Game.propTypes = {
  onPlayerMove: PropTypes.func.isRequired,
};