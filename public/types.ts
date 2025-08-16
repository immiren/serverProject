export type ResourceType = {
    resourceName: string;
    amount: number;
    building: {
        buildingName: string;
        level: number;
        genRate: number;
        limit: number;
    }
}
