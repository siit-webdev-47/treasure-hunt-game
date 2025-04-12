import { useContext } from "react";
import { AppSettingsContext } from "../../App";
// import { calculateTimeStats } from "../Functions/gameStatistics";

export default function TimeStatistics() {
    const { player } = useContext(AppSettingsContext);
    // calculateTimeStats(player);
    
    return (
        <div >
        <h3>Total time spent: {player.timeStats.totalAnsweringTime/1000} s</h3>
        <h3>Average time: {(player.timeStats.averageAnsweringTime/1000)} s</h3>
        </div>
    );
}