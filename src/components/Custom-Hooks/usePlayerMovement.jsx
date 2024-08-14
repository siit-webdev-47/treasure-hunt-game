import {  useEffect } from "react";

const usePlayerMovement = (setMap, rows, cols, player, setPlayer) => {
  // console.log(rows,cols);
  useEffect(() => {
    const handleKey = (event) => {
      // console.log({event});
      setMap((prevMap) => {
        
        const { row, col } = prevMap.playerPosition;         
        
        if(player.playerEnergy <= 0 || prevMap.tiles[row][col].hasTreasure){ 
          return prevMap;
        }

        let newRow = row;
        let newCol = col;

        switch (event.key) {
          case "ArrowLeft":
            if (col > 0) {
              newCol = col - 1;
            }
            break;
          case "ArrowRight":
            if (col < cols - 1) {
              newCol = col + 1;
            }
            break;
          case "ArrowUp":
            if (row > 0) {
              newRow = row - 1;
            }
            break;
          case "ArrowDown":
            if (row < rows - 1) {
              newRow = row + 1;
            }
            break;
          default:
            return prevMap;
        }

        if (newRow !== row || newCol !== col) {
          const updatedTiles = prevMap.tiles.map((rowTiles, rowIndex) =>
            rowTiles.map((tile, colIndex) => {
              if ((rowIndex === row && colIndex === col) || (rowIndex === newRow && colIndex === newCol)) {
                return { ...tile, visited: true };
              }
              return tile;
          }) 
          ); 
        
          const tileEnergy =
            prevMap.tiles[newRow][newCol].yieldValue -
            prevMap.tiles[newRow][newCol].requiredEnergy;
          
          const newPlayerEnergy = player.playerEnergy + tileEnergy;        
          
          setPlayer((prevPlayer)=>({
            ...prevPlayer,
            playerEnergy: newPlayerEnergy
          }));

          return {
            ...prevMap,
            playerPosition: {
              row: newRow,
              col: newCol,
            },
            tiles: updatedTiles,
          };
        }
        
        return prevMap; 
      }); 
    };

    document.addEventListener('keyup', handleKey);

    return () => {
      document.removeEventListener('keyup', handleKey);
    };
  }, [setMap, cols, rows, player, setPlayer]);
};

export default usePlayerMovement;
