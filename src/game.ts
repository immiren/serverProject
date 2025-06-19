import { SelectPlayer } from "./player/player";

export async function StartGame(playerName: string) {
  console.log("\n-----------------PLAYER SETUP START------------------\n");
  const activePlayer = await SelectPlayer(playerName);
  console.log("\n------------------PLAYER SETUP END-------------------\n");
  if (activePlayer?.playerName == playerName) {
    console.log("Active player: ", activePlayer.playerName);
  }
  //check for existing player
  //if exists, console log that
  //if not, create a new player and show the information.
}
