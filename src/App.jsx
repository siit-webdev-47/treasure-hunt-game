import { useState } from "react";
import { createContext} from "react";
import Settings from "./components/Settings/Settings";
import Game from "./components/Game/Game";
import GameOver from "./components/GameOver/GameOver";
import generateMapTiles from "./components/Functions/generateMapTiles";
import mapFactory from "./components/Functions/mapFactory";
import playerFactory from "./components/Functions/playerFactory";

function App() {
  const [gamePhase, setGamePhase] = useState('SETTINGS');
  const [player, setPlayer] = useState(playerFactory());
  const [map, setMap] = useState(mapFactory(6, 6));
  const [gameOverMsg, setGameOverMsg] = useState('')

  const startGame = () => {
    setMap({...map, tiles: generateMapTiles(map.rows, map.cols)});
    setPlayer(playerFactory(player.playerName, player.playerEnergy));
    setGamePhase('ONGOING');
  };

  const resetGame = () => {
    setMap((prevMap)=>({
      ...prevMap,
      playerPosition : {
        row: 0, 
        col: 0
      },
      tiles: generateMapTiles(prevMap.rows, prevMap.cols)
    }));
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      playerEnergy : 15
    }));
    setGamePhase('ONGOING');
    
  };

  const newGame = () => {
   setMap(mapFactory(6, 6));
   setPlayer(playerFactory())
   setGamePhase('SETTINGS')
  };

  const evaluateGameState = (energy , position) => {
    const { row, col } = position;    
    
    if (energy <= 0) {
      setGamePhase('GAME_OVER');
      setGameOverMsg("You ran out of energy!🪦");
      return { gameOverMsg};
    }
    
    if (map.tiles[row][col].hasTreasure) {
      setGamePhase('GAME_OVER');
      setGameOverMsg("🏆 You found the treasure! 💰");
      return { gameOverMsg};
    }
  };

  const onPlayerMove = (updatedEnergy, updatedPosition) => {
    evaluateGameState(updatedEnergy, updatedPosition);
  };
  
  return (
    <>
      <h1>Treasure Hunt</h1>
      <AppSettingsContext.Provider value={{player, setPlayer, map, setMap, gamePhase}}>
        <Settings onStartGame={startGame} />
        <Game onPlayerMove={onPlayerMove} />
        <GameOver newGame={newGame} resetGame={resetGame} gameOverMsg={gameOverMsg} />
      </AppSettingsContext.Provider>
      
    </>
  );
}

export const AppSettingsContext = createContext();
export default App;


