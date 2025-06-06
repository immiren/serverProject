import {z} from 'zod';
//import hahmot

export const PlayerSchema = z.object({
    playerName: z.string()
    //games:
})

export type PlayerType = z.infer<typeof PlayerSchema>;