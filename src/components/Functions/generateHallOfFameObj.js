import difficultyIndex, {calculateFinalScore, calculateMapDifficulty, timeDifficultyIndex} from "./gameStatistics";
import { readVectorStorage } from "./useDB";

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
}

function generateHallOfFame(player, map) {
  const hallOfFameObj = generateHallOfFameObj(player, map);
  const newVector = readVectorStorage("HallOfFame");
  newVector.push(hallOfFameObj);
  const sortedVector = sortVectorByScore(newVector);
  localStorage.setItem("HallOfFame", JSON.stringify(newVector));

  return sortedVector;
}

export { generateHallOfFame, generateHallOfFameObj };
