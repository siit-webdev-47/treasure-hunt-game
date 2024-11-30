import { useContext } from "react";
import randomizeAnsw from "../Functions/randomizeAnsw";
import { AppSettingsContext } from "../../App";

function Answers() {
    const { player, map } = useContext(AppSettingsContext);
    const { row, col } = map.playerPosition;
    const { question, trueAnsw, falseAnsw } = map.tiles[row][col];
  
    let listAnsw = randomizeAnsw(trueAnsw, falseAnsw);
    
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return(
        <>
            <p>Question : {question}</p>

        </>
    )
}

export default Answers;