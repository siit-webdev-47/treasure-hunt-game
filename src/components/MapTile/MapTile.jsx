import { useContext } from "react";
import "./MapTile.css";
import PropTypes from 'prop-types';
import { PlayerContext } from "../../App";

function MapTile(props) {
  const { row, col, visited, requiredEnergy, yieldValue, hasTreasure} = props.mapTileData;
  const playerPosition = props.playerPosition;

  const player = useContext(PlayerContext);

  const tileClass = visited ? 'visited' : 'unvisited';
  const treasureIconClass = hasTreasure ? 'treasure-icon' : '';
  const treasureTileClass = hasTreasure ? 'treasure-tile' : '';
  const yieldValueEmojiClass =
    yieldValue >= 0 ? 'yield-value-positive' : 'yield-value-negative';

  //checking if the player has a name  and is the playerPosition is on specific tile
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
              className="avatar"
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
  mapTileData: PropTypes.any,
}
