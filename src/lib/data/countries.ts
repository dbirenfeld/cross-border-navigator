import { Port, OriginCountry, DestinationCountry } from "@/types";

export const originCountries: Record<OriginCountry, { name: string; regions: string[] }> = {
  US: {
    name: "United States",
    regions: [
      "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
      "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
      "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
      "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
      "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
      "New Hampshire", "New Jersey", "New Mexico", "New York",
      "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
      "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
      "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
      "West Virginia", "Wisconsin", "Wyoming",
    ],
  },
  CA: {
    name: "Canada",
    regions: [
      "Alberta", "British Columbia", "Manitoba", "New Brunswick",
      "Newfoundland and Labrador", "Nova Scotia", "Ontario",
      "Prince Edward Island", "Quebec", "Saskatchewan",
      "Northwest Territories", "Nunavut", "Yukon",
    ],
  },
};

export const destinationCountries: Record<DestinationCountry, { name: string; cities: string[] }> = {
  AE: { name: "United Arab Emirates", cities: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"] },
  SA: { name: "Saudi Arabia", cities: ["Riyadh", "Jeddah", "Dammam", "Khobar"] },
  KW: { name: "Kuwait", cities: ["Kuwait City", "Salmiya", "Hawalli"] },
  QA: { name: "Qatar", cities: ["Doha", "Al Wakrah", "Al Khor"] },
  BH: { name: "Bahrain", cities: ["Manama", "Muharraq", "Riffa"] },
  OM: { name: "Oman", cities: ["Muscat", "Salalah", "Sohar"] },
  IL: { name: "Israel", cities: ["Tel Aviv", "Jerusalem", "Haifa", "Beer Sheva", "Ashdod", "Netanya"] },
};

export const originPorts: Port[] = [
  { code: "USNWK", name: "Port Newark", city: "Newark, NJ", country: "US", coast: "east" },
  { code: "USSAV", name: "Port of Savannah", city: "Savannah, GA", country: "US", coast: "east" },
  { code: "USHOU", name: "Port of Houston", city: "Houston, TX", country: "US", coast: "gulf" },
  { code: "USLAX", name: "Port of Los Angeles", city: "Los Angeles, CA", country: "US", coast: "west" },
  { code: "USLGB", name: "Port of Long Beach", city: "Long Beach, CA", country: "US", coast: "west" },
  { code: "CAHFX", name: "Port of Halifax", city: "Halifax, NS", country: "CA", coast: "east" },
  { code: "CAMON", name: "Port of Montreal", city: "Montreal, QC", country: "CA", coast: "east" },
  { code: "CAVAN", name: "Port of Vancouver", city: "Vancouver, BC", country: "CA", coast: "west" },
];

export const destinationPorts: Port[] = [
  { code: "AEJEA", name: "Jebel Ali Port", city: "Dubai", country: "AE" },
  { code: "AEAUH", name: "Khalifa Port", city: "Abu Dhabi", country: "AE" },
  { code: "SADAM", name: "King Abdulaziz Port", city: "Dammam", country: "SA" },
  { code: "SAJED", name: "Jeddah Islamic Port", city: "Jeddah", country: "SA" },
  { code: "KWSHU", name: "Shuwaikh Port", city: "Kuwait City", country: "KW" },
  { code: "QADOH", name: "Hamad Port", city: "Doha", country: "QA" },
  { code: "BHKBS", name: "Khalifa Bin Salman Port", city: "Manama", country: "BH" },
  { code: "OMSOH", name: "Port of Sohar", city: "Sohar", country: "OM" },
  { code: "ILASH", name: "Port of Ashdod", city: "Ashdod", country: "IL" },
  { code: "ILHFA", name: "Port of Haifa", city: "Haifa", country: "IL" },
];

export function getCoastForRegion(country: OriginCountry, region: string): "east" | "west" | "gulf" {
  const westCoastStates = ["California", "Oregon", "Washington", "Hawaii", "Alaska"];
  const gulfStates = ["Texas", "Louisiana", "Mississippi", "Alabama", "Florida"];
  const westCoastProvinces = ["British Columbia", "Alberta", "Saskatchewan", "Yukon", "Northwest Territories"];

  if (country === "US") {
    if (westCoastStates.includes(region)) return "west";
    if (gulfStates.includes(region)) return "gulf";
    return "east";
  }

  if (westCoastProvinces.includes(region)) return "west";
  return "east";
}
