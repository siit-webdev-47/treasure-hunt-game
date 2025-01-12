import { useState } from "react";
import { createContext } from "react";
import Settings from "./components/Settings/Settings";
import Game from "./components/Game/Game";
import GameOver from "./components/GameOver/GameOver";
import generateMapTiles from "./components/Functions/generateMapTiles";
import mapFactory from "./components/Functions/mapFactory";
import playerFactory from "./components/Functions/playerFactory";

const defaultMap = mapFactory(6, 6);
const defaultPlayer = playerFactory('Anony Moose', 20);

function App() {
  const [gamePhase, setGamePhase] = useState('SETTINGS');
  const [player, setPlayer] = useState(defaultPlayer);
  const [map, setMap] = useState(defaultMap);
  const [gameOverMsg, setGameOverMsg] = useState('')

  const startGame = () => {
    const { tiles, questionListUpdatePromise } = generateMapTiles(map.rows, map.cols, map.category);
    setMap({ ...map, tiles });

    questionListUpdatePromise
      .then(updatedTiles => {
        setMap({ ...map, updatedTiles })
        setPlayer(playerFactory(player.playerName, player.playerEnergy));
        setGamePhase('ONGOING');
      })
  };


  const resetGame = () => {
    const { tiles, questionListUpdatePromise } = generateMapTiles(map.rows, map.cols);
    questionListUpdatePromise
    .then(updatedTiles => {
    setMap((prevMap) => ({
      ...prevMap,
      playerPosition: {
        row: 0,
        col: 0
      },
      tiles: updatedTiles,
    }));

    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      playerEnergy: 15
    }));

    setGamePhase('ONGOING');
  })};


  const newGame = () => {
    setMap(defaultMap);
    setPlayer(defaultPlayer);
    setGamePhase('SETTINGS')
  };


  const evaluateGameState = (energy, position = {row : 1 , col : 1} ) => {
    if (energy <= 0) {
      setGamePhase('GAME_OVER');
      setGameOverMsg("You ran out of energy!🪦");
      return { gameOverMsg };
    }

    const { row, col } = position;

    if (map.tiles[row][col].hasTreasure) {
      setGamePhase('GAME_OVER');
      setGameOverMsg("🏆 You found the treasure! 💰");
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
      <AppSettingsContext.Provider value={{ player, setPlayer, map, setMap, gamePhase }}>
        {gamePhase === 'SETTINGS' && <Settings onStartGame={startGame} />}
        {gamePhase === "ONGOING" && <Game onPlayerMove={onPlayerMove} onPlayerAnswer={onPlayerAnswer} />}
        {gamePhase === 'GAME_OVER' && <GameOver newGame={newGame} resetGame={resetGame} gameOverMsg={gameOverMsg} />}
      </AppSettingsContext.Provider>

    </>
  );
}

export const AppSettingsContext = createContext();
export default App;


