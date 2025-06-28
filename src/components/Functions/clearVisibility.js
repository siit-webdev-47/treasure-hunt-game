// clears the visible property for the tiles around the player (2 tiles around)

export function clearVisibility(map, row, col, range = 1) {
  for (let i = -(range + 1); i <= (range + 1); i++) {
    for (let j = -(range + 1); j <= (range + 1); j++) {
      if (
        row + i >= 0 &&
        col + j >= 0 &&
        row + i < map.rows &&
        col + j < map.cols
      ) {
        map.tiles[row + i][col + j].visible = false;
      }
    }
  }
}