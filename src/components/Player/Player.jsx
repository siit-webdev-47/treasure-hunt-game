import  { useState } from "react";
import "./Player.css";

function Player() {
  const [name, setName] = useState("");
  const [energy, setEnergy] = useState(Math.floor(Math.random() * 50) + 25);
  const [nameConfirmed, setNameConfirmed] = useState(false);

  const energyLevel = (energy) => {
    if (energy > 50) return "high-energy";
    if (energy >= 25 && energy <= 50) return "mid-energy";
    return "low-energy";
  };

  const confirmName = () => {
    setNameConfirmed(true);
  };

  return (
    <>
      <h2>Player component</h2>
      <div>
        <label>
          Name :
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="name-avatar"
            disabled={nameConfirmed}
          />
        </label>
        {!nameConfirmed && (
          <button onClick={confirmName} className="confirm-name-button">
            Confirm Name
          </button>
        )}

        {nameConfirmed && (
          <>
            <h3>{name}</h3>
            <img
              src={`https://api.dicebear.com/9.x/micah/svg?seed=${name}`}
              alt={`${name}'s player`}
              className="avatar"
            />
            <p className={energyLevel(energy)}>
              Energy Level : {energy}
            </p>
            <button
              onClick={() => setEnergy(Math.floor(Math.random() * 75))}
              className="button-energy"
            >
              <span>Change Energy</span>
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default Player;
