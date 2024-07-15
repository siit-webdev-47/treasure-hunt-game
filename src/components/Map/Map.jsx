import "./Map.css";
import MapTile from "../MapTile/MapTile";
import { useContext } from "react";
import { MapContext } from "../../App";

function Map() {
  const { cols, tiles } = useContext(MapContext);

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
