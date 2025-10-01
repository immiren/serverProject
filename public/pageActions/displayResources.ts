import { getCurrentLocation } from "../localStorage/getItem.js";
import { ResourceType } from "../types.js";
import { assertDefined } from "../utils/assertDefined.js";

/**
 * Sets new resource values. does not care about other parts.
 * Cares about current amount & capacity
 * Upgrade cost etc set elsewhere
 * @param resources 
 */
export function displayResources(resources: ResourceType[]) {
  const resourceAmountObjects = assertDefined(document.querySelectorAll<HTMLParagraphElement>(".resource-amount"));

  const currentLocation = getCurrentLocation();

  // Right sidebar(constant resources view)
  resources.forEach((resource) => {
    resourceAmountObjects[resources.indexOf(resource)].innerHTML = `
      ${resource.resourceName}: ${resource.amount}/${resource.building.limit}
    `;

    // Left sidebar(building-specific view)
    if (resource.building.buildingName === currentLocation) {
      //calculate building capacity
      const capacityPercent = resource.amount / resource.building.limit;
      const filledSlots = Math.min(20, Math.round(capacityPercent * 20));
      const emptySlots = 20 - filledSlots;
      const capacityBar = "X".repeat(filledSlots) + "-".repeat(emptySlots);

      // Building-specific elements
      const locationResourceAmountObject =
        assertDefined(document.querySelector<HTMLParagraphElement>("#location-resource-amount"));
      const locationCapacityObject =
        assertDefined(document.querySelector<HTMLParagraphElement>("#location-capacity"));

      // set contents
      locationResourceAmountObject.textContent = `${resource.resourceName}: ${resource.amount}`;
      locationCapacityObject.textContent = `[${capacityBar}] ${resource.amount}/${resource.building.limit}`;
    }
  })
}

function setDialogue(speaker: string, message: string) {
  const dialogueHeader = assertDefined(document.querySelector<HTMLHeadingElement>("#dialogue-header"));
  // TODO: finish
}