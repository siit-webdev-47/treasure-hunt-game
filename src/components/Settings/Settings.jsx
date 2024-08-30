import { useState } from "react";
import PropTypes from "prop-types";

function Settings({ onStartGame }) {
  const [playerName, setPlayerName] = useState('Player');
  const [rows, setRows] = useState(6);
  const [cols, setCols] = useState(6);

  const handleSubmit = (e) => {
    e.preventDefault();
    onStartGame(playerName, rows, cols);
  };

  return (
    <div className="settings">

      <h2>Settings</h2>

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="playerName">Player Name:</label>
          <input
            type="text"
            id="playerName"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="rows">Rows:</label>
          <input
            type="number"
            id="rows"
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
            min="6"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cols">Columns:</label>
          <input
            type="number"
            id="cols"
            value={cols}
            onChange={(e) => setCols(Number(e.target.value))}
            min="6"
          />
        </div>

        <button type="submit">Start Game</button>

      </form>
    </div>
  );
}

Settings.propTypes = {
  onStartGame: PropTypes.func.isRequired,
};

export default Settings;