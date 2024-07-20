import "./Map.css";
import MapTile from "../MapTile/MapTile";
import PropTypes from 'prop-types';

function Map(props) {
  const { rows, cols, tiles } = props.data;
  console.log("Tiles:");
  console.log(tiles);

  return (
    <>
      <h2>Map Component</h2>
      <div>Work in progress</div>
      <div
        className="game-map"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {tiles.map((row, i) =>
          row.map((tile, j) => <MapTile data={tile} key={[i, j]} />)
        )}
      </div>
    </>
  );
}

export default Map;

Map.propTypes = {
  data: PropTypes.any,
  }