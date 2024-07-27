import "./App.css";
import generateMapTiles from "./components/Functions/generateMapTiles";
import Map from "./components/Map/Map";
import Player from "./components/Player/Player";
import { useState, useEffect, createContext } from "react";
import usePlayerMovement from "./components/Custom-Hooks/usePlayerMovement";

export const PlayerContext = createContext();

function App() {
  const rows = 5;
  const cols = 8;

  const [map, setMap] = useState({
    rows,
    cols,
    tiles: generateMapTiles(rows, cols),
    playerPosition: {
      row: 0,
      col: 0,
    },
  });

  const [player, setPlayer] = useState({
    playerName: "Rodica",
    playerEnergy: 15,
    get playerAvatar() {
      return `https://api.dicebear.com/9.x/micah/svg?seed=${this.playerName}`;
    },
  });

  usePlayerMovement(setMap, rows, cols);

  return (
    <>
      <h1>Treasure Hunt</h1>
      <PlayerContext.Provider value={player}>
        <Player />
        <Map mapData={map} />
      </PlayerContext.Provider>
    </>
  );
}

export default App;

