import path from "path";
import { createResources } from "../items/createResources";
import { GameSaveSchema, GameSaveType } from "./gameSaveSchemas";
import fs from "fs";

/**
 * Creates a new, level 0 save and calls updateGameSave
 * @param playerName
 * @param saveName
 * @returns game save information object
 */
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

/**
 * Finds and writes to save file. Creates
 * @param playerName
 * @param saveName name of the save file
 * @param saveContents resources listed in an object
 */
export function updateGameSave(
  playerName: string,
  saveName: string,
  saveContents: GameSaveType,
) {
  // directories
  const savesDir = path.join("players", playerName, "saves");
  const fullDir = path.join(__dirname, "..", "..", savesDir);
  const saveFile = path.join(fullDir, saveName + ".json");
  console.log("Updating file: " + saveFile);

  const fileContents = JSON.stringify(saveContents);

  // No save file warning - can be deleted later
  if (!fs.existsSync(saveFile) || !fs.existsSync(fullDir)) {
    // Warning
    console.log("No save file found. Creating new one with name " + saveName);
    fs.mkdirSync(fullDir, { recursive: true });
  }

  // File writing - overwrites or creates new file
  try {
    fs.writeFileSync(saveFile, fileContents);
  } catch (error) {
    console.log("Issue writing to " + saveFile);
    console.error(error);
  }
}

/**
 * Loads save file. Throws error if no file is found.
 * @param playerName player name
 * @param saveName save file name, without extension
 * @returns game save data
 */
export function loadGameSave(
  playerName: string,
  saveName: string,
): GameSaveType {
  const savesDir = path.join("players", playerName, "saves");
  const fullDir = path.join(__dirname, "..", "..", savesDir);
  const saveFile = path.join(fullDir, saveName + ".json");

  // Check for directory
  try {
    //fs.existsSync(saveFile);
    fs.accessSync(fullDir);
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

  if (!fs.existsSync(fullDir)) {
    // No saves directory found
    console.log("No directory found at " + savesDir + ". Creating one.");
    fs.mkdirSync(fullDir, { recursive: true });
    return [];
  }

  try {
    // Read save files
    const contents = fs.readdirSync(fullDir);
    // TODO: only share file names, not extensions
    return contents;
  } catch (error) {
    console.log("Directory reading issue");
    console.error(error);
  }
  return [];
}

export function saveExists(playerName: string, saveName: string): boolean {
  // directories
  const savesDir = path.join("players", playerName, "saves");
  const fullDir = path.join(__dirname, "..", "..", savesDir);
  const saveFile = path.join(fullDir, saveName + ".json");

  return fs.existsSync(saveFile);
}
