import { displayResources } from "../displayResources.js";
import { listResources } from "./listResources.js";

export function updateResources() {
    const resources = listResources();
    if (!resources) {
        console.log('No resources found');
        return;
    }
    resources.forEach(resource => {
        // TODO: rounding function for avoiding 
        resource.amount += Math.round(resource.building.genRate * resource.building.level * 2);
        if (resource.amount > resource.building.limit) {
            resource.amount = resource.building.limit;
        }
        window.localStorage.setItem(resource.resourceName, JSON.stringify(resource));
    })

    displayResources(resources);
}