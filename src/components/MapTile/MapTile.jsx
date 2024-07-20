import "./MapTile.css";
import PropTypes from 'prop-types';

function MapTile(props) {
  const { row, col, visited, requiredEnergy, yieldValue, hasTreasure } = props.data;
  const tileClass = visited ? 'visited' : 'unvisited';
  let treasure = hasTreasure ? "🏆" : ""

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
      <div> {treasure}</div>


    </div>
  );
}

export default MapTile;

MapTile.propTypes = {
data: PropTypes.any,
}
