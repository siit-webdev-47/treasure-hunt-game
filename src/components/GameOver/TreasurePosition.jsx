import "./ReviewQuestions.css";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AppSettingsContext } from "../../App";
import ReviewedSingleQuestion from "./ReviewedSingleQuestion";

export default function TreasurePosition({ onCloseTreasurePosition }) {
  const { player } = useContext(AppSettingsContext);

  return (
    <div className="treasure-position">
      <h2>Treasure Position</h2>
      {player.answeredQuestions.map((questionObj, index) => (
        <div key={index}>
          <ReviewedSingleQuestion questionObj={questionObj} index={index} />
        </div>
      ))}
      <br />
      <button onClick={onCloseTreasurePosition}>Close</button>
    </div>
  );
}

TreasurePosition.propTypes = {
  isVisible: PropTypes.bool,
  onCloseReview: PropTypes.func.isRequired,
};
