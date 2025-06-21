import "./HelpComponent.css"
import { useContext, useEffect, useState } from "react";
import SeeDistanceToTreasure from "../SeeDistanceToTreasure/SeeDistanceToTreasure";
// import Teleport from "../Teleport/Teleport";
import { AppSettingsContext } from "../../App";
import { energyLevels } from "../Functions/energyLevel";
// import { updateVisibilityTile } from "../Functions/updateVisibilityTile";

export default function HelpComponent() {
  const { player, setPlayer} = useContext(AppSettingsContext);
//   const {  map, setMap } = useContext(AppSettingsContext);
//   const [isTeleportAvailable, setIsTeleportAvailable] = useState(false);
  const [isSeeDistanceAvailable, setIsSeeDistanceAvailable] = useState(false);
//   const [teleportMode, setTeleportMode] = useState(false);
//   const [pendingTeleport, setPendingTeleport] = useState(null);

//   useEffect(() => {
//     setIsTeleportAvailable(player.playerEnergy >= energyLevels.maxMidEnergy);
//   }, [player.playerEnergy]);
  useEffect(() => {
    setIsSeeDistanceAvailable(player.playerEnergy >= energyLevels.maxLowEnergy);
  }, [player.playerEnergy]);
//   function handleActivateTeleport() {
//     setTeleportMode(true);
//     setPendingTeleport(null);
//   }

  function handleActivateSeeDistance() {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      canSeeDistance: true,
      playerEnergy: prevPlayer.playerEnergy - energyLevels.maxLowEnergy,
    }));
  }

//   function confirmTeleport() {
//     if (!pendingTeleport) return;

//     const { row: teleportRow, col: teleportCol } = pendingTeleport;

//     const updatedTiles = updateVisibilityTile(map, teleportRow, teleportCol);

//     updatedTiles[teleportRow][teleportCol] = {
//       ...updatedTiles[teleportRow][teleportCol],
//       yieldValue: 0,
//       visited: false,
//     };

//     setMap((prevMap) => ({
//       ...prevMap,
//       playerPosition: { row: teleportRow, col: teleportCol },
//       tiles: updatedTiles,
//     }));

//     setPlayer((prevPlayer) => ({
//       ...prevPlayer,
//       playerEnergy: prevPlayer.playerEnergy - energyLevels.maxMidEnergy,
//       canMove: false,
//     }));

//     setIsTeleportAvailable(false);
//     setTeleportMode(false);
//     setPendingTeleport(null);
//   }

//   function cancelTeleport() {
//     setTeleportMode(false);
//     setPendingTeleport(null);
//   }

  return (
    <div className="help-container">
      {/* {isTeleportAvailable && (
        <Teleport onActivateTeleport={handleActivateTeleport} />
      )} */}

     
        <SeeDistanceToTreasure
          onActivateSeeDistance={handleActivateSeeDistance}
          isSeeDistanceAvailable={isSeeDistanceAvailable}
        />
    

      {/* {teleportMode && !pendingTeleport && (
        <div className="teleport-info">
          <p>Click on the map to select a tile to teleport to.</p>
          <button className="button-cancel" onClick={cancelTeleport}>
            Cancel Teleport
          </button>
        </div>
      )} */}
    </div>
  );
}
