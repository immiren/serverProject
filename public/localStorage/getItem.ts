import { ResourceType } from "../types.js";
import { assertDefined } from "../utils/assertDefined.js";

export function getResource(resourceName: string): ResourceType {
    let resourceString: string;
    try {
        resourceString = assertDefined(window.localStorage.getItem(resourceName));
        return JSON.parse(resourceString);
    } catch {
        throw new Error('Resource ' + resourceName + ' not found or is unparseable');
    }
}

export function getResourceByBuilding(buildingName: string): ResourceType {
    console.log('getting resource from ' + buildingName);
    const resourceBuildingsString = window.localStorage.getItem('Resource buildings');
    if (!resourceBuildingsString) {
        throw new Error('Resource buildings not found');
    }
    const resources: { [key: string]: string } = JSON.parse(resourceBuildingsString);
    const resourceName = resources[buildingName];
    return getResource(resourceName);
}

export function getResources(): ResourceType[] {
    const resourceNamesList = getResourceNames();
    const resources: ResourceType[] = [];
    resourceNamesList.forEach((resourceName) => {
        const resource = getResource(resourceName);
        resources.push(resource);
    })
    return resources;
}

export function getResourceNames(): string[] {
    let resourceNamesString: string;
    try {
        resourceNamesString = assertDefined(window.localStorage.getItem('Resource names'));
    } catch {
        console.log('no resource names list found');
        return [];

    }
    return resourceNamesString.split(',');
}

/**
 * Fetches locations.
 * @param includeCamp Determines whether 'camp' is returned as one of the options 
 * @returns list of location name strings
 */
export function getLocations(includeCamp: boolean): string[] {
    const resourceNamesList = getResourceNames();
    const locations: string[] = [];
    resourceNamesList.forEach((resourceName) => {
        const resource = getResource(resourceName);
        locations.push(resource.building.buildingName);
    });
    if (includeCamp) { locations.push('camp'); }
    return locations;
}

export function getCurrentLocation(): string {
    return window.localStorage.getItem('currentLocation') ?? 'camp';
}