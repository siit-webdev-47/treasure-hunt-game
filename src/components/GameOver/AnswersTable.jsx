import PropTypes from "prop-types";

export default function AnswersTable({ player }) {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Easy</th>
          <th>Medium</th>
          <th>Hard</th>
          <th>TOTAL</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Correct</td>
          <td>{player.playerResponses.easyCorrect}</td>
          <td>{player.playerResponses.mediumCorrect}</td>
          <td>{player.playerResponses.hardCorrect}</td>
          <td>
            {player.playerResponses.easyCorrect +
              player.playerResponses.mediumCorrect +
              player.playerResponses.hardCorrect}
          </td>
        </tr>
        <tr>
          <td>Wrong</td>
          <td>{player.playerResponses.easyWrong}</td>
          <td>{player.playerResponses.mediumWrong}</td>
          <td>{player.playerResponses.hardWrong}</td>
          <td>
            {player.playerResponses.easyWrong +
              player.playerResponses.mediumWrong +
              player.playerResponses.hardWrong}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

AnswersTable.propTypes = {
  player: PropTypes.any.isRequired,
};
