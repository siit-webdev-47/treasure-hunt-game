import "./App.css";
import generateMapTiles from "./components/Functions/generateMapTiles";
import Map from "./components/Map/Map";
import Player from "./components/Player/Player";
import { useState, useEffect, createContext } from "react";

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
      col: 0
    }
  });

  const [player, setPlayer] = useState({ 
    playerName: 'Rodica', 
    playerEnergy: 15, 
    get playerAvatar(){
      return  `https://api.dicebear.com/9.x/micah/svg?seed=${this.playerName}` 
    }
  });



  useEffect(() => {
    const handleKey = (event) => {
      setMap((prevMap) => {
        const { row, col } = prevMap.playerPosition;
        let newRow = row;
        let newCol = col;
  
        switch (event.key) {
          case 'ArrowLeft':
            newCol = col - 1;
            if (newCol < 0) {
              newCol = 0;  
            }
            
            break;
          case 'ArrowRight':
            newCol = col + 1;
            if (newCol >= cols) {
              newCol = cols - 1;  
            }
           
            break;
          case 'ArrowUp':
            newRow = row - 1;
            if (newRow < 0) {
              newRow = 0;  
            }
            
            break;
          case 'ArrowDown':
            newRow = row + 1;
            if (newRow >= rows) {
              newRow = rows - 1;  
            }
            
            break;
          default:
            return prevMap;  
        }
  
        // map.tiles[newRow][newCol].visited = true;

        const updatedTiles = prevMap.tiles.map((rowTiles, rowIndex) =>
          rowTiles.map((tile, colIndex) => {
            if (rowIndex === newRow && colIndex === newCol) {
              return { ...tile, visited: true }; 
            }
            return tile;
          })
        );

        return {
          ...prevMap,
          playerPosition: { 
            row: newRow, 
            col: newCol 
          },
          tiles: updatedTiles
        };
      });
    };
  
    document.addEventListener('keyup', handleKey);
  
    return () => {
      document.removeEventListener('keyup', handleKey);
    };
  }, [cols, rows]);
  

  
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

// useEffect(() => {
//   const tileUpdate = setTimeout(() => {
//     map.tiles[0][3].visited = true;
//     setMap({ ...map, tiles: map.tiles });
//   }, 3000);

//   return () => clearTimeout(tileUpdate);
// }, []);