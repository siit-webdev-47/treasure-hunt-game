import { useContext } from "react";
import randomizeAnswers from "../Functions/randomizeAnswers";
import { AppSettingsContext } from "../../App";
import Answers from "./Answers";

function AnswerWindow() {
    const { map } = useContext(AppSettingsContext);
    const { row, col } = map.playerPosition;
    const { trueAnsw, falseAnsw } = map.tiles[row][col];
    const listAnsw = randomizeAnswers(trueAnsw, falseAnsw);
    const startTime = Date.now();
    return(
        <Answers listAnsw = { listAnsw } startTime ={ startTime } />
    );
}

export default AnswerWindow;