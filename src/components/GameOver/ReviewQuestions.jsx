import "./ReviewQuestions.css";
import { useContext } from 'react';
import { AppSettingsContext } from '../../App';
import ReviewedSingleQuestion from "./ReviewedSingleQuestion";

function ReviewQuestions () {
    const { player } = useContext(AppSettingsContext);

    return (
        <div className='review-questions'>
            <h2>Review Questions</h2>
            {player.answeredQuestions.map((questionObj, index) => (
                <div key={index} >
                    <ReviewedSingleQuestion questionObj={questionObj} index={index} />

                </div>
            ))}
        </div>
    );
}

export default ReviewQuestions;