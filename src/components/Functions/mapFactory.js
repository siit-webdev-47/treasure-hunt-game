import generateMapTiles from "./generateMapTiles"

const mapFactory = (rows, cols, playerPosition = {row: 0, col: 0},  category = ``) => ({
    rows,
    cols,
    playerPosition,
    category,
    tiles: generateMapTiles(rows, cols).tiles,
});

export default mapFactory;