import "./App.css";
import Map from "./components/Map/Map";
import Player from "./components/Player/Player";

function generateMapTiles(rows, cols) {
  let tiles = [];
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
  const rows = 7;
  const cols = 8;

  const map = {
    rows,
    cols,
    tiles: generateMapTiles(rows, cols),
  };
  // console.log("Map:");
  // console.log(map.tiles);
  return (
    <>
      <h1>Treasure Hunt</h1>
      <div>Coming soon...</div>
      <Player />
      <Map data={map} />
    </>
  );
}

export default App;
