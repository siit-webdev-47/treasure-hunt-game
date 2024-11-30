import { useContext, useState } from "react";
import PropTypes from 'prop-types';
import { AppSettingsContext } from "../../App";
import "./Answers.css";

function Answers(props) {
  const { listAnsw } = props;
  const { map } = useContext(AppSettingsContext);
  const { row, col } = map.playerPosition;
  const { question } = map.tiles[row][col];

  
  const [selectedOption, setSelectedOption] = useState("option1");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Add your logic to send the selected option here
    console.log("Selected option:", selectedOption);
  };

  return (
    <>
      <p>Question : {question}</p>
      <div className="answersRadio">
        <input
          type="radio"
          value="option1"
          checked={selectedOption === "option1"}
          onChange={handleOptionChange}
        />
        <label>{listAnsw[0]}</label>
        <br />
        <input
          type="radio"
          value="option2"
          checked={selectedOption === "option2"}
          onChange={handleOptionChange}
        />
        <label>{listAnsw[1]}</label>
        <br />
        <input
          type="radio"
          value="option3"
          checked={selectedOption === "option3"}
          onChange={handleOptionChange}
        />
        <label>{listAnsw[2]}</label>
        <br />
        <input
          type="radio"
          value="option4"
          checked={selectedOption === "option4"}
          onChange={handleOptionChange}
        />
        <label>{listAnsw[3]}</label>
        <br />
      </div>
      <button onClick={handleSubmit}>Submit</button>
      {isSubmitted && <p>You selected: {selectedOption}</p>}
    </>
  );
}

export default Answers;


Answers.propTypes = {
    listAnsw: PropTypes.any,
  }