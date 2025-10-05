import { ResourceType, SaveFileType } from "../types";

export function readSaveFile(contents: string): ResourceType[] {
    console.log("contents: " + contents);
    const saveFile: SaveFileType = JSON.parse(contents)
    console.log("parsed contents " + saveFile);
    let resourcelist: ResourceType[]= []
    saveFile.resources.forEach((resource) => {
        resourcelist[resourcelist.length] = resource;
        console.log("added " + resource.resourceName);
    })
    console.log("Resources taken: " + resourcelist);
    return resourcelist;
}