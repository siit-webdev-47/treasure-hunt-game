import "../../App.css";
import Map from "../Map/Map";
import Player from "../Player/Player";
import usePlayerMovement from "../Custom-Hooks/usePlayerMovement";
import Settings from "../Settings/Settings";
import generateMapTiles from "../Functions/generateMapTiles";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { AppSettingsContext } from "../../App";

function Game() {
  const { player, setPlayer, map, setMap } = useContext(AppSettingsContext);

  const [gameStarted, setGameStarted] = useState(false);
  const startGame = (playerName, rows, cols) => {
    const playerConfig = {
      playerName,
      playerEnergy: Math.floor(Math.random() * 50) + 25,
      playerAvatar: `https://api.dicebear.com/9.x/micah/svg?seed=${playerName}`,
    };

    const mapConfig = {
      rows,
      cols,
      tiles: generateMapTiles(rows, cols),
      playerPosition: {
        row: 0,
        col: 0,
      },
    };

    setPlayer(playerConfig);
    setMap(mapConfig);
    setGameStarted(true);
  };
  usePlayerMovement(setMap, map.rows, map.cols, player, setPlayer);

  return (
    <div className="game-container">
      {!gameStarted ? (
        <Settings onStartGame={startGame} />
      ) : (
        <>
          <Player />
          <Map mapData={map} />
        </>
      )}
    </div>
  );
}

export default Game;

Game.propTypes = {
  player: PropTypes.any,
  map: PropTypes.any,
  setMap: PropTypes.any,
  setPlayer: PropTypes.any,
  rows: PropTypes.any,
  cols: PropTypes.any
};
