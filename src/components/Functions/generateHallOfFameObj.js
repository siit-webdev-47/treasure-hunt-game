
import difficultyIndex, { calculateFinalScore, calculateMapDifficulty, timeDifficultyIndex } from "./gameStatistics";

export default function generateHallOfFameObj( player, map ) {

    const resultObject = {
        name: player.playerName,
        finalScore: calculateFinalScore(map, player).toFixed(2),
        date: new Date(),
        questionDifficultyIndex: difficultyIndex(player.playerResponses),
        mapDifficultyIndex: calculateMapDifficulty(map),
        timeDifficultyIndex: timeDifficultyIndex(player),

    };


  return  resultObject;
}