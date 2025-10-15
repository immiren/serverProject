import { ResourceType, SaveFileType } from "../types";

/**
 * Parses response sent by server. For reading a save file from local storage, use getResources
 * @param contents 
 * @returns 
 */
export function parseSaveFile(contents: string): ResourceType[] {
    const saveFile: SaveFileType = JSON.parse(contents)
    let resourcelist: ResourceType[]= []
    saveFile.resources.forEach((resource) => {
        resourcelist[resourcelist.length] = resource;
    })
    return resourcelist;
}