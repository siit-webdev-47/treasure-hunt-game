import { useContext, useState } from "react";
import "./Player.css";
import { MapContext } from "../../App";


function Player() {
  const [name, setName] = useState("");

  const [energy, setEnergy] = useState(Math.floor(Math.random() * 50) + 25);

  const { setPlayerName } = useContext(MapContext);
  // console.log({tiles});



  const energyColor = (energy) => {
    if (energy > 50) {
      return "green";
    } else {
      if (energy >= 25 && energy <= 50) {
        return "yellow";
      } else {
        return "red";
      }
    }
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
            onChange={(e) => {
              setName(e.target.value)
              setPlayerName(e.target.value)
            }} // update the name to the state sent in the context with the name provided by the user
            className="nameAvatar"
          />
        </label>

        {name && (
          <>
            <h3>{name}</h3>
            <img
              src={`https://api.dicebear.com/9.x/micah/svg?seed=${name}`}
              alt={`${name}'s player`}
              className="avatar"
            />
            <p className="energy" style={{ color: energyColor(energy) }}>
              Energy Level : {energy}
            </p>
            <button
              onClick={() => setEnergy(Math.floor(Math.random() * 50)+ 25)}
              className="buttonEnergy">
              <span>Change Energy</span>
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default Player;
