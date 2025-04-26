import "./GameOverStatistics.css";
import { useContext } from "react";
import PropTypes from "prop-types";
import { AppSettingsContext } from "../../App";

import TimeStatistics from "./TimeStatistics";
import DifficultyIndex from "./DifficultyIndex";
import QuestionsScore from "./QuestionScore";
import AnswersTable from "./AnswersTable";
import MapDifficulty from "./MapDifficulty";

export default function GameOverStatistics({ onCloseStatistics }) {
  const { player, map } = useContext(AppSettingsContext);
  

  return (
    <div className="game-over-statistics">
      <h2>Game Over Statistics</h2>
      <QuestionsScore player = { player } />
      <DifficultyIndex player = { player } /> 
      <MapDifficulty map = {map} />
      <TimeStatistics player = { player }/>
      <AnswersTable player = { player } />
      
      <br />
      <button onClick={onCloseStatistics}>Close</button>
    </div>
  );
}
GameOverStatistics.propTypes = {
  onCloseStatistics: PropTypes.any,
};
