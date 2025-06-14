import fetchQuestionList from "./fetchQuestionList";
import generateEnergy from "./generateEnergy";
import generateYield from "./generateYield";

export const MAP_MIN_ROWS = 6;
export const MAP_MAX_ROWS = 20;
export const MAP_MIN_COLS = 6;
export const MAP_MAX_COLS = 20;

function generateMapTiles(rows, cols, category = '', subcategories = [], difficulty='', initPlayerPosition = { row: 0, col: 0 }) {

  const { row: initRow, col: initCol } = initPlayerPosition;

  if (rows < MAP_MIN_ROWS || rows > MAP_MAX_ROWS) {
    console.error(`Rows too small or too large!`);
    return null;
  } 

  if (cols < MAP_MIN_COLS || cols > MAP_MAX_COLS) {
    console.error(`Columns too small! `);
    return null;
  } 

  const tiles = [];
  let number = rows * cols;

  const questionListUpdatePromise = fetchQuestionList(number, category, subcategories, difficulty)
    .then(questionVect => {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          tiles[i][j] = { ...tiles[i][j], ...questionVect[i * cols + j] };
          if (i!==initRow || j!==initCol) {
            tiles[i][j].yieldValue = generateYield(tiles[i][j].difficulty);
            tiles[i][j].requiredEnergy = generateEnergy(tiles[i][j].difficulty);
          }
        }
      }
      return [...tiles]
    });

  for (let i = 0; i < rows; i++) {
    tiles[i] = [];
    for (let j = 0; j < cols; j++) {
      tiles[i][j] = {
        row: i,
        col: j,
        visited: i == initRow && j == initCol ? true : false,
        visible: i == initRow && j == initCol ? true : false,
        requiredEnergy: 0,
        yieldValue: 0,
        hasTreasure: false,
        question: "",
        category: "",
        trueAnsw: "",
        difficulty: "",
        falseAnsw: [],
        correctAnsw: false,
      };
    }
  }

  const treasureCoordinates = generateTreasure(rows, cols, initRow, initCol);
  tiles[treasureCoordinates.row][treasureCoordinates.col].hasTreasure = true;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (((initRow + i) >= 0) && ((initCol + j) >= 0) &&
        ((initRow + i) < rows) && ((initCol + j) < cols)) {
        tiles[initRow + i][initCol + j].visible = true;
      }
    }
  }

  return {
    tiles,
    questionListUpdatePromise,
    treasureCoordinates
  }
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