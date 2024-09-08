import {  useEffect } from "react";

const usePlayerMovement = (row, col, rows, cols, handlePlayerMove) => {
  useEffect(() => { 
    const handleKey = (event) => {
      
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
            return;
        }

       if(newRow !== row || newCol !== col){
        handlePlayerMove(newRow, newCol)
       }
        
    };

    document.addEventListener('keyup', handleKey);

    return () => {
      document.removeEventListener('keyup', handleKey);
    };
  }, [cols, rows, col, row, handlePlayerMove]);
};

export default usePlayerMovement;
