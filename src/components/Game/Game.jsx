import "../../App.css";
import Map from "../Map/Map";
import Player from "../Player/Player";
import usePlayerMovement from "../Custom-Hooks/usePlayerMovement";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AppSettingsContext } from "../../App";

function Game({ onPlayerMove }) {
  const { player, setPlayer, map, setMap } = useContext(AppSettingsContext);
  const { row, col } = map.playerPosition;

  function handlePlayerMove(newRow, newCol) {

    const tileEnergy =
      map.tiles[newRow][newCol].yieldValue -
      map.tiles[newRow][newCol].requiredEnergy;
    const newPlayerEnergy = player.playerEnergy + tileEnergy;


    // In case we want to let only the cells around the player to be visible,
    // like light around a torch

    for (let i = -2; i <= 2; i++) {
      for (let j = -2; j <= 2; j++) {
        if (((newRow + i) >= 0) && ((newCol + j) >= 0) &&
          ((newRow + i) < map.rows) && ((newCol + j) < map.cols)) {
          map.tiles[newRow + i][newCol + j].visible = false;
        }
      }
    }

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (((newRow + i) >= 0) && ((newCol + j) >= 0) &&
          ((newRow + i) < map.rows) && ((newCol + j) < map.cols)) {
          map.tiles[newRow + i][newCol + j].visible = true;
        }
      }
    }

    if (player.playerEnergy > 0 && newPlayerEnergy > 0 && !map.tiles[row][col].hasTreasure) {
      setMap((prevMap) => {
        const updatedTiles = prevMap.tiles.map((rowTiles, rowIndex) =>
          rowTiles.map((tile, colIndex) => {
            if (
              (rowIndex === row && colIndex === col) || (rowIndex === newRow && colIndex === newCol)
            ) {
              return { ...tile, visited: true, yieldValue: 0 };
            }
            return tile;
          })
        );
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
      <Player />
      <Map mapData={map} />
    </div>
  );
}

export default Game;

Game.propTypes = {
  onPlayerMove: PropTypes.func.isRequired,
};
