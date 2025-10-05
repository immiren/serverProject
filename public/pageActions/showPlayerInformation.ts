import { assertDefined } from "../utils/assertDefined.js";

/**
 * INCOMPLETE Displays player name and other relevant information.
 * @param playerName name of player to be displayed
 */
export function showPlayerInfo(playerName: string) {
  const playerNameElement = assertDefined(document.querySelector("#playerName"));
  playerNameElement.textContent = "Player: " + playerName;
}
