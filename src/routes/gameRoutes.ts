import express from "express";
import { createResources } from "../items/createResources";

const gameRouter = express.Router();

// Setup
gameRouter.get("/setup", async (req, res) => {
  // Load save
  console.log("req received");

  const resources = createResources();
  console.log('Sending resources.');
  res.json(resources);
});

export default gameRouter;
