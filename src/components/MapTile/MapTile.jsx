import './MapTile.css'

function MapTile(props) {
    const { row, col, visited, requiredEnergy, yieldValue } = props.data;
    return (
        <div className="map-tile">
            <div>
                <small>{row},{col}</small>
            </div>
            <div>
                ⚡: {requiredEnergy}
            </div>
            <div>
              🍀 : {yieldValue}
            </div>
            <div>
                Visited: {String(visited)}
            </div>
        </div>
    )
}

export default MapTile