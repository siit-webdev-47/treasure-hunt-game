import { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AppSettingsContext } from "../../App";
import "./Settings.css";
import {MAP_MIN_ROWS,MAP_MAX_ROWS,MAP_MIN_COLS,MAP_MAX_COLS,} from "../Functions/generateMapTiles";

function Settings({ onStartGame }) {
  const { player, map } = useContext(AppSettingsContext);

  const [rows, setRows] = useState(map.rows);
  const [cols, setCols] = useState(map.cols);
  const [selectedCategory, setSelectedCategory] = useState(map.category);

  const [playerName, setPlayerName] = useState(player.playerName);

  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://the-trivia-api.com/v2/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (rows < MAP_MIN_ROWS  || rows > MAP_MAX_ROWS  || cols < MAP_MIN_COLS || cols > MAP_MAX_COLS) {
      setErrorMessage(`❗Rows and columns must be between ${MAP_MIN_ROWS} and ${MAP_MAX_ROWS}.❗`);
      return;
    }

    // clears the error message
    setErrorMessage("");

    map.cols = cols;
    map.rows = rows;
    map.category = categories[selectedCategory];
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
            onChange={(e) => {
              const value = e.target.value.replace(/^0+/, "");
              if (value === "") {
                setRows(""); 
              } else {
                setRows(Number(value));
              }
            }}
            />
        </div>

        <div className="form-group">
          <label htmlFor="cols">Columns:</label>
          <input
            className="input-settings"
            type="number"
            id="cols"
            value={cols}
            onChange={(e) => {
              const value = e.target.value.replace(/^0+/, "");
                if (value === "") {
                  setCols("");
                } else {
                  setCols(Number(value));
                }
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            className="input-settings"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          
          >
            <option value="">Select a category</option>
            {Object.keys(categories).map((category) => ( 
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
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