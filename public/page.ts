import { displayResources } from "./displayResources.js";

window.onload = async (event) => {
  await setup();
};

async function setup() {
  console.log("setup");
  try {
    const wood = await (await fetch("/setup")).json();
    displayResources(wood);
  } catch (error) {
    console.error("Failed to fetch or display resources:", error);
  }
}
