import "./MapTile.css";

function MapTile(props) {
  const { row, col, visited, requiredEnergy, yieldValue } = props.data;
  const tileClass = visited ? "visited" : "unvisited";
  const yieldValueEmojiClass =
    yieldValue > 0 ? "yield-value-positive" : "yield-value-negative";

  return (
    <div className={`map-tile ${tileClass}`}>
      <div>
        <div className="tile-coordinates">
          <small>
            Tile: {row},{col}
          </small>
        </div>
      </div>
      <div className="tile-text-size energy-emoji"> : {requiredEnergy}</div>
      <div className={`tile-text-size ${yieldValueEmojiClass}`}>
        : {yieldValue}
      </div>
      <div className="tile-text-size">Visited: {String(visited)}</div>
    </div>
  );
}

export default MapTile;
