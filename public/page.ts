import { displayResources } from "./displayResources.js";
import { updateResources } from "./resources/updateResources.js";

window.onload = async (event) => {
  await setup();
};

async function setup() {
  console.log("setup");
  try {
    const woodResource = await (await fetch("/setup")).json();
    displayResources([woodResource]);
    window.localStorage.setItem(woodResource.resourceName, JSON.stringify(woodResource));
  } catch (error) {
    console.error("Failed to fetch or display resources:", error);
  }
  window.setInterval(updateResources, 2000);
}
