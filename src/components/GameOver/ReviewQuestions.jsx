import "./ReviewQuestions.css";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AppSettingsContext } from "../../App";
import ReviewedSingleQuestion from "./ReviewedSingleQuestion";

export default function ReviewQuestions({ onClose }) {
  const { player } = useContext(AppSettingsContext);

  return (
    <div className="review-questions">
      <h2>Review Questions</h2>
      {player.answeredQuestions.map((questionObj, index) => (
        <div key={index}>
          <ReviewedSingleQuestion questionObj={questionObj} index={index} />
        </div>
      ))}
      <br />
      <button onClick={onClose}>Close</button>
    </div>
  );
}

ReviewQuestions.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
