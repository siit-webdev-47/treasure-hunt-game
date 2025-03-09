import "./Map.css";
import MapTile from "../MapTile/MapTile";
import PropTypes from 'prop-types';

function Map(props) {
  
  console.log("Props in Map:", props);

  const {cols, tiles, playerPosition } = props.mapData;
  const { onTileClick } = props;

  return (
    <>
      {/* <h2>Map Component</h2> */}
      <div
        className="game-map"
        style={{ gridTemplateColumns: `repeat(${cols}, 220px)` }}
      >
        {tiles.map((row, i) =>
          row.map((tile, j) => <MapTile mapTileData={tile} playerPosition={playerPosition} playerData={props.playerData} key={[i, j]} onTileClick={onTileClick} />)
        )}
      </div>
    </>
  );
}

export default Map;

Map.propTypes = {
  mapData: PropTypes.any,
  playerData : PropTypes.any,
  onTileClick: PropTypes.func.isRequired,
}