export default function distanceToTreasure(map) {
  const playerPosition = map.playerPosition;
  const treasurePosition = map.treasurePosition;

  const distance = 
    Math.abs(treasurePosition.row - playerPosition.row) +
    Math.abs(treasurePosition.col - playerPosition.col)  ;

    console.log(`Distance to treasure: ${distance}`);
    
  
  let message = "";  

  switch (true) {
    case (distance <= 4):
      message = "You are very close to the treasure!";
      break;
    case (distance > 4 && distance <= 8):
      message = "You are getting closer to the treasure!";
      break;
    case (distance > 8):
      message = "You are far from the treasure!";
      break;
    default:
      console.log("Unknown distance");
  }

  return message;
}