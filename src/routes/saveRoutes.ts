import express from "express";
import { StartGame } from "../game";

const saveRouter = express.Router();

// Login
saveRouter.get("/login/:playerName", async (req, res) => {
  const playerName = req.params.playerName;

  console.log("-----------------------------------------------------");
  console.log(`Logging in as ${playerName}.`);
  await StartGame(playerName);
  console.log("-----------------------------------------------------");
  res.send("Logged in as " + playerName);
});

saveRouter.get("/:playerName", (req, res) => {
  const playerName = req.params.playerName;
});

export default saveRouter;

// test curls
// curl http://localhost:9000/game/immiihh
