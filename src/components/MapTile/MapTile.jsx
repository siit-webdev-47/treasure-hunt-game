import "./MapTile.css";
import { useContext } from "react";
import { AppSettingsContext } from "../../App";
import PropTypes from "prop-types";
import energyLevel from "../Functions/energyLevel";

function MapTile(props) {
  const { player } = useContext(AppSettingsContext);
  const { playerEnergy } = player;

  const {
    row,
    col,
    visited,
    visible,
    requiredEnergy,
    yieldValue,
    hasTreasure,
    category,
    difficulty,
  } = props.mapTileData;
  const playerPosition = props.playerPosition;

  const tileClass = visited ? "visited" : "unvisited";
  const tileVisible = visible ? "visible" : "invisible";
  const treasureIconClass = hasTreasure && visible ? "treasure-icon" : "";
  const treasureTileClass = hasTreasure && visible ? "treasure-tile" : "";
  const yieldValueEmojiClass =
    yieldValue >= 0 ? "yield-value-positive" : "yield-value-negative";
  let difficultyIcon;

  switch (difficulty) {
    case "easy":
      difficultyIcon = "👶";
      break;
    case "medium":
      difficultyIcon = "👩‍🎓";
      break;
    case "hard":
      difficultyIcon = "💀";
      break;
  }

  const playerOnTile = playerPosition.row === row && playerPosition.col === col;
  const playerOnTileClass = playerOnTile ? "playerOnTile" : "";
  return (
    <div
      className={`map-tile ${tileClass} ${treasureTileClass} ${energyLevel(
        player.playerEnergy
      )} ${playerOnTileClass} ${difficulty} ${tileVisible}`}
    >
      <div>
        <div className="tile-coordinates">
          <small>
            Tile: {row},{col}
          </small>
        </div>
        {playerOnTile && (
          <>
            <img
              src={player.playerAvatar}
              alt={`${player.playerName}'s player`}
              className={`tile-avatar ${energyLevel(player.playerEnergy)}`}
            />
            <p className={energyLevel(playerEnergy)}>
              Energy Level : {playerEnergy}
            </p>
          </>
        )}
      </div>
      {visible && (
        <>
          <div className={`tile-title-text-size `}>{` ${category}`}</div>
          <div className="energy">
            <div className="tile-text-size energy-emoji">{` : ${requiredEnergy} `}</div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div
              className={`tile-text-size ${yieldValueEmojiClass}`}
            >{` : ${yieldValue}`}</div>
          </div>
          <div className={`tile-text-size ${difficulty}`}>
            {`${difficultyIcon} ${difficulty}`}
          </div>
          <div className={`${treasureIconClass}`}></div>
        </>
      )}
    </div>
  );
}

export default MapTile;

MapTile.propTypes = {
  mapTileData: PropTypes.any,
  playerPosition: PropTypes.any,
};
