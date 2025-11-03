import { setCurrentLocation, setResources } from "./localStorage/setItem.js";
import { displayResources } from "./pageActions/displayResources.js";
import { updateResourceAmounts } from "./updates/updateResources.js";
import { assertDefined } from "./utils/assertDefined.js";
import { parseSaveFile } from "./updates/readSaveFile.js";
import { sendSaveDataToServer } from "./updates/updateSavefile.js";

window.onload = async (event) => {
  await setup();
};

async function setup() {
  console.log("setup");
  try {
    const saveFile = await (await fetch("/saves/load/testUser/save1")).json();
    const resources = parseSaveFile(JSON.stringify(saveFile));
    setResources(resources);
    setCurrentLocation('camp');
    displayResources(resources);
  } catch (error) {
    console.error("Failed to fetch or display resources:", error);
  }
  window.setInterval(updateResourceAmounts, 2000);
  window.setInterval(sendSaveDataToServer, 60000);
  // TODO: tweak save interval

  // Setup buttons
  const currentLocationHeader = assertDefined(document.querySelector<HTMLHeadingElement>("#current-location-header"));
  currentLocationHeader.addEventListener("click", () => {
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

  const saveButton = assertDefined(document.querySelector<HTMLParagraphElement>("#save"));
  saveButton.addEventListener("click", () => {
    sendSaveDataToServer();
  })
}
