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

const mapFactory = (rows = 6, cols = 6, playerPosition = {row: 0, col: 0}) => ({
    rows,
    cols,
    playerPosition,
    tiles: generateMapTiles(rows, cols),
})

function App() {
  const [gamePhase, setGamePhase] = useState('SETTINGS');
  const [player, setPlayer] = useState(playerFactory());
  const [rows, setRows] = useState(6);
  const [cols, setCols] = useState(6);

  const [map, setMap] = useState(mapFactory(rows, cols));

  const startGame = () => {
    setMap({...map, tiles: generateMapTiles(map.rows, map.cols)});
    setPlayer(playerFactory(player.playerName, player.playerEnergy));
    setGamePhase('ONGOING');
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
        <GameOver />
      </AppSettingsContext.Provider>
      
    </>
  );
}

export const AppSettingsContext = createContext();
export default App;
