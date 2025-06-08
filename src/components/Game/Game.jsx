import "./Game.css";
import { createContext, useContext, useEffect, useState } from "react";
import { AppSettingsContext } from "../../App";
import Map from "../Map/Map";
import PropTypes from "prop-types";
import AnswerWindow from "../Answer/AnswerWindow";
import { energyLevels } from "../Functions/energyLevel";
import Teleport from "../Teleport/Teleport";
import { updateVisibilityTile } from "../Functions/updateVisibilityTile";

export const ClickContext = createContext();

function Game({ onPlayerMove, onPlayerAnswer }) {
  const { player, setPlayer, map, setMap } = useContext(AppSettingsContext);
  const { row, col } = map.playerPosition;
  const { visited } = map.tiles[row][col];
  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [isTeleportAvailable, setIsTeleportAvailable] = useState(false);
  const [teleportMode, setTeleportMode] = useState(false);
  const [pendingTeleport, setPendingTeleport] = useState(null)

  // player move
  useEffect(() => {
    if (!map.tiles[row][col].visited && player.canMove) {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        canMove: false,
      }));
    }
  }, [row, col]);

  // check teleport available
  useEffect(() => {
    setIsTeleportAvailable(player.playerEnergy >= energyLevels.maxMidEnergy);
  }, [player.playerEnergy]);

  function isValidMove(oldRow, oldCol, newRow, newCol) {
    return (
      (newRow === oldRow && (newCol === oldCol + 1 || newCol === oldCol - 1)) ||
      (newCol === oldCol && (newRow === oldRow + 1 || newRow === oldRow - 1))
    );
  }

  function handlePlayerMove(newRow, newCol) {
    if (teleportMode) {
      setPendingTeleport({ row: newRow, col: newCol });
      return;
    }

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

    // set the yeld sign depending on the correct / incorrect answer
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

      updateVisibilityTile(map, newRow, newCol);

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
    setTeleportMode(true);
    setPendingTeleport(null);
  }

  function confirmTeleport() {
    if (!pendingTeleport) return;

    const { row: teleportRow, col: teleportCol } = pendingTeleport;

    const updatedTiles = updateVisibilityTile(map, teleportRow, teleportCol);

    updatedTiles[teleportRow][teleportCol] = {
      ...updatedTiles[teleportRow][teleportCol],
      yieldValue: 0,
      visited: false,
    };

    setMap((prevMap) => ({
      ...prevMap,
      playerPosition: { row: teleportRow, col: teleportCol },
      tiles: updatedTiles,
    }));

    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      playerEnergy: prevPlayer.playerEnergy - energyLevels.maxMidEnergy,
      canMove: false,
    }));

    setIsTeleportAvailable(false);
    setTeleportMode(false);
    setPendingTeleport(null);
  }

  function cancelTeleport() {
    setTeleportMode(false);
    setPendingTeleport(null);
  }

  // usePlayerMovement(row, col, map.rows, map.cols, handlePlayerMove);

  const handleContinueClick = () => {



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
      // playerResponses: newPlayerResponses,
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
        <Map mapData={map} playerData={player} onTileClick={handlePlayerMove} isValidMove={isValidMove} teleportMode={teleportMode} pendingTeleport={pendingTeleport} />
        {isTeleportAvailable && (
          <Teleport onActivateTeleport={handleActivateTeleport} />
        )}
        {teleportMode && pendingTeleport && (
          <div className="teleport-confirmation" >
            <p>
              You want to teleport to row {pendingTeleport.row},{" "}col {pendingTeleport.col}?
            </p>
            <button className="button-confirm" onClick={confirmTeleport}>Yes</button>
            <button className="button-cancel" onClick={cancelTeleport}>No</button>
          </div>
        )}

        {teleportMode && !pendingTeleport && (
          <div className="teleport-info" >
            <p>Click on the map to select a tile to teleport to.</p>
            <button className="button-cancel" onClick={cancelTeleport}>Cancel Teleport</button>
          </div>
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
