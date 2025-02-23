import generateMapTiles from "./generateMapTiles"

const mapFactory = (rows, cols, playerPosition = {row: 0, col: 0},  category = ``, questionDifficulty = ``) => ({
    rows,
    cols,
    playerPosition,
    category,
    questionDifficulty,
    tiles: generateMapTiles(rows, cols).tiles,
});

export default mapFactory;