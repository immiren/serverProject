import {z} from 'zod';
import { ResourceSchema } from '../items/itemSchemas';

export const GameSaveSchema = z.object({
    resources: z.array(ResourceSchema),
    //buildings
    //quests state
    //inventory
})

export type GameSaveType = z.infer<typeof GameSaveSchema>;