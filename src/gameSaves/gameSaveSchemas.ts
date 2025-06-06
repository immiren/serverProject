import {z} from 'zod';

export const GameSaveSchema = z.object({
    //buildings
    //quests state
    //inventory
})

export type GameSaveType = z.infer<typeof GameSaveSchema>;