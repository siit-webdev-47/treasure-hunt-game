import generateMapTiles from "./generateMapTiles"

const mapFactory = (rows, cols, playerPosition = {row: 0, col: 0}) => ({
    rows,
    cols,
    playerPosition,
    tiles: generateMapTiles(rows, cols),
});

export default mapFactory;