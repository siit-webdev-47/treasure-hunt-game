import energyLevel from "../Functions/energyLevel";
import "./MapTile.css";
import PropTypes from 'prop-types';

function MapTile(props) {
  const { row, col, visited, requiredEnergy, yieldValue, hasTreasure } = props.mapTileData;
  const playerPosition = props.playerPosition;
  const player = props.playerData;

  const tileClass = visited ? 'visited' : 'unvisited';
  const treasureIconClass = hasTreasure ? 'treasure-icon' : '';
  const treasureTileClass = hasTreasure ? 'treasure-tile' : '';
  const yieldValueEmojiClass = yieldValue >= 0 ? 'yield-value-positive' : 'yield-value-negative';

  const playerOnTile = playerPosition.row === row && playerPosition.col === col;



  return (
    <div className={`map-tile ${tileClass} ${treasureTileClass}`}>
      <div>
        <div className="tile-coordinates">
          <small>
            Tile: {row},{col}
          </small>
        </div>
        {playerOnTile && <img
              src={player.playerAvatar} 
              alt={`${player.playerName}'s player`}
              className={`tile-avatar ${energyLevel(player.playerEnergy)}`}
            />}
      </div>
      <div className="tile-text-size energy-emoji"> : {requiredEnergy}</div>
      <div className={`tile-text-size ${yieldValueEmojiClass}`}> : {yieldValue}</div>
      <div className="tile-text-size">Visited: {String(visited)}</div>
      <div className={`${treasureIconClass}`}></div>
    </div>
  );
}

MapTile.propTypes = {
  mapTileData: PropTypes.shape({
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
    visited: PropTypes.bool.isRequired,
    requiredEnergy: PropTypes.number.isRequired,
    yieldValue: PropTypes.number.isRequired,
    hasTreasure: PropTypes.bool.isRequired
  }).isRequired,
  playerPosition: PropTypes.shape({
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired
  }).isRequired,
  playerData: PropTypes.shape({
    playerAvatar: PropTypes.string.isRequired,
    playerName: PropTypes.string.isRequired,
    playerEnergy: PropTypes.number.isRequired
  }).isRequired
};

export default MapTile;
