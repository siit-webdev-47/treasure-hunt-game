import "./MiniMap.css";
import MiniMapTile from "./MiniMapTile";
import PropTypes from "prop-types";

function MiniMap(props) {
    const { cols, tiles, playerPosition } = props.mapData;
    const { row: oldRow, col: oldCol } = playerPosition;

    return (
        <>
            <div
                className="game-map"
                style={{ gridTemplateColumns: `repeat(${cols}, 70px)` }}
            >
                {tiles.map((row, i) =>
                    row.map((tile, j) => (
                        <MiniMapTile
                            mapTileData={{
                                ...tile,            
                            }}
                            playerPosition={playerPosition}
                            playerData={props.playerData}
                            key={[i, j]}
                            
                        />
                    ))
                )}
            </div>
        </>
    );
}

export default MiniMap;

MiniMap.propTypes = {
    mapData: PropTypes.any,
    playerData: PropTypes.any,
}