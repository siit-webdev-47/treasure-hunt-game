function generateMapTiles(rows, cols) {
    const tiles = [];
    for (let i = 0; i < rows; i++) {
      tiles[i] = [];
      for (let j = 0; j < cols; j++) {
        tiles[i][j] = {
          row: i,
          col: j,
          visited: false,
          requiredEnergy: Math.floor(Math.random() * 5 + 1),
          yieldValue: Math.floor(Math.random() * 30 - 15),
          hasTreasure: false,
        };
      }
    }
    generateTreasure(tiles, rows, cols);
    return tiles;
  }

  function generateTreasure(tiles, rows, cols) {
    let treasureRow = Math.floor(Math.random() * rows);
    let treasureCol;
    if (treasureRow < 3) {
      let minDiff = 3 - treasureRow;
      treasureCol = Math.floor(Math.random() * (cols-minDiff)) + minDiff;     
    } else {
      treasureCol = Math.floor(Math.random() * cols);
    }
    tiles[treasureRow][treasureCol].hasTreasure = true;
  }
  
  // function generateTreasure(tiles, rows, cols) {
  //   let treasureRow = Math.floor(Math.random() * rows);
  //   let treasureCol = Math.floor(Math.random() * cols);
  //   tiles[treasureRow][treasureCol].hasTreasure = true;
  // }

  export default generateMapTiles;