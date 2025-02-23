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
 