import "./MapTile.css";
import PropTypes from 'prop-types';

function MapTile(props) {
  const { row, col, visited, requiredEnergy, yieldValue, hasTreasure } = props.data;
  const tileClass = visited ? 'visited' : 'unvisited';
  const treasureIconClass = hasTreasure ? 'treasure-icon' : '';
  const treasureTileClass = hasTreasure ? 'treasure-tile' : '';
  const yieldValueEmojiClass =
    yieldValue >= 0 ? 'yield-value-positive' : 'yield-value-negative';

  return (
    <div className={`map-tile ${tileClass} ${treasureTileClass}`}>
      <div>
        <div className="tile-coordinates">
          <small>
            Tile: {row},{col}
          </small>
        </div>
      </div>
      <div className="tile-text-size energy-emoji"> : {requiredEnergy}</div>
      <div className={`tile-text-size ${yieldValueEmojiClass}`}> : {yieldValue}</div>
      <div className="tile-text-size">Visited: {String(visited)}</div>
    <div className={`${treasureIconClass}`}></div>
    </div>
  );
}

export default MapTile;

MapTile.propTypes = {
  data: PropTypes.any,
}
