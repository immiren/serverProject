import { z } from 'zod';

const ResourceBuildingSchema = z.object({
    buildingName: z.string(),
    level: z.number(),
    genRate: z.number()
})

export const ResourceSchema = z.object({
    resourceName: z.string(),
    amount: z.number(),
    building: ResourceBuildingSchema
})
