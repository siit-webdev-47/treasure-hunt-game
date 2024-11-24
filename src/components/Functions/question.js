import Question from "../Question/QuestionWindow";
import fetchQuestion from "./fetchQuestion";

function question(){

    
    var question;
    let result = fetchQuestion(2).then(myData => {
        if (myData) {
            question = myData; 
            console.log(question);
                 
        }
        return question[0];
    })
    .then(
        data => {
            console.log('Response 3',data.question);
            // Question(data.question) ;
            return(data.question)
            
        }
    );
    return result;
}

export default question;