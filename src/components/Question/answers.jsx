import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { AppSettingsContext } from "../../App";
import "./Answers.css";
import randomizeAnswers from "../Functions/randomizeAnswers";

function Answers() {
  const { map } = useContext(AppSettingsContext);
  const { row, col } = map.playerPosition;
  const { question, trueAnsw, falseAnsw } = map.tiles[row][col];
  const listAnsw = randomizeAnswers(trueAnsw, falseAnsw);

  const [selectedOption, setSelectedOption] = useState(listAnsw[0]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setIsSubmitted(false);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    selectedOption == trueAnsw
      ? (map.tiles[row][col].correctAnsw = true)
      : (map.tiles[row][col].correctAnsw = false);
  };

  const handleKey = () => {
    setIsSubmitted(false);
  };

  document.addEventListener("keyup", handleKey);

  let goodAnsw = selectedOption == trueAnsw ? true : false;

  return (
    <>
      <p>Question : {question}</p>
      <>
        {!isSubmitted && (
          <>
            <div className="answersRadio">
              <input
                type="radio"
                value={listAnsw[0]}
                checked={selectedOption === listAnsw[0]}
                onChange={handleOptionChange}
              />
              <label>{listAnsw[0]}</label>
              <br />
              <input
                type="radio"
                value={listAnsw[1]}
                checked={selectedOption === listAnsw[1]}
                onChange={handleOptionChange}
              />
              <label>{listAnsw[1]}</label>
              <br />
              <input
                type="radio"
                value={listAnsw[2]}
                checked={selectedOption === listAnsw[2]}
                onChange={handleOptionChange}
              />
              <label>{listAnsw[2]}</label>
              <br />
              <input
                type="radio"
                value={listAnsw[3]}
                checked={selectedOption === listAnsw[3]}
                onChange={handleOptionChange}
              />
              <label>{listAnsw[3]}</label>
              <br />
            </div>

            <button onClick={handleSubmit}>Submit</button>
          </>
        )}
      </>
      {isSubmitted && (
        <div className={`answer ${goodAnsw}`}>
          <p>You selected: {selectedOption}</p>
          <p>The correct answer: {trueAnsw}</p>
          {goodAnsw && (
            <p>Correct! You gained {map.tiles[row][col].yieldValue} energy!</p>
          )}
          {!goodAnsw && (
            <p>False! You lost {map.tiles[row][col].yieldValue} energy!</p>
          )}
          <p>Choose your next tile!</p>
        </div>
      )}
    </>
  );
}

export default Answers;

Answers.propTypes = {
  listAnsw: PropTypes.any,
};
