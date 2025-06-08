import "./Map.css";
import MapTile from "../MapTile/MapTile";
import PropTypes from 'prop-types';

function Map(props) {
  const {cols, tiles, playerPosition } = props.mapData;
  const { onTileClick ,isValidMove} = props;
  const { row: oldRow, col: oldCol } = playerPosition;
  
  return (
    <>
      <div
        className="game-map"
        style={{ gridTemplateColumns: `repeat(${cols}, 220px)` }}
      >
        {tiles.map((row, i) =>
          row.map((tile, j) => <MapTile mapTileData={{...tile,  isMoveValid: isValidMove(oldRow, oldCol, i, j),}} playerPosition={playerPosition} playerData={props.playerData} key={[i, j]} onTileClick={onTileClick} teleportMode={props.teleportMode} pendingTeleport={props.pendingTeleport} />)
        )}
      </div>
    </>
  );
}

export default Map;

Map.propTypes = {
  mapData: PropTypes.any,
  playerData: PropTypes.any,
  onTileClick: PropTypes.func.isRequired,
  isValidMove: PropTypes.func.isRequired,
  teleportMode: PropTypes.any,
  pendingTeleport: PropTypes.any,
}