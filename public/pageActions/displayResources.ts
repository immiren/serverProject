import { getCurrentLocation } from "../localStorage/getItem.js";
import { ResourceType } from "../types.js";
import { assertDefined } from "../utils/assertDefined.js";

export function displayResources(resources: ResourceType[]) {
  // Shares html elements
  const locationInfoObject =
    assertDefined(document.querySelector<HTMLHeadingElement>("#location-info"));
  const locationActionsObject =
    assertDefined(document.querySelector<HTMLHeadingElement>("#location-actions"));
  const resourceAmountObjects = assertDefined(document.querySelectorAll<HTMLParagraphElement>(".resource-amount"));

  const buildingInfoObject =
    assertDefined(document.querySelector<HTMLDivElement>(".building-info"));
  const campInfoObject =
    assertDefined(document.querySelector<HTMLDivElement>(".camp-info"));

  const currentLocation = getCurrentLocation();

  resources.forEach((resource) => {
    resourceAmountObjects[resources.indexOf(resource)].innerHTML = `
      ${resource.resourceName}: ${resource.amount}/${resource.building.limit}
    `;
    // Set building-specific stats
    if (currentLocation !== 'camp' && resource.building.buildingName === currentLocation) {
      //calculate building capacity
      const capacityPercent = resource.amount / resource.building.limit;
      const filledSlots = Math.min(20, Math.round(capacityPercent * 20));
      const emptySlots = 20 - filledSlots;
      const capacityBar = "X".repeat(filledSlots) + "-".repeat(emptySlots);

      // Building-specific elements
      const locationLevelObject =
        assertDefined(document.querySelector<HTMLParagraphElement>("#location-level"));
      const locationResourceAmountObject =
        assertDefined(document.querySelector<HTMLParagraphElement>("#location-resource-amount"));
      const upgradeCostObject =
        assertDefined(document.querySelector<HTMLParagraphElement>("#upgrade-cost"));
      const locationCapacityObject =
        assertDefined(document.querySelector<HTMLParagraphElement>("#location-capacity"));

      // set contents
      locationInfoObject.textContent = `${resource.building.buildingName} stats`;
      locationLevelObject.textContent = `Level: ${resource.building.level}`;
      locationResourceAmountObject.textContent = `${resource.resourceName}: ${resource.amount}`;
      upgradeCostObject.textContent = `Upgrade cost missing`;
      locationCapacityObject.textContent = `[${capacityBar}] ${resource.amount}/${resource.building.limit}`;
      locationActionsObject.textContent = `${resource.building.buildingName} actions`;

      buildingInfoObject.style.display = "block";
      campInfoObject.style.display = "none";
    }
  })
  if (currentLocation === 'camp') {
    locationInfoObject.textContent = "Camp buildings"
    locationActionsObject.textContent = "Camp actions";


    buildingInfoObject.style.display = "none";
    campInfoObject.style.display = "block";
  }
}

function setDialogue(speaker: string, message: string) {
  const dialogueHeader = assertDefined(document.querySelector<HTMLHeadingElement>("#dialogue-header"))
}