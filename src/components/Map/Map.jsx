import './Map.css'
import MapTile from "../MapTile/MapTile"

function Map() {
    return (
        <>
            <h2>Map Component</h2>
            <div>Work in progress</div>
            <div className="game-map">
                <MapTile />
                <MapTile />
                <MapTile />
            </div>
        </>
    )
}

export default Map