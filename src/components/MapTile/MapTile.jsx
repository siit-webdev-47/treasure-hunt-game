import "./MapTile.css";
import { useContext, useEffect, useRef } from "react";
import { AppSettingsContext } from "../../App";
import PropTypes from "prop-types";
import energyLevel from "../Functions/energyLevel";
import PlayerScore from "../PlayerScore/PlayerScore";

function MapTile(props) {
  // const { mapTileData, playerPosition, playerData, onTileClick } = props;
  const { player, map } = useContext(AppSettingsContext);
  const { playerEnergy, canMove } = player;
  const { teleportMode, pendingTeleport } = props;

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
    isMoveValid,
  } = props.mapTileData;

  const playerPosition = props.playerPosition;

  const teleportCursorClass = teleportMode ? "teleport-cursor" : "";

  const isSelectedTeleport =
    teleportMode &&
    pendingTeleport &&
    pendingTeleport.row === row &&
    pendingTeleport.col === col;

  const teleportSelectedClass = isSelectedTeleport ? "teleport-selected" : "";

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

  const tileRef = useRef(null);

  useEffect(() => {
    if (((playerOnTile && tileRef.current) || isSelectedTeleport) && !teleportMode) {
      tileRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [playerOnTile, isSelectedTeleport]);

  let isValidTile = "";
  if (isMoveValid && canMove) {
    isValidTile = "valid-move-tile";
  }

  const handleTileClick = () => {
    const oldRow = playerPosition.row;
    const oldCol = playerPosition.col;
    props.onTileClick(row, col, oldRow, oldCol);
  };

  return (
    <div
      ref={tileRef}
      className={`map-tile ${tileClass} ${treasureTileClass} ${energyLevel(
        player.playerEnergy
      )} ${playerOnTileClass} ${difficulty} ${tileVisible} ${isValidTile} ${teleportCursorClass} ${teleportSelectedClass}`}
      onClick={handleTileClick}
    >
      {isSelectedTeleport && teleportMode && pendingTeleport && (
        <div className="teleport-confirmation">
          <p>Teleport here?</p>
          <button className="button-confirm" onClick={props.confirmTeleport}>
            Yes
          </button>
          <button className="button-cancel" onClick={props.cancelTeleport}>
            No
          </button>
        </div>
      )}

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
              className={`tile-avatar ${energyLevel(playerEnergy)}`}
            />
            <p className={energyLevel(playerEnergy)}>
              Energy Level : {playerEnergy}
            </p>
            <PlayerScore player={player} map={map} />
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
  onTileClick: PropTypes.func.isRequired,
  teleportMode: PropTypes.any,
  pendingTeleport: PropTypes.any,
  confirmTeleport: PropTypes.func,
  cancelTeleport: PropTypes.func,
};
