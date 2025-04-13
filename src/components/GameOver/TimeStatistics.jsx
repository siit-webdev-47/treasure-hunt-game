import PropTypes from "prop-types";

export default function TimeStatistics({ player }) {

    
    return (
        <div >
        <h3>Total time spent answering questions: {player.timeStats.totalAnsweringTime/1000} s</h3>
        <h3>Average time to answer questions: {(player.timeStats.averageAnsweringTime/1000).toFixed(3)} s</h3>
        </div>
    );
}

TimeStatistics.propTypes = {
  player: PropTypes.any,
};