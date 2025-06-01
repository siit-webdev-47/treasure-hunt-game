import PropTypes from "prop-types";
import "./HallOfFame.css";

export default function HallOfFame({ onCloseHallOfFame , playerResult}) {
  
    
  return (
    <div className="hall-of-fame-wrapper">
      <div className="hall-of-fame-container">
        <h2>Hall of Fame</h2>
      
<table className="hall-of-fame-table">
          <thead>
            <tr>
              <th>Possition</th>
              <th>Date</th>
              <th>Player</th>
              <th>Points</th>
              <th>Questions Difficulty</th>
              <th>Map Difficulty</th>
              <th>Time Difficulty</th>
            </tr>
          </thead>
          <tbody>

           {playerResult.map((player, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <div>
                {new Date(player.date).getFullYear()}-
                {new Date(player.date).getMonth() + 1}-
                {new Date(player.date).getDate()}
                </div>
                <div>
                {new Date(player.date).getHours()}:
                {new Date(player.date).getMinutes()}:
                {new Date(player.date).getSeconds()}
                </div>
              </td>
              <td>{player.name}</td>
              <td>{player.finalScore}</td>
              <td>{player.questionDifficultyIndex}%</td>
              <td>{player.mapDifficultyIndex}%</td>
              <td>{player.timeDifficultyIndex}%</td>
            </tr>
           ))}
            
          </tbody>
        </table>
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