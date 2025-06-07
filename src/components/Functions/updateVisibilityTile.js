export function updateVisibilityTile(map, row, col) {

  // clears the visible property for the tiles around the player (2 tiles around)
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

  // sets the visible property for the tiles around the player (1 tile around)
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (
        row + i >= 0 &&
        col + j >= 0 &&
        row + i < map.rows &&
        col + j < map.cols
      ) {
        map.tiles[row + i][col + j].visible = true;
      }
    }
  }

  return map.tiles;
}
