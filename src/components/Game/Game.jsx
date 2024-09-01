import "../../App.css";
import Map from "../Map/Map";
import Player from "../Player/Player";
import usePlayerMovement from "../Custom-Hooks/usePlayerMovement";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AppSettingsContext } from "../../App";

function Game() {
  const { player, setPlayer, map, setMap, gamePhase } = useContext(AppSettingsContext);

  usePlayerMovement(setMap, map.rows, map.cols, player, setPlayer);

  return (
    <>
      {gamePhase === 'ONGOING' && (
        <div className="game-container">
          <Player />
          <Map mapData={map} />
        </div>
      )}
    </>
  );
}

export default Game;

Game.propTypes = {
  player: PropTypes.any,
  map: PropTypes.any,
  setMap: PropTypes.any,
  setPlayer: PropTypes.any,
  rows: PropTypes.any,
  cols: PropTypes.any
};
