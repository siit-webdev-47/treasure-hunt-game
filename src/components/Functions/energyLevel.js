const energyLevels = {
    minStartingLowEnergy: 5,    // player should not start with less energy than thie value
    maxLowEnergy: 25,
    maxMidEnergy: 50,
    maxHighEnergy: 100
}

function energyLevel(energy) {
    if (energy > 50) return "high-energy";
    if (energy >= 25 && energy <= 50) return "mid-energy";
    return "low-energy";
}
 
export default energyLevel;

