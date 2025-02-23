import { generateRandomEnergyLevel } from "./energyLevel";

const playerFactory = (playerName = "Anony Moose", playerEnergyLevel = 'hard') => {
  const playerEnergy = generateRandomEnergyLevel(playerEnergyLevel);
  return {
    playerName,
    playerStartingEnergyLevel: playerEnergyLevel,
    playerStartingEnergy: playerEnergy,
    playerEnergy,
    get playerAvatar() {
      return `https://api.dicebear.com/9.x/micah/svg?seed=${this.playerName}`;
    }
  }
};

export default playerFactory;