import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { AppSettingsContext } from "../../App";
import "./Settings.css";
import {MAP_MIN_ROWS,MAP_MAX_ROWS,MAP_MIN_COLS,MAP_MAX_COLS,} from "../Functions/generateMapTiles";

function Settings({ onStartGame }) {
  const { player, map } = useContext(AppSettingsContext);
  const [rows, setRows] = useState(map.rows);
  const [cols, setCols] = useState(map.cols);
  const [playerName, setPlayerName] = useState(player.playerName);
  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    if (rows < MAP_MIN_ROWS  || rows > MAP_MAX_ROWS  || cols < MAP_MIN_COLS || cols > MAP_MAX_COLS) {
      setErrorMessage(`❗Rows and columns must be between ${MAP_MIN_ROWS} and ${MAP_MAX_ROWS}.❗`);
      console.log("Error Message in if :", errorMessage);
      return;
    }
    setErrorMessage("");
    console.log("Error Message:", errorMessage);

    map.cols = cols;
    map.rows = rows;
    player.playerName = playerName;

    onStartGame();
  };

  return (
    <div className="settings">
      <h2 className="settings-title">Settings</h2>
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="playerName">Player Name:</label>
          <input
            className="input-settings"
            type="text"
            id="playerName"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="rows">Rows:</label>
          <input
            className="input-settings"
            type="number"
            id="rows"
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cols">Columns:</label>
          <input
            className="input-settings"
            type="number"
            id="cols"
            value={cols}
            onChange={(e) => setCols(Number(e.target.value))}
          />
        </div>

        <button className="button-settings" type="submit">Start Game</button>

      </form>
    </div>
  );
}

Settings.propTypes = {
  onStartGame: PropTypes.func.isRequired,
};

export default Settings;