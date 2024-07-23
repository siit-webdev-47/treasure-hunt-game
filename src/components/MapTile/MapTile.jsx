import "./MapTile.css";
import PropTypes from 'prop-types';

function MapTile(props) {
  const { row, col, visited, requiredEnergy, yieldValue, hasTreasure} = props.mapTileData;
  const playerPosition = props.playerPosition;
  const player = props.playerData;

  const tileClass = visited ? 'visited' : 'unvisited';
  const treasureIconClass = hasTreasure ? 'treasure-icon' : '';
  const treasureTileClass = hasTreasure ? 'treasure-tile' : '';
  const yieldValueEmojiClass =
    yieldValue >= 0 ? 'yield-value-positive' : 'yield-value-negative';

  //checking if the player has a name  and is the playerPosition is on specific tile
  const playerOnTile = playerPosition.row === row && playerPosition.col === col;
  
  const energyLevel = (energy) => {
    if (energy > 50) return "high-energy";
    if (energy >= 25 && energy <= 50) return "mid-energy";
    return "low-energy"
  }

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
  data: PropTypes.any,
  playerPosition : PropTypes.any,
  playerName : PropTypes.any
  
};

export default MapTile;

MapTile.propTypes = {
  data: PropTypes.any,
}
