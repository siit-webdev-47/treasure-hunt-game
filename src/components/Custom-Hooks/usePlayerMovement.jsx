import { useEffect } from 'react';

const usePlayerMovement = (setMap, rows, cols) => {
  // console.log(rows,cols);
  useEffect(() => {
    const handleKey = (event) => {
      // console.log({event});
      setMap((prevMap) => {
        const { row, col } = prevMap.playerPosition;
        let newRow = row;
        let newCol = col;

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
  }, [setMap, cols, rows]);
};

export default usePlayerMovement;