import { ResourceType } from "../types.js";
import { updateResources } from "../updates/updateResources.js";
import { getLocations } from "./getItem.js";

export function setCurrentLocation(location: string) {
    const locations = getLocations();

    if (locations.includes(location)) {
        console.log('location found: ' + location);
        window.localStorage.setItem('currentLocation', location);
    }
    updateResources();
}

export function setResource(resource: ResourceType) {
    window.localStorage.setItem(resource.resourceName, JSON.stringify(resource));
}

export function setResources(resources: ResourceType[]) {
    const resourceNames: string[] = [];
    resources.forEach((resource) => {
        // New item for each resource
        window.localStorage.setItem(resource.resourceName, JSON.stringify(resource));
        resourceNames.push(resource.resourceName);
    });
    // One item for all resource names
    window.localStorage.setItem('Resource names', resourceNames.join(','));
    console.log('resources ' + resourceNames + ' set');
}