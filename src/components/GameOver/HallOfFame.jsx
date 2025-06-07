import PropTypes from "prop-types";
import "./HallOfFame.css";
import { timeDifficultyIndex } from "../Functions/gameStatistics";
import { useEffect, useRef } from "react";


export default function HallOfFame({
  onCloseHallOfFame,
  playerResult,
  player,
}) {
  const actualTimeIndex = (timeDifficultyIndex(player) * 100).toFixed(2);
   const currentPlayerRowRef = useRef(null);

  useEffect(() => {
    if (currentPlayerRowRef.current) {
      currentPlayerRowRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);

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
            {playerResult.map((playerOnList, index) => (
              <tr key={index} 
                  className={`${actualTimeIndex === playerOnList.timeDifficultyIndex ? "current-player" : ""}`}
                  ref={actualTimeIndex === playerOnList.timeDifficultyIndex ? currentPlayerRowRef : null}
              >
                <td>{index + 1}</td>
                <td>
                  <div>
                    {new Date(playerOnList.date).getFullYear()}-
                    {new Date(playerOnList.date).getMonth() + 1}-
                    {new Date(playerOnList.date).getDate()}
                  </div>
                  <div>
                    {new Date(playerOnList.date).getHours()}:
                    {new Date(playerOnList.date).getMinutes()}:
                    {new Date(playerOnList.date).getSeconds()}
                  </div>
                </td>
                <td>{playerOnList.name}</td>
                <td>{playerOnList.finalScore}</td>
                <td>{playerOnList.questionDifficultyIndex}%</td>
                <td>{playerOnList.mapDifficultyIndex}%</td>
                <td>{playerOnList.timeDifficultyIndex}%</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onCloseHallOfFame} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
}

HallOfFame.propTypes = {
  onCloseHallOfFame: PropTypes.func,
  playerResult: PropTypes.array,
  player: PropTypes.object,
};
