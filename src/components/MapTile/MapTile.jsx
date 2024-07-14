import "./MapTile.css";

function MapTile(props) {
  const { row, col, visited, requiredEnergy, yieldValue } = props.data;
  const tileClass = visited ? 'visited' : 'unvisited';

  return (
    <div className={`map-tile ${tileClass}`}>
      <div>
        <div className="tile-coordinates">
          <small>Tile: {row},{col}</small>
        </div>
      </div>
      <div>⚡: {requiredEnergy}</div>
      <div>🍀 : {yieldValue}</div>
      <div className="tile-visited-property">
        Visited: {String(visited)}
      </div>
    </div>
  );
}

export default MapTile;
