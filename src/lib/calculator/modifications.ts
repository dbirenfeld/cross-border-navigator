import { ModificationRequirement, DestinationCountry, ItemType } from "@/types";

export const modificationRequirements: ModificationRequirement[] = [
  {
    id: "nav-map-update",
    name: "Navigation Map Update",
    description: "Update infotainment system with regional maps and points of interest",
    estimatedCostMin: 150,
    estimatedCostMax: 300,
    applicableTo: ["vehicle"],
    requiredIn: ["AE", "SA", "KW", "QA", "BH", "OM"],
  },
  {
    id: "radar-recalibration",
    name: "Radar/Sensor Recalibration",
    description: "Recalibrate radar frequency to comply with local telecommunications regulations",
    estimatedCostMin: 300,
    estimatedCostMax: 600,
    applicableTo: ["vehicle"],
    requiredIn: ["AE", "SA", "KW", "QA", "BH", "OM"],
  },
  {
    id: "ac-service",
    name: "Climate System Service",
    description: "Service AC system for extreme heat conditions, replace coolant with high-temp grade",
    estimatedCostMin: 100,
    estimatedCostMax: 250,
    applicableTo: ["vehicle"],
    requiredIn: ["AE", "SA", "KW", "QA", "BH", "OM"],
  },
  {
    id: "speedometer-conversion",
    name: "Speedometer Unit Display",
    description: "Configure instrument cluster to display km/h as primary unit",
    estimatedCostMin: 50,
    estimatedCostMax: 150,
    applicableTo: ["vehicle"],
    requiredIn: ["AE", "SA", "KW", "QA", "BH", "OM"],
  },
  {
    id: "headlight-adjustment",
    name: "Headlight Beam Adjustment",
    description: "Adjust headlight beam pattern for right-hand traffic driving conditions",
    estimatedCostMin: 80,
    estimatedCostMax: 200,
    applicableTo: ["vehicle"],
    requiredIn: ["AE", "SA", "KW", "QA", "BH", "OM"],
  },
  {
    id: "saso-conformity",
    name: "SASO Conformity Certificate",
    description: "Obtain Saudi Standards, Metrology and Quality Organization conformity certification",
    estimatedCostMin: 400,
    estimatedCostMax: 800,
    applicableTo: ["vehicle", "electronics", "machinery"],
    requiredIn: ["SA"],
  },
  {
    id: "gcc-type-approval",
    name: "GCC Type Approval",
    description: "Vehicle type approval documentation for Gulf Cooperation Council standards",
    estimatedCostMin: 200,
    estimatedCostMax: 500,
    applicableTo: ["vehicle"],
    requiredIn: ["AE", "KW", "QA", "BH", "OM"],
  },
];

export function getRequiredModifications(
  itemType: ItemType,
  destination: DestinationCountry
): ModificationRequirement[] {
  return modificationRequirements.filter(
    (mod) =>
      mod.applicableTo.includes(itemType) && mod.requiredIn.includes(destination)
  );
}

export function estimateModificationCost(
  itemType: ItemType,
  destination: DestinationCountry
): { items: { name: string; cost: number }[]; total: number } {
  const required = getRequiredModifications(itemType, destination);
  const items = required.map((mod) => ({
    name: mod.name,
    cost: Math.round((mod.estimatedCostMin + mod.estimatedCostMax) / 2),
  }));
  const total = items.reduce((sum, item) => sum + item.cost, 0);
  return { items, total };
}
