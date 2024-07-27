import "../../App.css";
import Map from "../Map/Map";
import Player from "../Player/Player";
import { createContext, useState } from "react";
import generateMapTiles from "../Functions/generateMapTiles";
import usePlayerMovement from "../Custom-Hooks/usePlayerMovement";

function Game() {
  const [player, setPlayer] = useState({
    playerName: "Rodica",
    playerEnergy: 15,
    get playerAvatar() {
      return `https://api.dicebear.com/9.x/micah/svg?seed=${this.playerName}`;
    },
  });

  
  const rows = 5;
  const cols = 7;
  
  const [map, setMap] = useState({
      rows,
      cols,
      tiles: generateMapTiles(rows, cols),
      playerPosition: {
          row: 0,
          col: 0,
        },
    });
    
    usePlayerMovement(setMap, rows, cols);
  
    return (
    <PlayerContext.Provider value={player}>
      <Player />
      <Map mapData={map} />
    </PlayerContext.Provider>
  );
}

export const PlayerContext = createContext();
export default Game;
