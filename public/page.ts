import { displayResources } from "./displayResources.js";
import { setResources } from "./resources/setResources.js";
import { updateResources } from "./resources/updateResources.js";
import { ResourceType } from "./types.js";

window.onload = async (event) => {
  await setup();
};

async function setup() {
  console.log("setup");
  try {
    const resources: ResourceType[] = await (await fetch("/setup")).json();
    setResources(resources);
    displayResources(resources);
  } catch (error) {
    console.error("Failed to fetch or display resources:", error);
  }
  window.setInterval(updateResources, 2000);
}
