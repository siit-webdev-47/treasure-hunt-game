function difficultyIndex(playerResponses) {
    // Calculate the difficulty index based on the player responses
    // The difficulty index is calculated as the weighted average of the questions answered (media ponderata)
    // The weight for each question is based on its difficulty level
  let playerResponsesArray = Object.values(playerResponses);
    let easyQuestions = playerResponsesArray[0] + playerResponsesArray[1];
    let mediumQuestions = playerResponsesArray[2] + playerResponsesArray[3];    
    let hardQuestions = playerResponsesArray[4] + playerResponsesArray[5];

  let averageSum =  easyQuestions * 0.33 + mediumQuestions * 0.66 + hardQuestions * 1;
  let totalSumResponses = playerResponsesArray.reduce((sum, curr) => sum + curr, 0);
  return (averageSum / totalSumResponses).toFixed(2);
}

function finalScore(playerResponses) {
  return (
    playerResponses.easyCorrect * 2
    - playerResponses.easyWrong * 3 
    + playerResponses.mediumCorrect * 4
    - playerResponses.mediumWrong * 2 
    + playerResponses.hardCorrect * 6
    - playerResponses.hardWrong * 1 
  );
}

export default difficultyIndex;

export { finalScore };