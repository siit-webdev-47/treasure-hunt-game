import difficultyIndex, {calculateFinalScore, calculateMapDifficulty, timeDifficultyIndex} from "./gameStatistics";
import { readVectorGoogle, readVectorStorage, saveVectorGoogle } from "./useDB";

export default function generateHallOfFameObj(player, map) {
  const resultObject = {
    name: player.playerName,
    finalScore: calculateFinalScore(map, player).toFixed(2),
    date: new Date(),
    questionDifficultyIndex: difficultyIndex(player.playerResponses),
    mapDifficultyIndex: calculateMapDifficulty(map),
    timeDifficultyIndex: (timeDifficultyIndex(player) * 100).toFixed(2),
  };
  
  return resultObject;
}

function sortVectorByScore(vector) {
  vector.sort((a, b) => {
    if (a.finalScore !== b.finalScore) {
      return b.finalScore - a.finalScore;
    } else {
      return b.questionDifficulty - a.questionDifficulty;
    }
  });
  vector.length = Math.min(vector.length, 20); 
}

function generateHallOfFame(player, map) {
  const hallOfFameObj = generateHallOfFameObj(player, map);
  const newVector = readVectorStorage("HallOfFame");
  const newVector1 = readVectorGoogle("HallOfFame");
  newVector.push(hallOfFameObj);
  const sortedVector = sortVectorByScore(newVector);
  localStorage.setItem("HallOfFame", JSON.stringify(newVector));

  saveVectorGoogle("HallOfFame", newVector);

  console.log(`Hall of fame object: ${newVector1}`);
  

  return sortedVector;
}

export { generateHallOfFame, generateHallOfFameObj };
