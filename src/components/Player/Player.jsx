import PropTypes from "prop-types";
import "./Player.css";

function Player(props) {
  const { playerName, playerEnergy, playerAvatar } = props.playerData;

  const energyLevel = (energy) => {
      if (energy > 50) return "high-energy";
      if (energy >= 25 && energy <= 50) return "mid-energy";
     return "low-energy";
    };

  return (
    <>
      <h3>{playerName}</h3>
      <img
        src={playerAvatar}
        alt={`${playerName}'s player`}
        className = { `avatar-${energyLevel(playerEnergy)}` }
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
