import "../../App.css";
import Map from "../Map/Map";
import Player from "../Player/Player";
import usePlayerMovement from "../Custom-Hooks/usePlayerMovement";
import PropTypes from "prop-types";
import { createContext, useContext } from "react";
import { AppSettingsContext } from "../../App";
import AnswerWindow from "../Answer/AnswerWindow";

export const ClickContext = createContext();

function Game({ onPlayerMove , onPlayerAnswer } ) {
  const { player, setPlayer, map, setMap } = useContext(AppSettingsContext);
  const { row, col } = map.playerPosition;
  const { visited } = map.tiles[row][col];

  function handlePlayerMove(newRow, newCol, oldRow, oldCol) {

    let correctVar = map.tiles[oldRow][oldCol].correctAnsw ? 1 : -1;
    const tileEnergy =
      correctVar * map.tiles[row][col].yieldValue ;
    const newPlayerEnergy = player.playerEnergy -
    map.tiles[newRow][newCol].requiredEnergy + tileEnergy;

    // set tiles as visited and clears the energy yeld if the player moved
    if (
      player.playerEnergy > 0 &&
      newPlayerEnergy > 0 &&
      !map.tiles[row][col].hasTreasure
    ) {
      // clears the visible property for the tiles around the player (2 tiles around)
      for (let i = -2; i <= 2; i++) {
        for (let j = -2; j <= 2; j++) {
          if (
            newRow + i >= 0 &&
            newCol + j >= 0 &&
            newRow + i < map.rows &&
            newCol + j < map.cols
          ) {
            map.tiles[newRow + i][newCol + j].visible = false;
          }
        }
      }

      // sets the visible property for the tiles around the player (1 tile around)
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (
            newRow + i >= 0 &&
            newCol + j >= 0 &&
            newRow + i < map.rows &&
            newCol + j < map.cols
          ) {
            map.tiles[newRow + i][newCol + j].visible = true;
          }
        }
      }

      setMap((prevMap) => {
        const updatedTiles = [...prevMap.tiles];
        updatedTiles[oldRow][oldCol] = {
          ...updatedTiles[oldRow][oldCol],
          visited: true,
          yieldValue: 0,
        };

        return {
          ...prevMap,
          playerPosition: {
            row: newRow,
            col: newCol,
          },
          tiles: updatedTiles,
        };
      });
    }

    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      playerEnergy: newPlayerEnergy,
    }));

    onPlayerMove(newPlayerEnergy, { row: newRow, col: newCol });
  }

  usePlayerMovement(row, col, map.rows, map.cols, handlePlayerMove);

  const handleContinueClick = () => {
    let correctVar = map.tiles[row][col].correctAnsw ? 1 : -1;
    const tileEnergy =
      correctVar * map.tiles[row][col].yieldValue ;

    const newPlayerEnergy = player.playerEnergy + tileEnergy
    map.tiles[row][col].yieldValue = 0 ;
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        playerEnergy: newPlayerEnergy,
      }));
      onPlayerAnswer(newPlayerEnergy);
  };

  return (
    <ClickContext.Provider value={handleContinueClick}>
      <div className="game-container">
        <Player />
        {!visited && <AnswerWindow />}
        <Map mapData={map} />
      </div>
    </ClickContext.Provider>
  );
}

export default Game;

Game.propTypes = {
  onPlayerMove: PropTypes.func.isRequired,
  onPlayerAnswer: PropTypes.func.isRequired,
};
