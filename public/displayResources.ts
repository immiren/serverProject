import { ResourceType } from "./types.js";

export function displayResources(resources: ResourceType[]) {
  const buildingStatsObject =
    document.querySelector<HTMLHeadingElement>("#building-stats");
  const buildingLevelObject =
    document.querySelector<HTMLParagraphElement>("#building-level");
  const resourceAmountObject =
    document.querySelector<HTMLParagraphElement>("#resource-amount");
  const upgradeCostObject =
    document.querySelector<HTMLParagraphElement>("#upgrade-cost");
  const buildingCapacityObject =
    document.querySelector<HTMLParagraphElement>("#building-capacity");
  const buildingActionsObject =
    document.querySelector<HTMLHeadingElement>("#building-actions");
  if (
    !buildingStatsObject ||
    !buildingLevelObject ||
    !resourceAmountObject ||
    !upgradeCostObject ||
    !buildingCapacityObject ||
    !buildingActionsObject
  ) {
    console.log("issue loading elements");
    return;
  }
  const currentBuilding = 'Shed'
  resources.forEach((resource) => {

    if (resource.building.buildingName === currentBuilding) {
      //calculate building capacity
      const capacityPercent = resource.amount / resource.building.limit;
      const filledSlots = Math.min(20, Math.round(capacityPercent * 20));
      const emptySlots = 20 - filledSlots;
      const capacityBar = "X".repeat(filledSlots) + "-".repeat(emptySlots);

      buildingStatsObject.textContent = `${resource.building.buildingName} stats`;
      buildingLevelObject.textContent = `Level: ${resource.building.level}`;
      resourceAmountObject.textContent = `${resource.resourceName}: ${resource.amount}`;
      upgradeCostObject.textContent = `Upgrade cost missing`;
      buildingCapacityObject.textContent = `[${capacityBar}] ${resource.amount}/${resource.building.limit}`;
      buildingActionsObject.textContent = `${resource.building.buildingName} actions`;
    }
  })
}
