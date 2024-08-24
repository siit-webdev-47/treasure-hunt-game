function generateMapTiles(rows, cols, initRow = 0, initCol = 0) {
    const tiles = [];
    for (let i = 0; i < rows; i++) {
      tiles[i] = [];
      for (let j = 0; j < cols; j++) {
        tiles[i][j] = {
          row: i,
          col: j,
          visited: false,
          requiredEnergy: i == initRow &&  j == initCol ? 0 : Math.floor(Math.random() * 5 + 1),
          yieldValue: i == initRow &&  j == initCol ? 0 : Math.floor(Math.random() * 30 - 15),
          hasTreasure: false,
        };
      }
    }
    generateTreasure(tiles, rows, cols, initRow, initCol);
    return tiles;
  }

  function generateTreasure(tiles, rows, cols, initRow = 0, initCol = 0, initDistace = 3) {
    // TODO - implement the logic for any starting position, currently is implemented for starting position 0, 0 
    let treasureRow = Math.floor(Math.random() * rows);
    let minDiff = treasureRow < 3 ? 3 - treasureRow : 0;
    let treasureCol = Math.floor(Math.random() * (cols - minDiff)) + minDiff;


    tiles[treasureRow][treasureCol].hasTreasure = true;
  }
  
  export default generateMapTiles;