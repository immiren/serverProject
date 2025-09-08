import { ResourceType } from "./itemSchemas";

// TODO: get resource amounts from player save files
export function createResources(): ResourceType[] {
    const woodResource: ResourceType = {
        resourceName: "Wood",
        amount: 0,
        building: {
            buildingName: "Shed",
            level: 1,
            genRate: 0.5,
            limit: 100,
        },
    };
    const foodResource: ResourceType = {
        resourceName: "Food",
        amount: 0,
        building: {
            buildingName: "Greenhouse",
            level: 2,
            genRate: 0.5,
            limit: 130,
        },
    };
    const metalResource: ResourceType = {
        resourceName: "Metal",
        amount: 0,
        building: {
            buildingName: "Garage",
            level: 3,
            genRate: 0.2,
            limit: 70,
        },
    };
    return [woodResource, foodResource, metalResource];
}
// TODO: create logic for building limits
//      const resourceAmountObject =
//    document.querySelector<HTMLParagraphElement>("#resource-amount");
