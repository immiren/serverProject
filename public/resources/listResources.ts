import { ResourceType } from "../types.js";

export function listResources(): ResourceType[] {
    const woodResourceString = window.localStorage.getItem('Wood');
    if (!woodResourceString) {
        console.log('No wood resource found');
        return [];
    }
    let woodResource: ResourceType;
    try {
        woodResource = JSON.parse(woodResourceString);
    } catch (error) {
        console.log(error);
        return [];
    }
    return [woodResource];
}