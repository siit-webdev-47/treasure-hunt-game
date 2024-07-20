import "./App.css";
import generateMapTiles from "./components/Functions/generateMapTiles";
import Map from "./components/Map/Map";
import Player from "./components/Player/Player";
import { createContext, useState, useEffect } from 'react';

export const MapContext = createContext();




function App() {
  const rows = 5
  const cols = 8

  const [map, setMap] = useState({
    rows,
    cols,
    tiles: generateMapTiles(rows, cols)
  })

  useEffect(() => {
    const tileUpdate = setTimeout(() => {
      map.tiles[0][3].visited = true;
      setMap({ ...map, tiles:map.tiles });
    }, 3000);

    return () => clearTimeout(tileUpdate);
  }, []);


  return (
    <>
      <MapContext.Provider value={{ map, setMap }}>
        <h1>Treasure Hunt</h1>
        <div>Coming soon...</div>
        <Player />
        <Map data={map} />
      </MapContext.Provider>
    </>

  )
}

export default App;
