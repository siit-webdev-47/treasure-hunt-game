export default function distanceToTreasure(map) {
  const playerPosition = map.playerPosition;
  const treasurePosition = map.treasurePosition;

  const distance = 
    Math.abs(treasurePosition.row - playerPosition.row) +
    Math.abs(treasurePosition.col - playerPosition.col)  ;

    console.log(`Distance to treasure: ${distance}`);
    
  
  let message = "";  
  let color = "black"; // Default color

  switch (true) {
    case (distance <= 4):
      message = "You are very close to the treasure!";
      color = "green";
      break;
    case (distance > 4 && distance <= 8):
      message = "You are getting closer to the treasure!";
      color = "orange";
      break;
    case (distance > 8):
      message = "You are far from the treasure!";
      color = "red";
      break;
    default:
      console.log("Unknown distance");
  }

  return { message, color};
}