import { setCurrentLocation, setResources } from "./localStorage/setItem.js";
import { displayResources } from "./pageActions/displayResources.js";
import { updateResources } from "./updates/updateResources.js";
import { ResourceType } from "./types.js";
import { assertDefined } from "./utils/assertDefined.js";

window.onload = async (event) => {
  await setup();
};

async function setup() {
  console.log("setup");
  try {
    setCurrentLocation('camp');
    const resources: ResourceType[] = await (await fetch("/setup")).json();
    setResources(resources);
    displayResources(resources);
  } catch (error) {
    console.error("Failed to fetch or display resources:", error);
  }
  window.setInterval(updateResources, 2000);

  // Setup buttons
  const currenLocationHeader = assertDefined(document.querySelector<HTMLHeadingElement>("#current-location-header"));
  currenLocationHeader.addEventListener("click", () => {
    setCurrentLocation('camp');
  });

  const campShedLink = assertDefined(document.querySelector<HTMLParagraphElement>("#shed"));
  const campGreenhouseLink = assertDefined(document.querySelector<HTMLParagraphElement>("#greenhouse"));
  const campGarageLink = assertDefined(document.querySelector<HTMLParagraphElement>("#garage"));

  campShedLink.addEventListener("click", () => {
    setCurrentLocation('Shed');
  });
  campGreenhouseLink.addEventListener("click", () => {
    setCurrentLocation('Greenhouse');
  });
  campGarageLink.addEventListener("click", () => {
    setCurrentLocation('Garage');
  });
}
