import "../../App.css";
import Map from "../Map/Map";
import Player from "../Player/Player";
import { createContext, useState } from "react";
import generateMapTiles from "../Functions/generateMapTiles";
import usePlayerMovement from "../Custom-Hooks/usePlayerMovement";
import Settings from "../Settings/Settings";

function Game() {
  const [player, setPlayer] = useState(null);
  const [map, setMap] = useState(null);

  const [gameStarted, setGameStarted] = useState(false);

 
  const startGame = (playerName, rows, cols) => {
    const playerConfig = {
      playerName,
      playerEnergy: 100, 
      get playerAvatar() {
        return `https://api.dicebear.com/9.x/micah/svg?seed=${this.playerName}`;
      },
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

 
  usePlayerMovement(setMap, map?.rows, map?.cols, player);

  return (
    <div className="game-container">
      {!gameStarted ? (
        <Settings onStartGame={startGame} />
      ) : (
        <PlayerContext.Provider value={player}>
          <Player />
          <Map mapData={map} />
        </PlayerContext.Provider>
      )}
    </div>
  );
}

export const PlayerContext = createContext();
export default Game;