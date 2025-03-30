import PropTypes from "prop-types";

export default function ReviewedSingleQuestion({ questionObj, index }) {
  const { question, selectedOption, trueAnswer, falseAnswers } = questionObj;
  const isCorrect = (selectedOption === trueAnswer) ? "correct" : "incorrect";

  return (
    <div className={`reviewed-question ${isCorrect}`}>
        <div className="question">

      <h3>Question nr. {index+1}: </h3>
      <h4>{question}</h4>
        </div>
      <h3>Correct Answer: </h3>
      <h4 className={`correctAnswer ${isCorrect}`}>{questionObj.trueAnswer}</h4>
      <h3>False answers:</h3>
      <div>
        {falseAnswers.map((option, idx) => (
          <div key={idx}>
            <h4 className={`falseAnswer ${(option === selectedOption) ? "correct" : "incorrect"}`}>{option}</h4>
          </div>
        ))}
      </div>
      <h3>Your Answer:</h3>
      <h4 className={`yourAnswer ${isCorrect}`}>{selectedOption}</h4>
    </div>
  );
}

ReviewedSingleQuestion.propTypes = {
  questionObj: PropTypes.any,
    index: PropTypes.number,
};
