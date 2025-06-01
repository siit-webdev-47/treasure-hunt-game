import { useState } from "react";
import { createContext } from "react";
import Settings from "./components/Settings/Settings";
import Game from "./components/Game/Game";
import GameOver from "./components/GameOver/GameOver";
import generateMapTiles from "./components/Functions/generateMapTiles";
import mapFactory from "./components/Functions/mapFactory";
import playerFactory from "./components/Functions/playerFactory";
import generateRandomPlayerPosition from "./components/Functions/generateRandomPlayerPosition";
import { calculateTimeStats } from "./components/Functions/gameStatistics";
import { generateHallOfFame } from "./components/Functions/generateHallOfFameObj";

const defaultPlayerResponses = {
  easyCorrect: 0,
  easyWrong: 0,
  mediumCorrect: 0,
  mediumWrong: 0,
  hardCorrect: 0,
  hardWrong: 0,
};
const defaultMap = mapFactory(10, 10);
const defaultPlayerEnergyLevel = "hard";
const defaultPlayer = playerFactory("Anony Moose", defaultPlayerEnergyLevel);

function App() {
  const [gamePhase, setGamePhase] = useState("SETTINGS");
  const [player, setPlayer] = useState(defaultPlayer);
  const [map, setMap] = useState(defaultMap);
  const [gameOverMsg, setGameOverMsg] = useState("");

  const startGame = () => {

    map.playerPosition = generateRandomPlayerPosition( map.rows, map.cols );
    const { tiles, questionListUpdatePromise } = generateMapTiles(
      map.rows,
      map.cols,
      map.category,
      map.subcategories,
      map.questionDifficulty,
      map.playerPosition
    );
    setMap({ ...map, tiles });

    questionListUpdatePromise.then((updatedTiles) => {
      setMap({
        ...map,
        playerPosition: map.playerPosition,
        tiles: updatedTiles,
      });
      setPlayer(
        playerFactory(player.playerName, player.playerStartingEnergyLevel)
      );
      setGamePhase("ONGOING");
    });

  };

  const resetGame = () => {
    map.playerPosition = generateRandomPlayerPosition( map.rows, map.cols );
    const { questionListUpdatePromise } = generateMapTiles(
      map.rows,
      map.cols,
      map.category,
      map.subcategories,
      map.questionDifficulty,
      map.playerPosition
    );
    questionListUpdatePromise.then((updatedTiles) => {
      setMap((prevMap) => ({
        ...prevMap,
        playerPosition: map.playerPosition ,
        tiles: updatedTiles,
      }));

      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        playerEnergy: prevPlayer.playerStartingEnergy,
        playerResponses: defaultPlayerResponses,
        answeredQuestions: [],
        timeStats: {
          totalAnsweringTime: 0,
          averageAnsweringTime: 0,
        },
        consecutiveAnswers: {
          number: 0,
          correct: true,
          bonusEnergy: 0,
        },
        canMove: true,
      }));

      setGamePhase("ONGOING");
    });
  };

  const newGame = () => {
    setPlayer(defaultPlayer);
    setGamePhase("SETTINGS");
  };

  const evaluateGameState = (energy, position = { row: 1, col: 1 }) => {
    if (energy <= 0) {
      setGamePhase("GAME_OVER");
      setGameOverMsg("You ran out of energy!🪦");
      calculateTimeStats(player);
      generateHallOfFame(player, map);
      return { gameOverMsg };
    }

    const { row, col } = position;

    if (map.tiles[row][col].hasTreasure) {
      setGamePhase("GAME_OVER");
      setGameOverMsg("🏆 You found the treasure! 💰");
      calculateTimeStats(player);
      generateHallOfFame(player, map);
      return { gameOverMsg };
    }
  };

  const onPlayerMove = (updatedEnergy, updatedPosition) => {
    evaluateGameState(updatedEnergy, updatedPosition);
  };

  const onPlayerAnswer = (updatedEnergy) => {
    evaluateGameState(updatedEnergy);
  };

  return (
    <>
      <h1>Treasure Hunt</h1>
      <AppSettingsContext.Provider
        value={{ player, setPlayer, map, setMap, gamePhase }}
      >
        {gamePhase === "SETTINGS" && <Settings onStartGame={startGame} />}
        {gamePhase === "ONGOING" && (
          <Game onPlayerMove={onPlayerMove} onPlayerAnswer={onPlayerAnswer} />
        )}
        {gamePhase === "GAME_OVER" && (
          <GameOver
            newGame={newGame}
            resetGame={resetGame}
            gameOverMsg={gameOverMsg}
          />
        )}
      </AppSettingsContext.Provider>
    </>
  );
}

export const AppSettingsContext = createContext();
export default App;
