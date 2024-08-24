import "../../App.css";
import Map from "../Map/Map";
import Player from "../Player/Player";
import { createContext} from "react";
import usePlayerMovement from "../Custom-Hooks/usePlayerMovement";
import PropTypes from "prop-types";

function Game({ player, setPlayer, rows, cols, map, setMap }) {

  usePlayerMovement(setMap, rows, cols, player, setPlayer);

  return (
    <PlayerContext.Provider value={player}>
      <Player />
      <Map mapData={map} />
    </PlayerContext.Provider>
  );
}

export const PlayerContext = createContext();
export default Game;

Game.propTypes = {
  player: PropTypes.any,
  map: PropTypes.any,
  setMap: PropTypes.any,
  setPlayer: PropTypes.any,
  rows: PropTypes.any,
  cols: PropTypes.any
};
