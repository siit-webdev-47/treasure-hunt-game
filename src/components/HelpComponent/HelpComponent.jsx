import "./HelpComponent.css";
import { useContext, useEffect, useState } from "react";
import SeeDistanceToTreasure from "../SeeDistanceToTreasure/SeeDistanceToTreasure";
import { AppSettingsContext } from "../../App";
import { energyLevels } from "../Functions/energyLevel";
import IncreaseViewRange from "../IncreaseViewrange/IncreaseViewrange";
import { setVisibility } from "../Functions/updateVisibility";

export default function HelpComponent() {
  const { player, setPlayer } = useContext(AppSettingsContext);
  const { map, setMap } = useContext(AppSettingsContext);
  const [isSeeDistanceAvailable, setIsSeeDistanceAvailable] = useState(false);
  const [isIncreaseViewRangeAvailable, setIsIncreaseViewRangeAvailable] =
    useState(false);

  useEffect(() => {
    setIsSeeDistanceAvailable(player.playerEnergy >= energyLevels.maxLowEnergy);
  }, [player.playerEnergy]);

  useEffect(() => {
    setIsIncreaseViewRangeAvailable(
      player.playerEnergy >= energyLevels.maxLowEnergy
    );
  }, [player.playerEnergy]);

  function handleActivateSeeDistance() {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      canSeeDistance: true,
      playerEnergy: prevPlayer.playerEnergy - energyLevels.maxLowEnergy,
    }));
  }
  function handleActivateIncreaseViewRange() {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      canIncreaseViewRange: true,
      playerEnergy: prevPlayer.playerEnergy - energyLevels.maxLowEnergy,
      viewRange: 2,
    }));
  }

  useEffect(() => {
    if (player.canIncreaseViewRange) {
      setVisibility(map, map.playerPosition.row, map.playerPosition.col, player.viewRange);
      setMap((prevMap) => ({ ...prevMap }));
    }
  }, [player.viewRange]);

  return (
    <div className="help-container">

      <SeeDistanceToTreasure
        onActivateSeeDistance={handleActivateSeeDistance}
        isSeeDistanceAvailable={isSeeDistanceAvailable}
      />

      <IncreaseViewRange
        onActivateIncreaseViewRange={handleActivateIncreaseViewRange}
        isIncreaseViewRangeAvailable={isIncreaseViewRangeAvailable}
      />
      
    </div>
  );
}
