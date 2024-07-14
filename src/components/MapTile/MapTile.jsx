import './MapTile.css'

function MapTile(props) {
    const { row, col, visited, requiredEnergy } = props.data;
    const tileClass = visited ? 'visited' : 'unvisited';

    return (
        <div className={`map-tile ${tileClass}`}>
            <div className="tile-coordinates">
                <small>{row},{col}</small>
            </div>
            <div>
                ⚡: {requiredEnergy}
            </div>
            <div className="tile-visited-property">
                Visited: {String(visited)}
            </div>
        </div>
    )
}

export default MapTile