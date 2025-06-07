import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { AppSettingsContext } from "../../App";
import "./Answers.css";
import { ClickContext } from "../Game/Game";
import playAudio from "../Functions/playAudio";
import Timer from "./Timer";
import firstLetterCapital from "../Functions/firstLetterCapital";
import { calculateTimeStats } from "../Functions/gameStatistics";

function Answers({ listAnsw, startTime }) {
  const { map, player } = useContext(AppSettingsContext);
  const { row, col } = map.playerPosition;
  const { question, trueAnsw, difficulty } = map.tiles[row][col];

  const [selectedOption, setSelectedOption] = useState("Time out");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const contextValue = useContext(ClickContext);

  // let goodAnsw = false;
  let streak = player.consecutiveAnswers.number > 1 ? true : false;
  let streakCorrect = player.consecutiveAnswers.correct ? "correct" : "wrong";
  const goodAnsw = selectedOption == trueAnsw ? true : false;

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setIsSubmitted(false);
  };

  const handleClick = () => {
    setIsVisible(false);
    contextValue();
    calculateTimeStats(player);
  };

  const handleSubmit = () => {
    const endTime = Date.now();
    const questionTime = endTime - startTime;

    player.timeStats.totalAnsweringTime += questionTime;  

    setIsSubmitted(true);
    selectedOption == trueAnsw
      ? (map.tiles[row][col].correctAnsw = true)
      : (map.tiles[row][col].correctAnsw = false);

    const responseType = map.tiles[row][col].correctAnsw ? "Correct" : "Wrong";
    const property = `${map.tiles[row][col].difficulty}${responseType}`;
    // const newPlayerResponses = {
    //   ...player.playerResponses,
    //   [property]: player.playerResponses[property] + 1,
    // };

    player.playerResponses[property] += 1 ;

    map.tiles[row][col].correctAnsw == player.consecutiveAnswers.correct
      ? player.consecutiveAnswers.number++
      : ((player.consecutiveAnswers.number = 1),
        (player.consecutiveAnswers.correct = map.tiles[row][col].correctAnsw));

    let bonusEnergyValue =
      player.consecutiveAnswers.number > 4
        ? 3
        : player.consecutiveAnswers.number - 1;
    player.consecutiveAnswers.bonusEnergy =
      (player.consecutiveAnswers.correct ? 1 : -1) * bonusEnergyValue;

    const answerDetails = {
      question: map.tiles[row][col].question,
      trueAnswer: map.tiles[row][col].trueAnsw,
      falseAnswers: map.tiles[row][col].falseAnsw,
      selectedOption,
    };
    player.answeredQuestions.push(answerDetails);

    streak = player.consecutiveAnswers.number > 1 ? true : false;
    streakCorrect = player.consecutiveAnswers.correct ? "correct" : "wrong";

    playAudio(goodAnsw, streak, streakCorrect);
  };

  const handleTimeUp = () => {
    setIsSubmitted(true);
    setSelectedOption("TimeOut");
    handleSubmit();
  };

  return (
    <>
      {isVisible && (
        <div className={`answerWindow ${difficulty}`}>
          <div className={`answerHeader ${difficulty}`}>
            <h2> {firstLetterCapital(difficulty)} question</h2>
          </div>
          <Timer
            time={20}
            difficulty={difficulty}
            onTimeUp={handleTimeUp}
            stopTimer={isSubmitted}
          />
          <header> Question : {question} </header>
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
              {streak && (
                <div className={`streakBonus ${goodAnsw}`}>
                  <p>
                    {" "}
                    You are on a streak! {player.consecutiveAnswers.number}{" "}
                    {streakCorrect} answers!{" "}
                  </p>
                  <p>
                    {" "}
                    You have {player.consecutiveAnswers.bonusEnergy} extra
                    energy points
                  </p>
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
  startTime: PropTypes.any,
};
