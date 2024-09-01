import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { AppSettingsContext } from "../../App";

function Settings({ onStartGame }) {
  const { player, setPlayer, map, setMap, gamePhase } = useContext(AppSettingsContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    onStartGame();
  };

  return (
    <> 
      {gamePhase === 'SETTINGS' && (
        <div className="settings">
          <h2>Settings</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="playerName">Player Name:</label>
              <input
                type="text"
                id="playerName"
                value={player.playerName}
                onChange={(e) => setPlayer({...player, playerName: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label htmlFor="rows">Rows:</label>
              <input
                type="number"
                id="rows"
                value={map.rows}
                onChange={(e) => setMap({...map, rows: Number(e.target.value)})}
                min="6"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cols">Columns:</label>
              <input
                type="number"
                id="cols"
                value={map.cols}
                onChange={(e) => setMap({...map, cols: Number(e.target.value)})}
                min="6"
              />
            </div>

            <button type="submit">Start Game</button>

          </form>
        </div>
      )}
    </>
  );
}

Settings.propTypes = {
  onStartGame: PropTypes.func.isRequired,
};

export default Settings;