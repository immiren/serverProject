import {
  getLocations,
  getResourceByBuilding,
} from "../localStorage/getItem.js";
import { ResourceType } from "../types.js";
import { assertDefined } from "../utils/assertDefined.js";

const campActions = ["New building", "Action 2"];
const buildingActions = [
  "Upgrade building",
  "View storage",
  "{customAction}",
  "{customAction2}",
];

/**
 * Changes location view
 * @param location Lowercase location name
 */
export function changeToPage(location: string) {
  const buildings: string[] = getLocations(false);
  buildings.forEach((building) => {
    if (location == building) {
      console.log("active building: " + location);
      showBuilding(true, building);
    } else {
      showBuilding(false, building);
    }
  });
  showCamp(location == "camp");
  setActions(location == "camp");
}

function setLocationInfoHeader(locationInfo: string) {
  const locationInfoElement = assertDefined(
    document.querySelector<HTMLHeadingElement>("#location-info"),
  );
  locationInfoElement.textContent = locationInfo;
}

function setActions(isCamp: boolean) {
  let actionElements =
    document.querySelectorAll<HTMLParagraphElement>(".action");
  let actions: string[];
  if (isCamp) {
    actions = campActions;
  } else {
    actions = buildingActions;
  }

  // More actions than elements
  while (actions.length > actionElements.length) {
    const newActionElement = document.createElement("p");
    newActionElement.classList.add("action");
    actionElements[0].insertAdjacentElement("afterend", newActionElement);
    actionElements = document.querySelectorAll<HTMLParagraphElement>(".action");
  }
  // More elements than actions
  while (actionElements.length > actions.length) {
    actionElements[0].remove();
    actionElements = document.querySelectorAll<HTMLParagraphElement>(".action");
  }
  for (let i = 0; i < actions.length; i++) {
    actionElements[i].textContent = actions[i];
  }
}

function showCamp(enable: boolean) {
  const displayStyle = enable ? "block" : "none";
  const buildingDisplayStyle = enable ? "none" : "block";

  if (enable) {
    setLocationInfoHeader("Camp Buildings");
    // Set current location header
    const currentLocationHeader = assertDefined(
      document.querySelector<HTMLHeadingElement>("#current-location-header"),
    );
    currentLocationHeader.textContent = "Camp";
  }

  // Enable/disable camp information element
  const campInfoElement = assertDefined(
    document.querySelector<HTMLDivElement>(".camp-info"),
  );
  campInfoElement.style.display = displayStyle;

  // Enable camp actions
  if (enable) {
    const locationActionsElement = assertDefined(
      document.querySelector<HTMLHeadingElement>(".location-actions"),
    );
    locationActionsElement.textContent = `Camp Actions`;
  }

  // Enable/disable building information element
  const builidingInfoElement = assertDefined(
    document.querySelector<HTMLDivElement>(".building-info"),
  );
  builidingInfoElement.style.display = buildingDisplayStyle;
}

function showBuilding(enable: boolean, buildingName: string) {
  const resource: ResourceType = getResourceByBuilding(buildingName);

  if (enable) {
    setLocationInfoHeader(resource.building.buildingName);
    // Set current location header
    const currentLocationHeader = assertDefined(
      document.querySelector<HTMLHeadingElement>("#current-location-header"),
    );
    currentLocationHeader.textContent = `Camp > ${resource.building.buildingName}`;
  }

  if (enable) {
    const locationLevelObject = assertDefined(
      document.querySelector<HTMLParagraphElement>("#location-level"),
    );
    const upgradeCostObject = assertDefined(
      document.querySelector<HTMLParagraphElement>("#upgrade-cost"),
    );
    locationLevelObject.textContent = `Level: ${resource.building.level}`;
    upgradeCostObject.textContent = `Upgrade cost missing`;
  }
}
