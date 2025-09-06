import "./GameOver.css";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import GameOverStatistics from "./GameOverStatistics";
import ReviewQuestions from "./ReviewQuestions";
import { AppSettingsContext } from "../../App";
import FinalScore from "./FinalScore";
import HallOfFame from "./HallOfFame";
import { readVectorStorage } from "../Functions/useDB";
import TreasurePosition from "./TreasurePosition";

export default function GameOver({ newGame, resetGame, gameOverMsg, treasurePosition }) {
  const [showReviewQuestions, setShowReviewQuestions] = useState(false);
  const [showGameOverStatistics, setShowGameOverStatistics] = useState(false);
  const [showHallOfFame, setShowHallOfFame] = useState(false);
  const [showTreasurePosition, setShowTreasurePosition] = useState(false);
  const { map, player } = useContext(AppSettingsContext);

  const reviewQuestionsClick = () => {
    setShowReviewQuestions(true);
  };

  const onCloseReview = () => {
    setShowReviewQuestions(false);
  };

  const gameOverStatisticsClick = () => {
    setShowGameOverStatistics(true);
  };

  const onCloseStatistics = () => {
    setShowGameOverStatistics(false);
  };

  const hallOfFameClick = () => {
    setShowHallOfFame(true);
  };

  const onCloseHallOfFame = () => {
    setShowHallOfFame(false);
  };
  const treasurePositionClick = () => {
    setShowTreasurePosition(true);
  };

  const onCloseTreasurePosition = () => {
    setShowTreasurePosition(false);
  };

  const foundTreasure = map.treasurePosition.row == map.playerPosition.row && map.treasurePosition.col == map.playerPosition.col ? true : false;

  return (
    <div className="game-over-wrapper">
      <div className="game-over-container">
        <div>
          <p>Game Over!</p>
          <p>{gameOverMsg}</p>
          <FinalScore player={player} map={map} />

        </div>
        {showGameOverStatistics && (
          <GameOverStatistics onCloseStatistics={onCloseStatistics} />
        )}
        {showReviewQuestions && (
          <ReviewQuestions onCloseReview={onCloseReview} />
        )}
        {showTreasurePosition && (
          <TreasurePosition treasurePosition={treasurePosition} onCloseTreasurePosition={onCloseTreasurePosition} />
        )}
        {showHallOfFame && (
          <HallOfFame
            player={player}
            playerResult={readVectorStorage("HallOfFame")}
            onCloseHallOfFame={onCloseHallOfFame}
          />
        )}
        <div className="game-over-buttons">
          <div className="info-buttons-container">
            {!foundTreasure && 
            <button onClick={treasurePositionClick} className="info-buttons">
              Treasure Position
            </button> }
            <button onClick={reviewQuestionsClick} className="info-buttons">
              Review Questions
            </button>
            <button onClick={gameOverStatisticsClick} className="info-buttons">
              Game Over Statistics
            </button>
            <button onClick={hallOfFameClick} className="info-buttons">
              Hall of fame
            </button>
          </div>
          <div className="reset-buttons-container">
            <button onClick={resetGame} className="reset-buttons round">
              Reset Round
            </button>
            <button onClick={newGame} className="reset-buttons game">
              Reset Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

GameOver.propTypes = {
  resetGame: PropTypes.func.isRequired,
  newGame: PropTypes.func.isRequired,
  gameOverMsg: PropTypes.string.isRequired,
  treasurePosition: PropTypes.shape({
    row: PropTypes.number,
    col: PropTypes.number,
  }),
};
