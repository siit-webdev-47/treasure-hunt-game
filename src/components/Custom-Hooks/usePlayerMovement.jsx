import { useEffect } from 'react';

const usePlayerMovement = (setMap, rows, cols,player, setPlayer) => {
  // console.log(rows,cols);
  useEffect(() => {
    const handleKey = (event) => {
      // console.log({event});
      setMap((prevMap) => {
        const { row, col } = prevMap.playerPosition;
        let newRow = row;
        let newCol = col;

      
        if(player.playerEnergy <= 0 || prevMap.tiles[row][col].hasTreasure){
          return prevMap;
        }

        switch (event.key) {
          case "ArrowLeft":
            newCol = col - 1;
            if (newCol < 0) {
              newCol = 0;
            }
            break;
          case "ArrowRight":
            newCol = col + 1;
            if (newCol >= cols) {
              newCol = cols - 1;
            }
            break;
          case "ArrowUp":
            newRow = row - 1;
            if (newRow < 0) {
              newRow = 0;
            }
            break;
          case "ArrowDown":
            newRow = row + 1;
            if (newRow >= rows) {
              newRow = rows - 1;
            }
            break;
          default:
            return prevMap;
        }

        const updatedTiles = prevMap.tiles.map((rowTiles, rowIndex) =>
          rowTiles.map((tile, colIndex) => {
            if (rowIndex === newRow && colIndex === newCol) {
              return { ...tile, visited: true };
            }
            return tile;
          })
        );
        // console.log(updatedTiles);
        
        const tileEnergy =
          prevMap.tiles[newRow][newCol].yieldValue -
          prevMap.tiles[newRow][newCol].requiredEnergy;
        const newPlayerEnergy = player.playerEnergy + tileEnergy;

        setPlayer((prevPlayer)=>({
          ...prevPlayer,
          playerEnergy: newPlayerEnergy
        }))

        
        
        

        return {
          ...prevMap,
          playerPosition: {
            row: newRow,
            col: newCol,
          },
          tiles: updatedTiles,
        };
      });
    };

    document.addEventListener("keyup", handleKey);

    return () => {
      document.removeEventListener('keyup', handleKey);
    };
  }, [setMap, cols, rows,player,setPlayer]);
};

export default usePlayerMovement;