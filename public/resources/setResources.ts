import { ResourceType } from "../types";

export function setResources(resources: ResourceType[]) {
    const resourceNames: string[] = [];
    resources.forEach((resource) => {
        window.localStorage.setItem(resource.resourceName, JSON.stringify(resource));
        resourceNames.push(resource.resourceName);
    });
    window.localStorage.setItem('Resource names', resourceNames.join(','));
}