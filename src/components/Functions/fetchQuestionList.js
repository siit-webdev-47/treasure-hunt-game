async function fetchQuestionList(number) {
  try {
    const response = await fetch(`https://the-trivia-api.com/api/questions?limit=${number}`);
    const apiQuestionVect = await response.json();
    console.log(apiQuestionVect);
    
    return apiQuestionVect.map(questionData => ({
      question: questionData.question,
      category: questionData.category,
      difficulty: questionData.difficulty,
      trueAnsw: questionData.correctAnswer,
      falseAnsw: questionData.incorrectAnswers
    }))
  }
  catch (error) {
    console.error('Error fetching data:', error);
  }
}


export default fetchQuestionList;
