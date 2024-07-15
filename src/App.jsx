import "./App.css";
import Map from "./components/Map/Map";
import Player from "./components/Player/Player";
import { createContext, useState, useEffect } from "react";

export const MapContext = createContext();

function generateMapTiles(rows, cols) {
  const tiles = [];
  for (let i = 0; i < rows; i++) {
    tiles[i] = [];
    for (let j = 0; j < cols; j++) {
      tiles[i][j] = {
        row: i,
        col: j,
        visited: false,
        requiredEnergy: Math.floor(Math.random() * 5 + 1),
        yieldValue: Math.floor(Math.random() * 30 - 15),
      };
    }
  }

  return tiles;
}

function App() {
  const rows = 5;
  const cols = 8;

  const [map, setMap] = useState({
    rows,
    cols,
    tiles: generateMapTiles(rows, cols),
  });

  useEffect(() => {
    const tileUpdate = setTimeout(() => {
      map.tiles[0][3].visited = true;
      setMap({ ...map, tiles: map.tiles });
    }, 3000);

    return () => clearTimeout(tileUpdate);
  }, []);
  /* removed the "map" variable from useEffect dependency as I saw that the console.log from Map.jsx
   logs the tile array/matrix every other 3 secs (so each time setTimeout runs) */

  return (
    <>
      <Player />
      <MapContext.Provider value={map}>
        <h1>Treasure Hunt</h1>
        <div>Coming soon...</div>
        <Map />
        {/* <Player /> */}
      </MapContext.Provider>
    </>
  );
}

export default App;
