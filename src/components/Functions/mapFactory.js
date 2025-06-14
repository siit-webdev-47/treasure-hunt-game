import generateMapTiles from "./generateMapTiles"

const mapFactory = (rows, cols, playerPosition = {row: 0, col: 0}, treasurePosition = {row: 0, col: 0}, category = ``, subcategories = [], questionDifficulty = ``) => ({
    rows,
    cols,
    playerPosition,
    treasurePosition,
    category,
    subcategories,
    questionDifficulty,
    tiles: generateMapTiles(rows, cols).tiles,
});

export default mapFactory;