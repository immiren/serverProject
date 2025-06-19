import express from "express";
import { StartGame } from "../game";
import path from "path";

const router = express.Router();

// Open game
router.get("/", (req, res) => {
  const options = {
    root: path.join(__dirname),
  };

  res.sendFile(
    "C:/Users/Käyttäjä/Documents/GitHub/serverProject/public/index.html",
  );
});

// Login
router.get("/login/:playerName", async (req, res) => {
  const playerName = req.params.playerName;

  console.log("-----------------------------------------------------");
  console.log(`Logging in as ${playerName}.`);
  await StartGame(playerName);
  console.log("-----------------------------------------------------");
  res.send("Logged in as " + playerName);
});

router.get("/:playerName", (req, res) => {
  const playerName = req.params.playerName;
});

export default router;

// test curls
// curl http://localhost:9000/game/immiihh
