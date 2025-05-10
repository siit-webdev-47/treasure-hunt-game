function generateRandomPlayerPosition(rows, cols) {
  const x = Math.floor(Math.random() * rows);
  const y = Math.floor(Math.random() * cols);
  return {
    row: x,
    col: y,
  };
}
export default generateRandomPlayerPosition;
