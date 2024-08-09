import { useState } from "react";
import PropTypes from "prop-types"; 

function Settings({ onStartGame }) {
 
  const [playerName, setPlayerName] = useState("Rodica");


  const handleSubmit = (e) => {
    e.preventDefault();

    onStartGame(playerName);
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
  
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
}


Settings.propTypes = {
  onStartGame: PropTypes.func.isRequired,  
};

export default Settings;
