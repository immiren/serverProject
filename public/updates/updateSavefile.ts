import { getResources } from "../localStorage/getItem.js";

export function sendSaveDataToServer() {
  // get data
  const saveData = getResources();
  console.log("sending data to server");
  // send data
  fetch("/saves/update/testUser/save1", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ resources: saveData }),
  });
}