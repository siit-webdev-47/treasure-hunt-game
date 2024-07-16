import "./MapTile.css";
import PropTypes from "prop-types";


function MapTile({data, playerPosition, playerName}) {
  const { row, col, visited, requiredEnergy, yieldValue } = data;
  const tileClass = visited ? 'visited' : 'unvisited';

  //checking if the player has a name  and is the playerPosition is on specific tile
  const playerOnTile = playerName && playerPosition.row === row && playerPosition.col === col;


  return (
    <div className={`map-tile ${tileClass}`}>
      <div>
        <div className="tile-coordinates">
          <small>Tile: {row},{col}</small>
        </div>
        {playerOnTile && <img
              src={`https://api.dicebear.com/9.x/micah/svg?seed=${playerName}`} // use playerName to generate the same avatar on a specific tile
              alt={`${playerName}'s player`}
              className="avatar"
            />}
      </div>
      <div>⚡: {requiredEnergy}</div>
      <div>🍀 : {yieldValue}</div>
      <div className="tile-visited-property">
        Visited: {String(visited)}
      </div>
    </div>
  );
}

MapTile.propTypes = {
  data: PropTypes.any,
  playerPosition : PropTypes.any,
  playerName : PropTypes.any
  
};


export default MapTile;


