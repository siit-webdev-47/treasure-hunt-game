import { useContext, useState, useEffect } from "react";
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
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch("https://the-trivia-api.com/v2/categories")
      .then((response) => response.json())
      .then((data) => {
        console.log("Raspuns API:", data);
        const categoryList = Object.keys(data).map((key) => ({
          name: key,
          id: key ,
        }));
        console.log("Lista categorii:", categoryList);
        setCategories(categoryList);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

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
    player.category = selectedCategory;
    player.playerName = playerName;

    console.log(`Categorie selectata : ${selectedCategory}`);
   


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

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            className="input-settings"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
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