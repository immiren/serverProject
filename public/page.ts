import { displayResources } from "./displayResources.js";

window.onload = async (event) => {
  await setup();
};

async function setup() {
  console.log("setup");
  const response = await (await fetch("/setup")).json;
  let wood;
  console.log("res: " + response);

  try {
    wood = JSON.parse(response.toString());
    console.log("res: " + response);
  } catch (error) {
    console.log("log" + error);
    console.log("broke");
    return;
  }
  displayResources(wood);
}
