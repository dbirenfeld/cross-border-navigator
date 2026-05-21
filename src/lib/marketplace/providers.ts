import { DestinationCountry } from "@/types";

export interface ServiceProvider {
  id: string;
  name: string;
  category: string;
  services: string[];
  location: string;
  country: DestinationCountry;
  priceRange: { min: number; max: number };
  rating: number;
  verified: boolean;
}

export const serviceProviders: ServiceProvider[] = [
  // UAE
  { id: "ae-1", name: "Gulf Auto Solutions", category: "Electronics & Radar", services: ["Radar recalibration", "Navigation update", "Infotainment region switch"], location: "Dubai, UAE", country: "AE", priceRange: { min: 500, max: 1500 }, rating: 4.8, verified: true },
  { id: "ae-2", name: "Al Quoz Performance", category: "Mechanical", services: ["AC system service", "Coolant upgrade", "Climate adaptation"], location: "Dubai, UAE", country: "AE", priceRange: { min: 200, max: 800 }, rating: 4.6, verified: true },
  { id: "ae-3", name: "Emirates Compliance Center", category: "Certification", services: ["GCC type approval", "Emissions testing", "Full compliance package"], location: "Abu Dhabi, UAE", country: "AE", priceRange: { min: 800, max: 2500 }, rating: 4.9, verified: true },
  // Saudi Arabia
  { id: "sa-1", name: "Riyadh Auto Compliance", category: "Certification", services: ["SASO conformity", "Emissions certification", "Full compliance package"], location: "Riyadh, Saudi Arabia", country: "SA", priceRange: { min: 1000, max: 3000 }, rating: 4.7, verified: true },
  { id: "sa-2", name: "Jeddah Tech Motors", category: "Electronics & Radar", services: ["Radar sensor adjustment", "Navigation maps", "Speedometer conversion"], location: "Jeddah, Saudi Arabia", country: "SA", priceRange: { min: 400, max: 1200 }, rating: 4.5, verified: true },
  // Israel
  { id: "il-1", name: "Tel Aviv Import Center", category: "Full Service", services: ["MOT preparation", "Emissions compliance", "Headlight adjustment", "Full import package"], location: "Tel Aviv, Israel", country: "IL", priceRange: { min: 1500, max: 5000 }, rating: 4.8, verified: true },
  { id: "il-2", name: "Haifa Auto Compliance", category: "Inspection & MOT", services: ["Tesht Rishoni preparation", "Pre-inspection service", "Speedometer conversion"], location: "Haifa, Israel", country: "IL", priceRange: { min: 500, max: 2000 }, rating: 4.6, verified: true },
  { id: "il-3", name: "Jerusalem Motors Tech", category: "Electronics", services: ["Navigation region switch", "Radio frequency update", "Infotainment localization"], location: "Jerusalem, Israel", country: "IL", priceRange: { min: 300, max: 1000 }, rating: 4.4, verified: false },
  // Kuwait
  { id: "kw-1", name: "Kuwait Import Services", category: "Full Service", services: ["GCC type approval", "Full compliance package", "Registration assistance"], location: "Kuwait City, Kuwait", country: "KW", priceRange: { min: 800, max: 2500 }, rating: 4.5, verified: true },
  // Qatar
  { id: "qa-1", name: "Doha Auto Compliance", category: "Certification", services: ["Qatar Standards compliance", "Vehicle inspection", "Registration support"], location: "Doha, Qatar", country: "QA", priceRange: { min: 700, max: 2000 }, rating: 4.6, verified: true },
];

export interface PartCategory {
  id: string;
  name: string;
  description: string;
  items: { name: string; priceRange: string }[];
}

export const partCategories: PartCategory[] = [
  {
    id: "instrument-clusters",
    name: "Instrument Clusters",
    description: "Metric-spec instrument clusters and digital gauge replacements",
    items: [
      { name: "Digital cluster (km/h primary)", priceRange: "$200 - $800" },
      { name: "OEM metric cluster conversion", priceRange: "$500 - $1,500" },
    ],
  },
  {
    id: "headlights",
    name: "Headlights & Lighting",
    description: "Region-specific headlight assemblies with proper beam patterns",
    items: [
      { name: "RHD-pattern headlight assembly (pair)", priceRange: "$400 - $1,200" },
      { name: "Adaptive headlight module", priceRange: "$300 - $900" },
      { name: "DRL compliance kit", priceRange: "$100 - $400" },
    ],
  },
  {
    id: "sensors",
    name: "Sensors & Radar",
    description: "Region-compliant radar sensors and ADAS components",
    items: [
      { name: "Front radar sensor (local frequency)", priceRange: "$500 - $1,500" },
      { name: "Parking sensor recalibration kit", priceRange: "$150 - $400" },
    ],
  },
  {
    id: "navigation",
    name: "Navigation & Infotainment",
    description: "Regional map data and system updates",
    items: [
      { name: "Navigation map license (Middle East)", priceRange: "$100 - $300" },
      { name: "Infotainment region unlock module", priceRange: "$200 - $600" },
      { name: "SIM/eSIM for connected services", priceRange: "$50 - $150" },
    ],
  },
];
