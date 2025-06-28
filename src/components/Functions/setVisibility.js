// sets the visible property for the tiles around the player (1 tile around)

export function setVisibility(map, row, col, range = 1) {
  for (let i = -range; i <= range; i++) {
    for (let j = -range; j <= range; j++) {
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