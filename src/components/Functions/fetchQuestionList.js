async function fetchQuestionList(number, categories, difficulty = "") {
  try {
    let apiQuestionVect = [];

    while (number > 0) {
      let apiUrl = `https://the-trivia-api.com/api/questions?limit=${number}`;
      if (categories.length) {
        apiUrl += '&categories=' + categories.toString();
      }
    
      if (difficulty) {
        apiUrl += `&difficulties=${difficulty}`;
      }

      const response = await fetch(apiUrl);
      const questions = await response.json();

      apiQuestionVect = apiQuestionVect.concat(
        questions.map(questionData => ({
          question: questionData.question,
          category: questionData.category,
          difficulty: questionData.difficulty,
          trueAnsw: questionData.correctAnswer,
          falseAnsw: questionData.incorrectAnswers
        }))
      );

      number -= 50;
      console.log(`Category:${categories}`);
      console.log(`Dificulty : ${difficulty}`);
      console.log(apiUrl)
    }

    return apiQuestionVect;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


export default fetchQuestionList;
