import { PlayerType } from "../player/playerSchemas";

export function GeneratePlayerViewHTML(playerData: PlayerType){
    const header = document.querySelector("header");
    const myH1 = document.createElement("h1");
    const headerText = 'Player: ' + playerData.playerName;
    myH1.textContent = headerText;
    //header.appendChild(myH1);
}