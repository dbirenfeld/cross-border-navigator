import { DestinationCountry } from "@/types";

export interface VinDecodedResult {
  vin: string;
  year: number | null;
  make: string;
  model: string;
  trim: string;
  bodyClass: string;
  driveType: string;
  fuelType: string;
  engineCylinders: string;
  engineDisplacement: string;
  horsepower: string;
  transmissionType: string;
  plantCountry: string;
  plantCity: string;
  vehicleType: string;
  gvwr: string;
  doors: string;
  errorCode: string | null;
  raw: Record<string, string>;
}

const VIN_YEAR_MAP: Record<string, number> = {
  A: 2010, B: 2011, C: 2012, D: 2013, E: 2014, F: 2015,
  G: 2016, H: 2017, J: 2018, K: 2019, L: 2020, M: 2021,
  N: 2022, P: 2023, R: 2024, S: 2025, T: 2026, V: 2027,
  W: 2028, X: 2029, Y: 2030, "1": 2031, "2": 2032, "3": 2033,
};

const VIN_COUNTRY_MAP: Record<string, string> = {
  "1": "United States", "4": "United States", "5": "United States",
  "2": "Canada", "3": "Mexico",
  J: "Japan", K: "South Korea", L: "China",
  S: "United Kingdom", W: "Germany", Z: "Italy",
  V: "France/Spain", Y: "Sweden/Finland",
};

export function parseVinLocally(vin: string): { year: number | null; country: string } {
  const yearChar = vin.charAt(9).toUpperCase();
  const countryChar = vin.charAt(0).toUpperCase();

  return {
    year: VIN_YEAR_MAP[yearChar] ?? null,
    country: VIN_COUNTRY_MAP[countryChar] ?? "Unknown",
  };
}

export function isValidVin(vin: string): boolean {
  return /^[A-HJ-NPR-Z0-9]{17}$/i.test(vin);
}

export async function decodeVin(vin: string): Promise<VinDecodedResult> {
  const response = await fetch(`/api/vin?vin=${encodeURIComponent(vin)}`);
  if (!response.ok) throw new Error("VIN decode failed");
  return response.json();
}

export interface LegalityRule {
  country: DestinationCountry;
  maxAgeYears: number | null;
  minAgeYears: number | null;
  notes: string;
  blockedCategories: string[];
}

export const importLegalityRules: LegalityRule[] = [
  {
    country: "AE",
    maxAgeYears: null,
    minAgeYears: null,
    notes: "No strict age limit but older vehicles may face higher inspection requirements.",
    blockedCategories: [],
  },
  {
    country: "SA",
    maxAgeYears: 5,
    minAgeYears: null,
    notes: "Vehicles must not exceed 5 years from manufacture date. SASO conformity required.",
    blockedCategories: ["salvage"],
  },
  {
    country: "KW",
    maxAgeYears: 5,
    minAgeYears: null,
    notes: "Vehicles older than 5 years from manufacture are not permitted for import.",
    blockedCategories: ["salvage", "flood"],
  },
  {
    country: "QA",
    maxAgeYears: 5,
    minAgeYears: null,
    notes: "Vehicles must not exceed 5 years. Qatar Standards compliance required.",
    blockedCategories: ["salvage"],
  },
  {
    country: "BH",
    maxAgeYears: 5,
    minAgeYears: null,
    notes: "Generally 5-year age limit for personal imports.",
    blockedCategories: [],
  },
  {
    country: "OM",
    maxAgeYears: 5,
    minAgeYears: null,
    notes: "5-year age limit. Royal Oman Police clearance needed.",
    blockedCategories: ["salvage"],
  },
  {
    country: "IL",
    maxAgeYears: null,
    minAgeYears: null,
    notes: "No strict age limit. However, emissions standards (Euro 6 equivalent) required. Used vehicles must pass stringent MOT inspection.",
    blockedCategories: [],
  },
];

export function checkImportLegality(
  vehicleYear: number | null,
  destination: DestinationCountry
): { allowed: boolean; warnings: string[]; notes: string } {
  const rule = importLegalityRules.find((r) => r.country === destination);
  if (!rule) return { allowed: true, warnings: [], notes: "No specific rules found for this destination." };

  const warnings: string[] = [];
  let allowed = true;
  const currentYear = new Date().getFullYear();

  if (vehicleYear && rule.maxAgeYears) {
    const age = currentYear - vehicleYear;
    if (age > rule.maxAgeYears) {
      allowed = false;
      warnings.push(`Vehicle is ${age} years old. Maximum allowed age is ${rule.maxAgeYears} years.`);
    }
  }

  return { allowed, warnings, notes: rule.notes };
}
