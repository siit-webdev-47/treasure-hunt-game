// clears the visible property for the tiles around the player (2 tiles around)

export function clearVisibility(map, row, col) {
  for (let i = -2; i <= 2; i++) {
    for (let j = -2; j <= 2; j++) {
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