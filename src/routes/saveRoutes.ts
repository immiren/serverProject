import express from "express";
import { StartGame } from "../game";
import {
  listGameSaves,
  loadGameSave,
  newGameSave,
  saveExists,
  updateGameSave,
} from "../gameSaves/accessGameSave";
import { GameSaveSchema, GameSaveType } from "../gameSaves/gameSaveSchemas";

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

// Load save
saveRouter.get("/load/:playerName/:saveName", (req, res) => {
  const playerName = req.params.playerName;
  const saveName = req.params.saveName;

  let saveData: GameSaveType;

  console.log("-----------------------------------------------------");
  if (saveExists(playerName, saveName)) {
    // Load save
    console.log(`Loading save ${saveName} for ${playerName}.`);
    saveData = loadGameSave(playerName, saveName);
  } else {
    // New save
    console.log(`New save ${saveName} for ${playerName}.`);
    saveData = newGameSave(playerName, saveName);
  }
  console.log("-----------------------------------------------------");
  res.send(JSON.stringify(saveData));
});

// Save data update
saveRouter.put("/update/:playerName/:saveName", (req, res) => {
  const { playerName, saveName } = req.params;
  const contents = req.body;

  console.log(`Received save data for user: ${playerName}, save name: ${saveName}`);
  console.log("Data:", JSON.stringify(contents, null, 2));

  try {
    const saveData = GameSaveSchema.parse(contents);
    console.log("save data ok");

    updateGameSave(playerName, saveName, saveData);
    console.log("save complete");
    res.status(200).send({ message: "Save successful." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error saving file." });
  }
});

export default saveRouter;

// test curls
// curl http://localhost:9000/saves/login/testUser
// curl http://localhost:9000/saves/load/testUser/save1
