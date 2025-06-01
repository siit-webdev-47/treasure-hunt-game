import PropTypes from "prop-types";
import "./HallOfFame.css";

export default function HallOfFame({ onCloseHallOfFame , playerResult}) {
  return (
    <div className="hall-of-fame-wrapper">
      <div className="hall-of-fame-container">
        <h2>Hall of Fame</h2>
      
        <ul>
          <li>{playerResult.date.getFullYear()}-{playerResult.date.getMonth() +1 }-{playerResult.date.getDate()}</li>
          <li>Player 1 - 1000 points</li>
          <li>Player 2 - 900 points</li>
          <li>Player 3 - 800 points</li>
        </ul>
        <button onClick={ onCloseHallOfFame } className="close-button">
          Close
        </button>
      </div>
    </div>
  );
}

HallOfFame.propTypes = {
  onCloseHallOfFame: PropTypes.func.isRequired,
    playerResult: PropTypes.object.isRequired
};