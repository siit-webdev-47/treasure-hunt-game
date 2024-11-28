async function fetchQuestion(number) {
      try {
        const response = await fetch(`https://the-trivia-api.com/api/questions?limit=${number}`);
        const data = await response.json();
        return data;
    } 
    catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    
    
export default fetchQuestion;
