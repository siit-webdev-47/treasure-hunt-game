import PropTypes from "prop-types";
import "./Player.css";
import energyLevel from "../Functions/energyLevel";

function Player(props) {
  const { playerName, playerEnergy, playerAvatar } = props.playerData;


  return (
    <>
      <h3>{playerName}</h3>
      <img
        src={playerAvatar}
        alt={`${playerName}'s player`}
        className = { `avatar ${energyLevel(playerEnergy)}`}
      />
      <p className={energyLevel(playerEnergy)}>
             Energy Level : {playerEnergy}
      </p>

    </>
  );
}

Player.propTypes = {
  playerData: PropTypes.shape({
    playerName: PropTypes.string.isRequired,
    playerEnergy: PropTypes.number.isRequired,
    playerAvatar: PropTypes.string.isRequired,
  }).isRequired,
};

export default Player;
