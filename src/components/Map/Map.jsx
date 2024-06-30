import './Map.css'
import MapTile from "../MapTile/MapTile"

function Map(props) {
    const { rows, cols, tiles } = props.data;

    console.log(tiles);

    return (
        <>
            <h2>Map Component</h2>
            <div>Work in progress</div>
            <div className="game-map" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                {tiles.map(tile => <MapTile data={tile} />)}
            </div>
        </>
    )
}

export default Map