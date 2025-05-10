async function fetchQuestionList(number, categories = "", difficulty = "") {
  try {
    let apiQuestionVect = [];

    console.log(`Selected category in fetchQuestionList 1: ${categories}`);

    while (number > 0) {
      let apiUrl = `https://the-trivia-api.com/api/questions?limit=${number}`;
      if (categories.length) {
        apiUrl += '&categories=' + categories.toString();
      }
    
      console.log(`Selected category in fetchQuestionList 2: ${categories}`);

      if (difficulty) {
        apiUrl += `&difficulty=${difficulty}`;
      }

      console.log(`API URL: ${apiUrl}`);

      const response = await fetch(apiUrl);
      const questions = await response.json();

      console.log(`Selected category after fetch: ${questions[0].category}`);

      apiQuestionVect = apiQuestionVect.concat(
        questions.map(questionData => ({
          question: questionData.question,
          category: questionData.category,
          difficulty: questionData.difficulty,
          trueAnsw: questionData.correctAnswer,
          falseAnsw: questionData.incorrectAnswers,
        }))
      );

      number -= 50;
    }

    return apiQuestionVect;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


export default fetchQuestionList;
