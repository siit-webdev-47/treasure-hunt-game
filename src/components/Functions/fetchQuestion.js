async function fetchQuestion(number) {
        let myData;
      try {
        const response = await fetch(`https://the-trivia-api.com/api/questions?limit=${number}`);
        const data = await response.json();
        // console.log(data); // Log the data within the function
        myData = data;
        // console.log(myData); // Log the data within the function
        return myData;
    } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    
    
export default fetchQuestion;
