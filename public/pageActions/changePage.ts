import { getLocations, getResourceByBuilding } from "../localStorage/getItem.js";
import { ResourceType } from "../types.js";
import { assertDefined } from "../utils/assertDefined.js";

/**
 * Changes location view
 * @param location Lowercase location name
 */
export function changeToPage(location: string) {
    const buildings: string[] = getLocations(false);
    buildings.forEach(building => {
        if (location == building) {
            showBuilding(true, building);
        } else {
            showBuilding(false, building);
        }
    });
    showCamp(location == "camp");
}

function setLocationInfoHeader(locationInfo: string) {
    const locationInfoElement = assertDefined(document.querySelector<HTMLHeadingElement>("#location-info"));
    locationInfoElement.textContent = locationInfo;
}

function showCamp(enable: boolean) {
    const displayStyle = enable ? "block" : "none";

    if (enable) {
        setLocationInfoHeader("Camp Buildings");
    }

    // Set current location header
    const currentLocationHeader = assertDefined(document.querySelector<HTMLHeadingElement>("#current-location-header"));
    currentLocationHeader.textContent = 'Camp';

    // Enable camp information element
    const campInfoElement = assertDefined(document.querySelector<HTMLDivElement>(".camp-info"));
    campInfoElement.style.display = displayStyle;


    // Enable camp actions
    const locationActionsElement = assertDefined(document.querySelector<HTMLDivElement>(".camp-actions"));
    if (enable) locationActionsElement.textContent = `Camp Actions`
    // TODO: add actions

}

function showBuilding(enable: boolean, buildingName: string) {
    console.log('showing ' + buildingName)
    const resource: ResourceType = getResourceByBuilding(buildingName);
    const displayStyle = enable ? "block" : "none";


    if (enable) {
        setLocationInfoHeader(resource.building.buildingName);
        // Set current location header
        const currentLocationHeader = assertDefined(document.querySelector<HTMLHeadingElement>("#current-location-header"));
        currentLocationHeader.textContent = `Camp > ${resource.building.buildingName}}`;
    }



    // Enable camp information element
    const builidingInfoElement = assertDefined(document.querySelector<HTMLDivElement>(".building-info"));
    builidingInfoElement.style.display = displayStyle;


    // Enable camp actions
    const locationActionsElement = assertDefined(document.querySelector<HTMLDivElement>("#location-actions"));

    locationActionsElement.style.display = displayStyle;

    if (enable) {
        locationActionsElement.textContent = `${resource.building.buildingName} Actions`
        // TODO: show capacity etc
        const locationLevelObject =
            assertDefined(document.querySelector<HTMLParagraphElement>("#location-level"));
        const upgradeCostObject =
            assertDefined(document.querySelector<HTMLParagraphElement>("#upgrade-cost"));
        locationLevelObject.textContent = `Level: ${resource.building.level}`;
        upgradeCostObject.textContent = `Upgrade cost missing`;
    }

}