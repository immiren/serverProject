import { ResourceType } from "./types.js";
import { assertDefined } from "./utils/assertDefined.js";

export function displayResources(resources: ResourceType[]) {
  const buildingStatsObject =
    assertDefined(document.querySelector<HTMLHeadingElement>("#building-stats"));
  const buildingLevelObject =
    assertDefined(document.querySelector<HTMLParagraphElement>("#building-level"));
  const buildingResourceAmountObject =
    assertDefined(document.querySelector<HTMLParagraphElement>("#building-resource-amount"));
  const upgradeCostObject =
    assertDefined(document.querySelector<HTMLParagraphElement>("#upgrade-cost"));
  const buildingCapacityObject =
    assertDefined(document.querySelector<HTMLParagraphElement>("#building-capacity"));
  const buildingActionsObject =
    assertDefined(document.querySelector<HTMLHeadingElement>("#building-actions"));
  const resourceAmountObjects = assertDefined(document.querySelectorAll<HTMLParagraphElement>(".resource-amount"));

  const currentBuilding = 'none'
  resources.forEach((resource) => {
    resourceAmountObjects[resources.indexOf(resource)].innerHTML = `
      ${resource.resourceName}: ${resource.amount}/${resource.building.limit}
    `;
    if (resource.building.buildingName === currentBuilding) {
      //calculate building capacity
      const capacityPercent = resource.amount / resource.building.limit;
      const filledSlots = Math.min(20, Math.round(capacityPercent * 20));
      const emptySlots = 20 - filledSlots;
      const capacityBar = "X".repeat(filledSlots) + "-".repeat(emptySlots);

      buildingStatsObject.textContent = `${resource.building.buildingName} stats`;
      buildingLevelObject.textContent = `Level: ${resource.building.level}`;
      buildingResourceAmountObject.textContent = `${resource.resourceName}: ${resource.amount}`;
      upgradeCostObject.textContent = `Upgrade cost missing`;
      buildingCapacityObject.textContent = `[${capacityBar}] ${resource.amount}/${resource.building.limit}`;
      buildingActionsObject.textContent = `${resource.building.buildingName} actions`;
    }
  })
}
