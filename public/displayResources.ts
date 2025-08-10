export function displayResources(resource: {
  resourceName: string;
  amount: number;
  building: {
    buildingName: string;
    level: number;
    genRate: number;
    limit: number;
  };
}) {
  const buildingStatsObject =
    document.querySelector<HTMLHeadingElement>("building-stats");
  const buildingLevelObject =
    document.querySelector<HTMLParagraphElement>("building-level");
  const resourceAmountObject =
    document.querySelector<HTMLParagraphElement>("resource-amount");
  const upgradeCostObject =
    document.querySelector<HTMLParagraphElement>("upgrade-cost");
  const buildingCapacityObject =
    document.querySelector<HTMLParagraphElement>("building-capacity");
  const buildingActionsObject =
    document.querySelector<HTMLHeadingElement>("building-actions");
  if (
    !buildingStatsObject ||
    !buildingLevelObject ||
    !resourceAmountObject ||
    !upgradeCostObject ||
    !resourceAmountObject ||
    !buildingCapacityObject ||
    !buildingActionsObject
  ) {
    console.log("issue loading elements");
    return;
  }
  //calculate building capacity %
  const capacityPercent = resource.amount / resource.building.limit;
  console.log("%: " + capacityPercent);
  const capacityBar = Math.round(20 * capacityPercent);
  let capacityXs = "";
  let i = 0;
  while (i < capacityBar) {
    capacityXs.concat("X");
    i++;
  }
  i = 0;
  while (i > 20 - capacityBar) {
    capacityXs.concat("-");
    i++;
  }
  buildingStatsObject.innerHTML = `${resource.building.buildingName} stats`;
  buildingLevelObject.innerHTML = `Level: ${resource.building.level}`;
  resourceAmountObject.innerHTML = `${resource.resourceName}: ${resource.amount}`;
  upgradeCostObject.innerHTML = `Upgrade cost missing`;
  buildingCapacityObject.innerHTML = `[${capacityXs}] ${resource.amount}/${resource.building.limit}`;
  buildingActionsObject.innerHTML = `${resource.building.buildingName} actions`;
}
