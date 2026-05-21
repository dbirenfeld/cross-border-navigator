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
  {
    id: "il-green-tax",
    name: "Green Tax (Ekoloqit)",
    description: "Environmental levy based on vehicle pollution grade (1-15). Varies by engine type and emissions. Electric vehicles are exempt.",
    estimatedCostMin: 1400,
    estimatedCostMax: 7000,
    applicableTo: ["vehicle"],
    requiredIn: ["IL"],
  },
  {
    id: "il-mot-test",
    name: "Israeli MOT Test (Tesht Rishoni)",
    description: "Mandatory first vehicle inspection at licensed testing center for import approval",
    estimatedCostMin: 300,
    estimatedCostMax: 600,
    applicableTo: ["vehicle"],
    requiredIn: ["IL"],
  },
  {
    id: "il-emissions-conversion",
    name: "Emissions Standard Compliance",
    description: "Verify or adjust vehicle to meet Israeli Euro emission standards",
    estimatedCostMin: 200,
    estimatedCostMax: 500,
    applicableTo: ["vehicle"],
    requiredIn: ["IL"],
  },
  {
    id: "il-headlight-conversion",
    name: "Headlight Beam Adjustment",
    description: "Adjust headlights for right-hand traffic pattern (Israel drives on the right)",
    estimatedCostMin: 100,
    estimatedCostMax: 250,
    applicableTo: ["vehicle"],
    requiredIn: ["IL"],
  },
  {
    id: "il-km-speedometer",
    name: "Speedometer Conversion",
    description: "Ensure primary display is in km/h as required by Israeli law",
    estimatedCostMin: 50,
    estimatedCostMax: 150,
    applicableTo: ["vehicle"],
    requiredIn: ["IL"],
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
