import "./Game.css";
import { createContext, useContext, useEffect, useState } from "react";
import { AppSettingsContext } from "../../App";
import Map from "../Map/Map";
import PropTypes from "prop-types";
import AnswerWindow from "../Answer/AnswerWindow";
import { energyLevels } from "../Functions/energyLevel";
import Teleport from "../Teleport/Teleport";

export const ClickContext = createContext();

function Game({ onPlayerMove, onPlayerAnswer }) {
  const { player, setPlayer, map, setMap } = useContext(AppSettingsContext);
  const { row, col } = map.playerPosition;
  const { visited } = map.tiles[row][col];
  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorVisible, setIsErrorVisible] = useState(false);

    const [isTeleportAvailable, setIsTeleportAvailable] = useState(false);

   useEffect(() => {
    if (!map.tiles[row][col].visited && player.canMove) {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        canMove: false,
      }));
    }
  }, [row, col]);

    useEffect(() => {
    if (player.playerEnergy >= energyLevels.maxMidEnergy) {
      setIsTeleportAvailable(true);
      console.log("Teleport available!");
    } else {
      setIsTeleportAvailable(false);
    }
  }, [player.playerEnergy]);

  function isValidMove(oldRow, oldCol, newRow, newCol) {
    return (
      (newRow === oldRow && (newCol === oldCol + 1 || newCol === oldCol - 1)) ||
      (newCol === oldCol && (newRow === oldRow + 1 || newRow === oldRow - 1))
    );
  }

  function handlePlayerMove(newRow, newCol) {
    const oldRow = map.playerPosition.row;
    const oldCol = map.playerPosition.col;

    if (!player.canMove) {
      setErrorMessage("You can't move the player .");
      setIsErrorVisible(true);
      return;
    }

    if (!isValidMove(oldRow, oldCol, newRow, newCol)) {
      setErrorMessage("Invalid move!");
      setIsErrorVisible(true);
      return;
    }

    setErrorMessage("");
    setIsErrorVisible(false);



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
          visited: true,
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
      canMove: true,
    }));

    onPlayerMove(newPlayerEnergy, { row: newRow, col: newCol });
  }

   function handleActivateTeleport() {
    console.log("Teleport activated");

    const teleportRow = 0;
    const teleportCol = 0;

    const updatedTiles = [...map.tiles];
    updatedTiles[teleportRow][teleportCol] = {
      ...updatedTiles[teleportRow][teleportCol],
      yieldValue: 0,
      visited: true,
    };

    setMap((prevMap) => ({
      ...prevMap,
      playerPosition: { row: teleportRow, col: teleportCol },
      tiles: updatedTiles,
    }));

    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      playerEnergy: prevPlayer.playerEnergy - energyLevels.maxMidEnergy,
    }));

    setIsTeleportAvailable(false);

    console.log("Teleport done");
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
      canMove: true,
    }));
    onPlayerAnswer(newPlayerEnergy);
  };

  return (
    <ClickContext.Provider value={handleContinueClick}>
      <div className="game-container">
        {!visited && <AnswerWindow />}
        {isErrorVisible && (
          <div className="error-popup">
            <div className="error-content">
              <p className="error-message">
                {errorMessage}
              </p>
              <button className="close-button" onClick={() => setIsErrorVisible(false)}>
                Close
              </button>
            </div>
          </div>
        )}
        <Map mapData={map} playerData={player} onTileClick={handlePlayerMove} isValidMove={isValidMove} />
        {isTeleportAvailable && (
          <Teleport onActivateTeleport={handleActivateTeleport} />
        )}
      </div>
    </ClickContext.Provider>
  );
}

export default Game;

Game.propTypes = {
  onPlayerMove: PropTypes.func.isRequired,
  onPlayerAnswer: PropTypes.func.isRequired,
};
