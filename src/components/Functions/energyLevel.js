function energyLevel(energy) {
    if (energy > 50) return "high-energy";
    if (energy >= 25 && energy <= 50) return "mid-energy";
    return "low-energy";
}
 
export default energyLevel;

