function generateMapTiles(rows, cols, initRow = 0, initCol = 0) {
    const tiles = [];
    for (let i = 0; i < rows; i++) {
      tiles[i] = [];
      for (let j = 0; j < cols; j++) {
        tiles[i][j] = {
          row: i,
          col: j,
          visited: i == initRow &&  j == initCol ? true : false,
          visible: i == initRow &&  j == initCol ? true : false,
          requiredEnergy: i == initRow &&  j == initCol ? 0 : Math.floor(Math.random() * 5 + 1),
          yieldValue: i == initRow &&  j == initCol ? 0 : Math.floor(Math.random() * 30 - 15),
          hasTreasure: false,
        };
      }
    }

    const treasureCoordinates = generateTreasure(rows, cols, initRow, initCol);
    tiles[treasureCoordinates.row][treasureCoordinates.col].hasTreasure = true;

    return tiles;
  }


  function generateTreasure(rows, cols, initRow = 0, initCol = 0, initDistace = 3) {
    let possibleTreasure = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if ((Math.abs(initRow - i) + Math.abs(initCol - j)) > initDistace) 
          possibleTreasure.push([i, j]);
      }
    }

    let treasurePos = Math.floor(Math.random() * possibleTreasure.length);
    return {
      row: possibleTreasure[treasurePos][0],
      col: possibleTreasure[treasurePos][1]
    };
  }
  
  export default generateMapTiles;