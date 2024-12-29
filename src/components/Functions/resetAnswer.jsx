import { useContext } from "react";
import { AppSettingsContext } from "../../App";

function resetAnswer(){
    const { map } = useContext(AppSettingsContext);
      const { row, col } = map.playerPosition;
      map.tiles[row][col].visited = true;
      return(
        <div></div>
      );
}

export default resetAnswer;