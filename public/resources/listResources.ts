import { ResourceType } from "../types.js";

export function listResources(): ResourceType[] {
    const resourceNamesString = window.localStorage.getItem('Resource names');
    if (!resourceNamesString) {
        console.log('no resource names list found');
        return [];
    }
    const resourceNamesList = resourceNamesString.split(',');
    const resources: ResourceType[] = [];
    resourceNamesList.forEach((resourceName) => {
        const resourceString = window.localStorage.getItem(resourceName);
        if (!resourceString) {
            console.log('wääwää ei löytyny ' + resourceName);
            return;
        }
        let resource: ResourceType;
        try {
            resource = JSON.parse(resourceString);
        } catch {
            console.log('Parse fail at ' + resourceName);
            return;
        }
        resources.push(resource);
    })
    return resources;
}