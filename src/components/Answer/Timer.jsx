import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Timer.css";

export default function Timer({ time, difficulty }) {
  const [seconds, setSeconds] = useState(time * 10);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const percentage = (seconds / 10 / time) * 100;

  return (
    <div>
      <div className="countdown-container">
        <div className="countdown-bar">
          <div className="countdown-text">
            {(seconds / 10).toFixed(1)}s
          </div>
          <div
            className={`countdown-fill ${difficulty}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
Timer.propTypes = {
  time: PropTypes.number,
  difficulty: PropTypes.string,
};
