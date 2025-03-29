import "../../App.css";
import Map from "../Map/Map";
// import usePlayerMovement from "../Custom-Hooks/usePlayerMovement";
import PropTypes from "prop-types";
import { createContext, useContext } from "react";
import { AppSettingsContext } from "../../App";
import AnswerWindow from "../Answer/AnswerWindow";

export const ClickContext = createContext();

function Game({ onPlayerMove, onPlayerAnswer }) {
  const { player, setPlayer, map, setMap } = useContext(AppSettingsContext);
  const { row, col } = map.playerPosition;
  const { visited } = map.tiles[row][col];


  function handlePlayerMove(newRow, newCol, oldRow, oldCol) { 

    const isValidMove = 
      (newRow === oldRow && (newCol === oldCol+1 || newCol === oldCol-1)) || 
      (newCol === oldCol && (newRow === oldRow+1 || newRow === oldRow-1))

    if (!isValidMove) {
       console.log("Miscare invalida!");
       return;
    }

    let correctVar = map.tiles[oldRow][oldCol].correctAnsw ? 1 : -1;
    const tileEnergy = correctVar * map.tiles[oldRow][oldCol].yieldValue;
    const newPlayerEnergy =
      player.playerEnergy -
      map.tiles[newRow][newCol].requiredEnergy +
      tileEnergy;

    // set tiles as visited and clears the energy yeld if the player moved
    if (
      player.playerEnergy > 0 &&
      newPlayerEnergy > 0 &&
      !map.tiles[oldRow][oldCol].hasTreasure
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

  // usePlayerMovement(row, col, map.rows, map.cols, handlePlayerMove);

  const handleContinueClick = () => {

    const responseType = map.tiles[row][col].correctAnsw ? "Correct" : "Wrong";
    const property = `${map.tiles[row][col].difficulty}${responseType}`;
    const newPlayerResponses = {
      ...player.playerResponses,
      [property]: player.playerResponses[property] + 1,
    };
    

      
    let correctVar = map.tiles[row][col].correctAnsw ? 1 : -1;
    const tileEnergy = correctVar * map.tiles[row][col].yieldValue;
    
    const newPlayerEnergy = player.playerEnergy + tileEnergy + player.consecutiveAnswers.bonusEnergy;

    setMap((prevMap) => {
      const updatedTiles = [...prevMap.tiles];
      updatedTiles[row][col] = {
        ...updatedTiles[row][col],
        visited: true,
        yieldValue: 0,
      };
      return {
        ...prevMap,
        tiles: updatedTiles,
      };
    });

    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      playerEnergy: newPlayerEnergy,
      playerResponses: newPlayerResponses,
    }));
    onPlayerAnswer(newPlayerEnergy);
  };

  return (
    <ClickContext.Provider value={handleContinueClick}>
      <div className="game-container">
        {/* <Player /> */}
        {!visited && <AnswerWindow />}
        <Map mapData={map} playerData={player} onTileClick={handlePlayerMove}  />
      </div>
    </ClickContext.Provider>
  );
}

export default Game;

Game.propTypes = {
  onPlayerMove: PropTypes.func.isRequired,
  onPlayerAnswer: PropTypes.func.isRequired,
};
