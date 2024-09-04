// import "../../App.css";
// import Map from "../Map/Map";
// import Player from "../Player/Player";
// import usePlayerMovement from "../Custom-Hooks/usePlayerMovement";
// import PropTypes from "prop-types";
// import { useContext } from "react";
// import { AppSettingsContext } from "../../App";

// function Game() {
//   const { player, setPlayer, map, setMap, gamePhase } = useContext(AppSettingsContext);

//   usePlayerMovement(setMap, map.rows, map.cols, player, setPlayer);

//   return (
//     <>
//       {gamePhase === 'ONGOING' && (
//         <div className="game-container">
//           <Player />
//           <Map mapData={map} />
//         </div>
//       )}
//     </>
//   );
// }

// export default Game;

// Game.propTypes = {
//   player: PropTypes.any,
//   map: PropTypes.any,
//   setMap: PropTypes.any,
//   setPlayer: PropTypes.any,
//   rows: PropTypes.any,
//   cols: PropTypes.any
// };

import "../../App.css";
import Map from "../Map/Map";
import Player from "../Player/Player";
import usePlayerMovement from "../Custom-Hooks/usePlayerMovement";
// import PropTypes from "prop-types";
import { useContext } from "react";
import { AppSettingsContext } from "../../App";
// import usePlayerMovement from "../Custom-Hooks/wip";

function Game() {
  const { player, setPlayer, map, setMap, gamePhase } = useContext(AppSettingsContext);
  const { row, col } = map.playerPosition;   

  // if(player.playerEnergy <= 0 || map.tiles[row][col].hasTreasure){ 
  //   return;
  // }

  function handlePlayerMove(newRow, newCol){
    const tileEnergy =
    map.tiles[newRow][newCol].yieldValue -
    map.tiles[newRow][newCol].requiredEnergy;

    console.log(map);
    
  
    const newPlayerEnergy = player.playerEnergy + tileEnergy;  

    if (player.playerEnergy > 0 && !map.tiles[row][col].hasTreasure){
      if(newPlayerEnergy > 0){

        setMap((prevMap) => {
          console.log(map);
          
          // on the previous tile the yield becomes 0
          prevMap.tiles[row][col].yieldValue = 0;
      
          if (newRow !== row || newCol !== col) {
            const updatedTiles = prevMap.tiles.map((rowTiles, rowIndex) =>
              rowTiles.map((tile, colIndex) => {
                if ((rowIndex === row && colIndex === col) || (rowIndex === newRow && colIndex === newCol)) {
                  return { ...tile, visited: true };
                }
                return tile;
            }) 
            ); 
      
          
      
          return {
            ...prevMap,
            playerPosition: {
              row: newRow,
              col: newCol,
            },
            tiles: updatedTiles,
          }
      }})

      }
    }  

    setPlayer((prevPlayer)=>({
      ...prevPlayer,
      playerEnergy: newPlayerEnergy
    }));

  }
  
  
  usePlayerMovement(row, col, map.rows, map.cols,handlePlayerMove);




  return (
    <>
      {gamePhase === 'ONGOING' && (
        <div className="game-container">
          <Player />
          <Map mapData={map} />
        </div>
      )}
    </>
  );
}

export default Game;
