import path from "path";
import { createResources } from "../items/createResources";
import { GameSaveSchema, GameSaveType } from "./gameSaveSchemas";
import fs from "fs";

export function newGameSave(
  playerName: string,
  saveName: string,
): GameSaveType {
  // Get resource values
  const newResources = createResources();
  const newGameData: GameSaveType = {
    resources: newResources,
  };

  updateGameSave(playerName, saveName, newGameData);

  return newGameData;
}

export function updateGameSave(
  playerName: string,
  saveName: string,
  saveContents: GameSaveType,
) {
  const savesDir = path.join("players", playerName, "saves");
  const fullDir = path.join(__dirname, "..", "..", savesDir);
  const saveFile = path.join(fullDir, saveName + ".json");
  console.log("Updating file: " + saveFile);

  const fileContents = JSON.stringify(saveContents);

  try {
    fs.accessSync(saveFile);
  } catch (error) {
    console.log("no save file found. Creating new one with name " + saveName);
    try {
      fs.writeFileSync(saveFile, fileContents);
    } catch (error) {
      console.log("Issue writing to " + fileContents);
      console.error(error);
    }
  }
}

export function loadGameSave(playerName: string, saveName: string): GameSaveType{
  const savesDir = path.join("players", playerName, "saves");
  const fullDir = path.join(__dirname, "..", "..", savesDir);
  const saveFile = path.join(fullDir, saveName + ".json");
  // Check for directory
  try {
    fs.accessSync(fullDir);
    console.log(`Player ${playerName}'s directory exists at ${savesDir}.`);
  } catch (error) {
    console.log(`No directory found for ${playerName} at ${savesDir}.`);
    throw error;
  }

  // Read file
  try {
    const fileContents = fs.readFileSync(saveFile, "utf-8");
    return GameSaveSchema.parse(JSON.parse(fileContents));
  } catch (error) {
    console.log("Issue reading file contents.");
    throw error;
  }
}

export function listGameSaves(playerName: string): string[] {
  const savesDir = path.join("players", playerName, "saves");
  const fullDir = path.join(__dirname, "..", "..", savesDir);

  try{
    fs.accessSync(fullDir);
  } catch (error) {
    fs.mkdirSync(fullDir, { recursive: true });
    return [];
  }

  try {
    const contents = fs.readdirSync(fullDir);
    return contents;
  } catch (error) {
    console.log("Directory reading issue");
    console.error(error);
  }
  return [];
}
