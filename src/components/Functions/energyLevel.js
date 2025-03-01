export const energyLevels = {
    minStartingLowEnergy: 5, 
    maxLowEnergy: 25,
    maxMidEnergy: 50,
    maxHighEnergy: 100
};


export default function energyLevel(energy) {
    if (energy > energyLevels.maxMidEnergy) return "high-energy";
    if (energy >= energyLevels.maxLowEnergy && energy <= energyLevels.maxMidEnergy) return "mid-energy";
    return "low-energy";
}

 
export function generateRandomEnergyLevel(level) {
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
    
    return Math.floor(Math.random() * (max - min)) + min;
  }