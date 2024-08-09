import "../../App.css";
import Map from "../Map/Map";
import Player from "../Player/Player";
import { createContext, useState } from "react";
import generateMapTiles from "../Functions/generateMapTiles";
import usePlayerMovement from "../Custom-Hooks/usePlayerMovement";
import GameOver from "../GameOver/GameOver";

function Game() {
  const [player, setPlayer] = useState({
    playerName: "Rodica",
    playerEnergy: 15,
    get playerAvatar() {
      return `https://api.dicebear.com/9.x/micah/svg?seed=${this.playerName}`;
    },
  });
  
  const rows = 5;
  const cols = 5;
  
  const [map, setMap] = useState({
      rows,
      cols,
      tiles: generateMapTiles(rows, cols),
      playerPosition: {
          row: 0,
          col: 0,
        },
    });

    // console.log('tiles');
    // console.log(map.tiles[1][2].hasTreasure);
    // console.log(map.playerPosition);
    
    usePlayerMovement(setMap, rows, cols,player,setPlayer);
    // console.log(usePlayerMovement(setMap, rows, cols));
    
    return (
    <PlayerContext.Provider value={player}>
      <GameOver map={map}/>
      <Player />
      <Map mapData={map} />
    </PlayerContext.Provider>
  );
}

export const PlayerContext = createContext();
export default Game;
