import "./MapTile.css";
import { useContext } from "react";
import { AppSettingsContext } from "../../App";
import PropTypes from 'prop-types';
import energyLevel from "../Functions/energyLevel";

function MapTile(props) {
  const { row, col, visited, visible, requiredEnergy, yieldValue, hasTreasure } = props.mapTileData;
  const playerPosition = props.playerPosition;

  const { player } = useContext(AppSettingsContext);

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
      {/* <div className="tile-text-size">Visited: {String(visited)}</div> */}
      <div className="tile-text-size">Visible: {String(visible)}</div>
      <div className={`${treasureIconClass}`}></div>
    </div>
  );
}

export default MapTile;

MapTile.propTypes = {
  mapTileData: PropTypes.any,
  playerPosition: PropTypes.any
}
