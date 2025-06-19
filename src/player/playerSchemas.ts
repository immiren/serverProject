import { z } from "zod";
import { ResourceSchema } from "../items/itemSchemas";
//import hahmot

export const InventorySchema = z.object({
  food: ResourceSchema,
  medicine: ResourceSchema,
  wood: ResourceSchema,
  metal: ResourceSchema,
});

export const PlayerSchema = z.object({
  playerName: z.string(),
});

export type PlayerType = z.infer<typeof PlayerSchema>;
