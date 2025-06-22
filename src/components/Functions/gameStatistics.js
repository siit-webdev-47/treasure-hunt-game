/**
 *  Calculate the difficulty index based on the player responses
 *  The difficulty index is calculated as the weighted average of the questions answered (media ponderata)
 *  The weight for each question is based on its difficulty level
 */
function difficultyIndex(playerResponses) {
  let playerResponsesArray = Object.values(playerResponses);
  let easyQuestions = playerResponsesArray[0] + playerResponsesArray[1];
  let mediumQuestions = playerResponsesArray[2] + playerResponsesArray[3];
  let hardQuestions = playerResponsesArray[4] + playerResponsesArray[5];

  let averageSum =
    easyQuestions * 0.33 + mediumQuestions * 0.66 + hardQuestions * 1;
  let totalSumResponses = playerResponsesArray.reduce(
    (sum, curr) => sum + curr,
    0
  );
  return ((averageSum / totalSumResponses) * 100).toFixed(0);
}

function questionScore(player) {
 
  const playerResponses = player.playerResponses;
 
  return (
    playerResponses.easyCorrect * 2 -
    playerResponses.easyWrong * 3 +
    playerResponses.mediumCorrect * 4 -
    playerResponses.mediumWrong * 2 +
    playerResponses.hardCorrect * 6 -
    playerResponses.hardWrong * 1 
  );
}

function calculateTimeStats(player) {

  player.timeStats.averageAnsweringTime =
    player.timeStats.totalAnsweringTime / player.answeredQuestions.length;
  return;
}

function calculateMapDifficulty(map) {
  let totalTiles = map.rows * map.cols;
  let mapDifficulty = totalTiles > 100 ? 100 + (totalTiles - 100) / 3 : 50 + totalTiles / 2;

  return mapDifficulty ;
}

function calculateFinalScore(map, player) {

let finalScore = (questionScore(player, map)  * timeDifficultyIndex(player) * calculateMapDifficulty(map)/100 ) + finishBonus(player, map) + startingBonus(player);
if (Number.isNaN(finalScore)) {
    finalScore = 0;
  }
return finalScore;
}

function timeDifficultyIndex(player) {
  return 10 / (player.timeStats.averageAnsweringTime / 1000);
}

function finishBonus(player, map) {
  const { row, col } = map.playerPosition;
  return map.tiles[row][col].hasTreasure ? 10 : 0;
}

function startingBonus(player) {
  if (player.playerStartingEnergyLevel === "medium") {
    return 20;
  } else if (player.playerStartingEnergyLevel === "hard") {
    return 40;
  }
  return 0;
}

export default difficultyIndex;

export { questionScore, calculateTimeStats, calculateMapDifficulty, calculateFinalScore, timeDifficultyIndex, finishBonus, startingBonus };
