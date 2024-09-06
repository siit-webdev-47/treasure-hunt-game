// import generateMapTiles from "./components/Functions/generateMapTiles";
// import mapFactory from "./components/Functions/mapFactory";
// import playerFactory from "./components/Functions/playerFactory";

// const gameLogic = () => {
//     const [gamePhase, setGamePhase] = useState('SETTINGS');
//     const [player, setPlayer] = useState(playerFactory());
//     const [map, setMap] = useState(mapFactory(6, 6));
  
//     const startGame = () => {
//       setMap({...map, tiles: generateMapTiles(map.rows, map.cols)});
//       setPlayer(playerFactory(player.playerName, player.playerEnergy));
//       setGamePhase('ONGOING');
//     };
  
//     const resetGame = () => {
//       setMap((prevMap)=>({
//         ...prevMap,
//         playerPosition : {
//           row: 0, 
//           col: 0
//         },
//         tiles: generateMapTiles(prevMap.rows, prevMap.cols)
//       }));
//       setPlayer((prevPlayer) => ({
//         ...prevPlayer,
//         playerEnergy : 15
//       }));
//       setGamePhase('ONGOING');
      
//     };
  
//     const newGame = () => {
//      setMap(mapFactory(6, 6));
//      setPlayer(playerFactory())
//      setGamePhase('SETTINGS')
//     };
  
  
//     const evaluateGameState = () => {
//       // GAMEPLAY LOGIC
  
//       // FINALLY 
//       //setGameState()
//     }

//     const evaluateGameState = () => {
//         const { row, col } = map.playerPosition;
//         if (player.playerEnergy <= 0) {
//           setGamePhase('GAME_OVER');
//           return { gameOver: true, message: "You ran out of energy!🪦" };
//         }
//         if (map.tiles[row][col].hasTreasure) {
//           setGamePhase('GAME_OVER');
//           return { gameOver: true, message: "You found the treasure!🏆💰" };
//         }
//         return { gameOver: false };
//       };

//     return { player, setPlayer, map, setMap, gamePhase, setGamePhase, startGame, resetGame, newGame, evaluateGameState }

// };

// export default gameLogic;