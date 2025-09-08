import { getResources } from "../localStorage/getItem.js";
import { setResource } from "../localStorage/setItem.js";
import { displayResources } from "../pageActions/displayResources.js";

export function updateResources() {
    const resources = getResources();

    resources.forEach(resource => {
        // TODO: rounding function for avoiding 
        resource.amount += Math.round(resource.building.genRate * resource.building.level * 2);
        if (resource.amount > resource.building.limit) {
            resource.amount = resource.building.limit;
        }
        setResource(resource);
        displayResources(resources);
    })
}