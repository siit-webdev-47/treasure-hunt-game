import { useState } from "react";
import { createContext} from "react";
import Settings from "./components/Settings/Settings";
import Game from "./components/Game/Game";
import GameOver from "./components/GameOver/GameOver";
import generateMapTiles from "./components/Functions/generateMapTiles";

 const playerFactory = (playerName = "Anony Moose", playerEnergy = 15) => ({
  playerName,
  playerEnergy,
  get playerAvatar() {
    return `https://api.dicebear.com/9.x/micah/svg?seed=${this.playerName}`;
  }
});

 const mapFactory = (rows, cols, playerPosition = {row: 0, col: 0}) => ({
    rows,
    cols,
    playerPosition,
    tiles: generateMapTiles(rows, cols),
})

function App() {
  const [gamePhase, setGamePhase] = useState('SETTINGS');
  const [player, setPlayer] = useState(playerFactory());
  const [map, setMap] = useState(mapFactory(6, 6));

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


  const evaluateGameState = () => {
    // GAMEPLAY LOGIC

    // FINALLY 
    //setGameState()
  }
  
  return (
    <>
      <h1>Treasure Hunt</h1>
      <AppSettingsContext.Provider value={{player, setPlayer, map, setMap, gamePhase}}>
        <Settings onStartGame={startGame} />
        <Game />
        <GameOver setGamePhase={setGamePhase} newGame={newGame} resetGame={resetGame} />
      </AppSettingsContext.Provider>
      
    </>
  );
}

export const AppSettingsContext = createContext();
export default App;
