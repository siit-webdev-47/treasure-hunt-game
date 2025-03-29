import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { AppSettingsContext } from "../../App";
import "./Answers.css";
import { ClickContext } from "../Game/Game";

function Answers(props) {
  const { map, player } = useContext(AppSettingsContext);
  const { row, col } = map.playerPosition;
  const { question, trueAnsw, difficulty } = map.tiles[row][col];
  const listAnsw = props.listAnsw;
  const [selectedOption, setSelectedOption] = useState(listAnsw[0]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const contextValue = useContext(ClickContext);


  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setIsSubmitted(false);
  };

  const handleClick = () => {
    setIsVisible(false);
    contextValue();
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    selectedOption == trueAnsw
      ? (map.tiles[row][col].correctAnsw = true)
      : (map.tiles[row][col].correctAnsw = false);

    const audioNr = String(Math.floor(Math.random() * 8) + 1).padStart(2, "0");
    const correctAudioRef = `/src/assets/sounds/correct${audioNr}.mp3`;
    const wrongAudioRef = `/src/assets/sounds/wrong${audioNr}.mp3`;

    map.tiles[row][col].correctAnsw
      ? new Audio(correctAudioRef).play()
      : new Audio(wrongAudioRef).play();

    map.tiles[row][col].correctAnsw == player.consecutiveAnswers.correct
      ? player.consecutiveAnswers.number++
      : ((player.consecutiveAnswers.number = 1),
        (player.consecutiveAnswers.correct =
          map.tiles[row][col].correctAnsw));

    let bonusEnergyValue =
      player.consecutiveAnswers.number > 4
        ? 3
        : player.consecutiveAnswers.number - 1;
    player.consecutiveAnswers.bonusEnergy =
      (player.consecutiveAnswers.correct ? 1 : -1) * bonusEnergyValue;
  };

  const handleKey = () => {
    setIsSubmitted(false);
    setIsVisible(true);
  };

  document.addEventListener("keyup", handleKey);

  let goodAnsw = selectedOption == trueAnsw ? true : false;
  let strike = player.consecutiveAnswers.number > 1 ? true : false;
  let strikeCorrect = player.consecutiveAnswers.correct
    ? "correct"
    : "wrong";

  return (
    <>
      {isVisible && (
        <div className={`answerWindow ${difficulty}`}>
          <p>Question : {question}</p>
          <>
            {!isSubmitted && (
              <>
                <div className="answersRadio">
                  <div>
                    <input
                      type="radio"
                      value={listAnsw[0]}
                      id={listAnsw[0]}
                      checked={selectedOption === listAnsw[0]}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor={listAnsw[0]}>{listAnsw[0]}</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      value={listAnsw[1]}
                      id={listAnsw[1]}
                      checked={selectedOption === listAnsw[1]}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor={listAnsw[1]}>{listAnsw[1]}</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      value={listAnsw[2]}
                      id={listAnsw[2]}
                      checked={selectedOption === listAnsw[2]}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor={listAnsw[2]}>{listAnsw[2]}</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      value={listAnsw[3]}
                      id={listAnsw[3]}
                      checked={selectedOption === listAnsw[3]}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor={listAnsw[3]}>{listAnsw[3]}</label>
                  </div>
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
                <p>
                  Correct! You gained {map.tiles[row][col].yieldValue} energy!
                </p>
              )}
              {!goodAnsw && (
                <p>False! You lost {map.tiles[row][col].yieldValue} energy!</p>
              )}
              {strike && (
                <div className={`strikeBonus ${goodAnsw}`}>
                  <p> You are on a strike! {player.consecutiveAnswers.number}{" "} {strikeCorrect} answers! </p>
                  <p> You have {player.consecutiveAnswers.bonusEnergy} extra energy points</p>
                </div>
              )}
              <p>Choose your next tile!</p>
              <button onClick={handleClick}>Continue</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Answers;

Answers.propTypes = {
  listAnsw: PropTypes.any,
};
