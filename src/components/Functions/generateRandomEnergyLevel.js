import {energyLevels} from "./energyLevel";

function generateRandomEnergyLevel(level) {
  let min;
  let max;

  if (level === 'hard') {
    min = energyLevels.minStartingLowEnergy;
    max = energyLevels.maxLowEnergy;
  } else if (level === 'medium') {
    min = energyLevels.maxLowEnergy;
    max = energyLevels.maxMidEnergy;
  } else {
    min = energyLevels.maxMidEnergy;
    max = energyLevels.maxHighEnergy;
  }

  console.log(`Level: ${level}`);
  console.log(`Min: ${min}`);
  console.log(`Max: ${max}`);
  
  return Math.floor(Math.random() * (max - min)) + min;
}

export default generateRandomEnergyLevel;
