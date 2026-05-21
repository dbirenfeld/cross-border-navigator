import { DestinationCountry } from "@/types";
import { VinDecodedResult } from "./vin-decoder";

export interface ComplianceItem {
  id: string;
  category: string;
  description: string;
  status: "pass" | "fail" | "warning";
  action?: string;
  estimatedCost?: { min: number; max: number };
}

export function runComplianceScan(
  vehicle: VinDecodedResult,
  destination: DestinationCountry
): ComplianceItem[] {
  const items: ComplianceItem[] = [];

  // Radar/sensor frequency check
  if (destination !== "IL") {
    items.push({
      id: "radar-freq",
      category: "Electronics",
      description: "Front radar sensor frequency (77GHz) compliance with local telecom regulations",
      status: "warning",
      action: "Radar sensor may need recalibration for local frequency band allocation",
      estimatedCost: { min: 300, max: 600 },
    });
  }

  // Headlight check - all destinations require adjustment from US-spec
  items.push({
    id: "headlights",
    category: "Lighting",
    description: "Headlight beam pattern adjustment for local traffic regulations",
    status: "warning",
    action: "US-spec headlights need beam pattern adjustment for right-hand traffic",
    estimatedCost: { min: 80, max: 250 },
  });

  // Speedometer
  items.push({
    id: "speedometer",
    category: "Instruments",
    description: "Speedometer primary display unit (km/h required)",
    status: vehicle.plantCountry === "Japan" || vehicle.plantCountry === "United Kingdom" ? "pass" : "warning",
    action: "Configure instrument cluster to display km/h as primary unit",
    estimatedCost: { min: 50, max: 150 },
  });

  // Navigation maps
  items.push({
    id: "navigation",
    category: "Infotainment",
    description: "Navigation system regional map data",
    status: "warning",
    action: "Update infotainment with local maps and points of interest",
    estimatedCost: { min: 150, max: 300 },
  });

  // Emissions check
  const isElectric = vehicle.fuelType?.toLowerCase().includes("electric");
  if (isElectric) {
    items.push({
      id: "emissions",
      category: "Emissions",
      description: "Vehicle emissions compliance",
      status: "pass",
      action: "Electric vehicle - no emissions modifications required",
    });
  } else {
    items.push({
      id: "emissions",
      category: "Emissions",
      description: "Emissions standard compliance with destination requirements",
      status: destination === "IL" ? "warning" : "pass",
      action: destination === "IL"
        ? "Must meet Euro 6 equivalent standards. May require catalytic converter verification."
        : "US EPA standards generally meet or exceed GCC requirements",
      estimatedCost: destination === "IL" ? { min: 200, max: 500 } : undefined,
    });
  }

  // Climate system (GCC only)
  const gccCountries: DestinationCountry[] = ["AE", "SA", "KW", "QA", "BH", "OM"];
  if (gccCountries.includes(destination)) {
    items.push({
      id: "climate",
      category: "Climate",
      description: "AC and cooling system rated for extreme heat conditions",
      status: "warning",
      action: "Service AC system, replace coolant with high-temperature grade",
      estimatedCost: { min: 100, max: 250 },
    });
  }

  // SASO conformity (Saudi only)
  if (destination === "SA") {
    items.push({
      id: "saso",
      category: "Certification",
      description: "SASO (Saudi Standards Organization) conformity certificate",
      status: "fail",
      action: "Must obtain SASO conformity certification before import clearance",
      estimatedCost: { min: 400, max: 800 },
    });
  }

  // Israel MOT
  if (destination === "IL") {
    items.push({
      id: "il-mot",
      category: "Inspection",
      description: "Israeli MOT (Tesht Rishoni) first inspection",
      status: "warning",
      action: "Mandatory vehicle inspection at licensed testing center upon arrival",
      estimatedCost: { min: 300, max: 600 },
    });

    if (!isElectric) {
      items.push({
        id: "il-green-tax",
        category: "Tax",
        description: "Green Tax (Ekoloqit) based on pollution grade",
        status: "warning",
        action: "Environmental levy applies based on engine emissions classification",
        estimatedCost: { min: 1400, max: 7000 },
      });
    }
  }

  // GCC Type Approval
  if (gccCountries.includes(destination) && destination !== "SA") {
    items.push({
      id: "gcc-approval",
      category: "Certification",
      description: "GCC Type Approval documentation",
      status: "warning",
      action: "Obtain GCC type approval documentation for vehicle registration",
      estimatedCost: { min: 200, max: 500 },
    });
  }

  return items;
}
