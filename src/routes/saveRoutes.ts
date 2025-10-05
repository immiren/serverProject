import express from "express";
import { StartGame } from "../game";
import { listGameSaves, newGameSave } from "../gameSaves/accessGameSave";

const saveRouter = express.Router();

// Login
saveRouter.get("/login/:playerName", async (req, res) => {
  const playerName = req.params.playerName;

  console.log("-----------------------------------------------------");
  console.log(`Logging in as ${playerName}.`);
  await StartGame(playerName);
  const saves = listGameSaves(playerName);
  if (saves.length > 0) console.log("Save files found: " + saves);
  console.log("-----------------------------------------------------");
  res.send(playerName);
});

saveRouter.get('/load/:playerName/:saveName', (req, res) =>{
  const playerName = req.params.playerName;
  const saveName = req.params.saveName;

  console.log("-----------------------------------------------------");
  console.log(`New save ${saveName} for ${playerName}.`);
  const newSaveData = newGameSave(playerName, saveName);
  console.log("-----------------------------------------------------");
  res.send(JSON.stringify(newSaveData));
})

export default saveRouter;

// test curls
// curl http://localhost:9000/saves/login/immiihh
// curl http://localhost:9000/saves/load/immiihh/save1
