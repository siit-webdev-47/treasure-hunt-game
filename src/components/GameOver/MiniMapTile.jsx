import { useContext } from "react";
import { AppSettingsContext } from "../../App";
import "./MiniMapTile.css";
import PropTypes from "prop-types";
import energyLevel from "../Functions/energyLevel";

function MiniMapTile(props) {
    const { player } = useContext(AppSettingsContext);
    const { playerEnergy } = player;
    const {
        row,
        col,
        visited,
        hasTreasure,
    } = props.mapTileData;
    const playerPosition = props.playerPosition;

    const playerOnTile = playerPosition.row === row && playerPosition.col === col;
    const playerOnTileClass = playerOnTile ? "playerOnTile" : "";
    const treasureTileClass = hasTreasure ? "treasure-tile" : "";
    const treasureIconClass = hasTreasure ? "treasure-icon" : "";
    const tileClass = visited ? "visited" : "unvisited";


    return (
        <div
            //  ref={tileRef} 
            className={`map-tile ${tileClass} ${treasureTileClass} ${playerOnTileClass} `}
        >
            <div>
                {!playerOnTile && !hasTreasure && (
                    <div className="tile-coordinates">
                        <small>
                            Tile: {row},{col}
                        </small>
                    </div>
                )}
                {playerOnTile && (
                    <>
                        <img
                            src={player.playerAvatar}
                            alt={`${player.playerName}'s player`}
                            className={`tile-avatar ${energyLevel(playerEnergy)}`}
                        />
                    </>
                )}
            </div>
            <div className={`${treasureIconClass}`}></div>
        </div >
    );
}

export default MiniMapTile;

MiniMapTile.propTypes = {
    mapTileData: PropTypes.any,
    playerPosition: PropTypes.any,
}
