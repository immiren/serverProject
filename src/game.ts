import { ResourceSchema } from "./items/itemSchemas";
import { SelectPlayer } from "./player/player";

export function StartGame(playerName:string){
    const activePlayer = SelectPlayer(playerName);
    if (activePlayer?.playerName == playerName) {
        console.log('Active player: ', activePlayer.playerName);
    }
    //check for existing player
    //if exists, console log that
    //if not, create a new player and show the information.
}