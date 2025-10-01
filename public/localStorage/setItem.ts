import { changeToPage } from "../pageActions/changePage.js";
import { ResourceType } from "../types.js";
import { updateResourceAmounts } from "../updates/updateResources.js";
import { getLocations } from "./getItem.js";

export function setCurrentLocation(location: string) {
    const locations = getLocations(true);

    if (locations.includes(location)) {
        console.log('location found: ' + location);
        window.localStorage.setItem('currentLocation', location);
    }
    changeToPage(location);
    updateResourceAmounts();
}

export function setResource(resource: ResourceType) {
    window.localStorage.setItem(resource.resourceName, JSON.stringify(resource));
}

export function setResources(resources: ResourceType[]) {
    console.log('setting resources');
    const resourceNames: string[] = [];
    const resourceBuildings: { [key: string]: string } = {};
    resources.forEach((resource) => {
        // New item for each resource
        window.localStorage.setItem(resource.resourceName, JSON.stringify(resource));
        resourceNames.push(resource.resourceName);
        resourceBuildings[resource.building.buildingName] = resource.resourceName;
    });
    // One item for all resource names
    window.localStorage.setItem('Resource names', resourceNames.join(','));

    window.localStorage.setItem('Resource buildings', JSON.stringify(resourceBuildings))
    console.log('resources ' + resourceNames + ' set');
}