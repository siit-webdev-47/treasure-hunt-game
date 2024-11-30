import "./Map.css";
import MapTile from "../MapTile/MapTile";
import PropTypes from 'prop-types';

function Map(props) {
  const {cols, tiles, playerPosition} = props.mapData;

  return (
    <>
      {/* <h2>Map Component</h2> */}
      <div
        className="game-map"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {tiles.map((row, i) =>
          row.map((tile, j) => <MapTile mapTileData={tile} playerPosition={playerPosition} playerData={props.playerData} key={[i, j]} />)
        )}
      </div>
    </>
  );
}

export default Map;

Map.propTypes = {
  mapData: PropTypes.any,
  playerData : PropTypes.any
}