import { CalculationInput, DestinationCountry, VehicleFuelType } from "@/types";

export interface HomologationWarning {
  id: string;
  severity: "critical" | "warning" | "info";
  category: string;
  title: string;
  description: string;
  action: string;
  estimatedCost?: { min: number; max: number };
}

interface HomologationRuleContext {
  destination: DestinationCountry;
  fuelType?: VehicleFuelType;
  vehicleYear?: number;
  itemType: string;
}

interface HomologationRule {
  id: string;
  check: (ctx: HomologationRuleContext) => HomologationWarning | null;
}

const GCC_COUNTRIES: DestinationCountry[] = ["AE", "SA", "KW", "QA", "BH", "OM"];

const rules: HomologationRule[] = [
  {
    id: "radar-frequency",
    check: (ctx) => {
      if (ctx.itemType !== "vehicle") return null;
      if (ctx.destination === "IL") return null; // Israel uses same bands
      if (!GCC_COUNTRIES.includes(ctx.destination)) return null;
      return {
        id: "radar-frequency",
        severity: "warning",
        category: "Electronics",
        title: "Radar Sensor Frequency Conflict",
        description: "US-spec 77GHz front radar may operate on frequencies restricted by local telecom authorities in GCC countries.",
        action: "Radar sensor recalibration or replacement required after arrival.",
        estimatedCost: { min: 300, max: 600 },
      };
    },
  },
  {
    id: "headlight-pattern",
    check: (ctx) => {
      if (ctx.itemType !== "vehicle") return null;
      return {
        id: "headlight-pattern",
        severity: "warning",
        category: "Lighting",
        title: "Headlight Beam Pattern",
        description: "US-spec headlights are designed for right-hand traffic but may have incorrect beam cutoff patterns for local regulations.",
        action: "Headlight beam adjustment or leveling system recalibration required.",
        estimatedCost: { min: 80, max: 250 },
      };
    },
  },
  {
    id: "speedometer-units",
    check: (ctx) => {
      if (ctx.itemType !== "vehicle") return null;
      return {
        id: "speedometer-units",
        severity: "info",
        category: "Instruments",
        title: "Speedometer Display Units",
        description: "US vehicles display mph as primary unit. Local law requires km/h as the primary display.",
        action: "Reconfigure instrument cluster to show km/h as primary unit.",
        estimatedCost: { min: 50, max: 150 },
      };
    },
  },
  {
    id: "navigation-maps",
    check: (ctx) => {
      if (ctx.itemType !== "vehicle") return null;
      return {
        id: "navigation-maps",
        severity: "info",
        category: "Infotainment",
        title: "Navigation Map Data",
        description: "Factory navigation system contains North American map data only.",
        action: "Update infotainment system with regional map license and points of interest.",
        estimatedCost: { min: 150, max: 300 },
      };
    },
  },
  {
    id: "gcc-climate",
    check: (ctx) => {
      if (ctx.itemType !== "vehicle") return null;
      if (!GCC_COUNTRIES.includes(ctx.destination)) return null;
      return {
        id: "gcc-climate",
        severity: "warning",
        category: "Climate",
        title: "Extreme Heat Adaptation",
        description: "Vehicle cooling system may not be rated for sustained 50°C+ ambient temperatures common in Gulf region summers.",
        action: "Service AC system, upgrade coolant to high-temperature grade, inspect belt and hose condition.",
        estimatedCost: { min: 100, max: 250 },
      };
    },
  },
  {
    id: "saso-conformity",
    check: (ctx) => {
      if (ctx.destination !== "SA") return null;
      return {
        id: "saso-conformity",
        severity: "critical",
        category: "Certification",
        title: "SASO Conformity Certificate Required",
        description: "Saudi Arabia requires SASO (Saudi Standards, Metrology and Quality Organization) conformity certification. Import will be BLOCKED without this document.",
        action: "Obtain SASO conformity certificate from an accredited body before shipping.",
        estimatedCost: { min: 400, max: 800 },
      };
    },
  },
  {
    id: "gcc-type-approval",
    check: (ctx) => {
      if (ctx.itemType !== "vehicle") return null;
      if (!GCC_COUNTRIES.includes(ctx.destination) || ctx.destination === "SA") return null;
      return {
        id: "gcc-type-approval",
        severity: "warning",
        category: "Certification",
        title: "GCC Type Approval Documentation",
        description: "Vehicle requires type approval documentation for registration in GCC countries.",
        action: "Obtain GCC type approval certificate from vehicle manufacturer's regional representative.",
        estimatedCost: { min: 200, max: 500 },
      };
    },
  },
  {
    id: "israel-mot",
    check: (ctx) => {
      if (ctx.itemType !== "vehicle") return null;
      if (ctx.destination !== "IL") return null;
      return {
        id: "israel-mot",
        severity: "critical",
        category: "Inspection",
        title: "Mandatory MOT Inspection (Tesht Rishoni)",
        description: "All imported vehicles must pass a comprehensive first inspection at a licensed testing center before registration.",
        action: "Schedule MOT test immediately after customs release. Vehicle cannot be driven on public roads until passed.",
        estimatedCost: { min: 300, max: 600 },
      };
    },
  },
  {
    id: "israel-emissions",
    check: (ctx) => {
      if (ctx.itemType !== "vehicle") return null;
      if (ctx.destination !== "IL") return null;
      if (ctx.fuelType === "electric") return null;
      return {
        id: "israel-emissions",
        severity: "warning",
        category: "Emissions",
        title: "Euro 6 Emissions Compliance",
        description: "Israel requires vehicles to meet Euro 6 equivalent emissions standards. US EPA Tier 3 generally meets this, but verification is required.",
        action: "Provide emissions certification documentation. Catalytic converter inspection may be required.",
        estimatedCost: { min: 200, max: 500 },
      };
    },
  },
  {
    id: "israel-green-tax",
    check: (ctx) => {
      if (ctx.itemType !== "vehicle") return null;
      if (ctx.destination !== "IL") return null;
      if (ctx.fuelType === "electric") return null;
      return {
        id: "israel-green-tax",
        severity: "warning",
        category: "Environmental",
        title: "Green Tax (Ekoloqit) Levy",
        description: "Non-electric vehicles are subject to an environmental levy based on pollution grade (1-15). Higher displacement engines face steeper levies.",
        action: "Green tax amount determined during customs processing based on vehicle emissions classification.",
        estimatedCost: { min: 1400, max: 7000 },
      };
    },
  },
  {
    id: "age-restriction",
    check: (ctx) => {
      if (ctx.itemType !== "vehicle") return null;
      if (!ctx.vehicleYear) return null;

      const maxAge: Partial<Record<DestinationCountry, number>> = {
        SA: 5, KW: 5, QA: 5, BH: 5, OM: 5,
      };

      const limit = maxAge[ctx.destination];
      if (!limit) return null;

      const age = new Date().getFullYear() - ctx.vehicleYear;
      if (age <= limit) return null;

      return {
        id: "age-restriction",
        severity: "critical",
        category: "Legality",
        title: `Vehicle Exceeds Age Limit (${age} years)`,
        description: `This country prohibits import of vehicles older than ${limit} years. Your vehicle is ${age} years old and will be REJECTED at customs.`,
        action: "Import is not permitted. Consider a different destination country.",
      };
    },
  },
];

export function runHomologationCheck(input: CalculationInput): HomologationWarning[] {
  const ctx: HomologationRuleContext = {
    destination: input.destinationCountry,
    fuelType: input.vehicleFuelType,
    vehicleYear: input.vehicleYear,
    itemType: input.itemType,
  };

  const warnings: HomologationWarning[] = [];
  for (const rule of rules) {
    const result = rule.check(ctx);
    if (result) warnings.push(result);
  }

  // Sort: critical first, then warning, then info
  const order = { critical: 0, warning: 1, info: 2 };
  warnings.sort((a, b) => order[a.severity] - order[b.severity]);

  return warnings;
}
