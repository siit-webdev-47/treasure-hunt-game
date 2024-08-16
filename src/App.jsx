import { useState } from "react";
import Game from "./components/Game/Game";
import GameOver from "./components/GameOver/GameOver";
import Settings from "./components/Settings/Settings";
import generateMapTiles from "./components/Functions/generateMapTiles";

function App() {
  const [player, setPlayer] = useState({
    playerName: "Rodica",
    playerEnergy: 15,
    get playerAvatar() {
      return `https://api.dicebear.com/9.x/micah/svg?seed=${this.playerName}`;
    },
  });

  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);

  const [map, setMap] = useState({
    rows,
    cols,
    tiles: generateMapTiles(rows, cols),
    playerPosition: {
      row: 0,
      col: 0,
    },
  });

  return (
    <>
      <h1>Treasure Hunt</h1>
      <Settings
        // player={player}
        // setPlayer={setPlayer}
        // rows={rows}
        // cols={cols}
        // setRows={setRows}
        // setCols={setCols}
      />
      <GameOver player={player} map={map} />
      <Game
        player={player}
        setPlayer={setPlayer}
        rows={rows}
        cols={cols}
        map={map}
        setMap={setMap}
      />
      
    </>
  );
}

export default App;
