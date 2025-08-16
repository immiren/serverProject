import { displayResources } from "../displayResources.js";
import { ResourceType } from "./../types.js";
import { listResources } from "./listResources.js";

export function updateResources() {
    const resources = listResources();
    if (!resources) {
        console.log('No resources found');
        return;
    }
    resources.forEach(resource => {
        resource.amount += resource.building.genRate * resource.building.level * 5;
        if (resource.amount > resource.building.limit) {
            resource.amount = resource.building.limit;
        }
        console.log('Updated ' + resource.resourceName + ' amount: ' + resource.amount);
        window.localStorage.setItem(resource.resourceName, JSON.stringify(resource));
    })

    displayResources(resources);
}