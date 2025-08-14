import express from "express";
import { ResourceType } from "../items/itemSchemas";

const gameRouter = express.Router();

//Setup
gameRouter.get("/setup", async (req, res) => {
  // Load save
  console.log("req received");

  const woodResource: ResourceType = {
    resourceName: "Wood",
    amount: 35,
    building: {
      buildingName: "Shed",
      level: 0,
      genRate: 0.5,
      limit: 100,
    },
  };
  console.log("sending " + woodResource.resourceName);
  console.log(woodResource);
  res.json(woodResource);
});

export default gameRouter;
