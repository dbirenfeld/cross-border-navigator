import { VehicleMake } from "@/types";

export const vehicleMakes: VehicleMake[] = [
  {
    id: "toyota",
    name: "Toyota",
    models: [
      { id: "camry", name: "Camry" },
      { id: "corolla", name: "Corolla" },
      { id: "rav4", name: "RAV4" },
      { id: "highlander", name: "Highlander" },
      { id: "4runner", name: "4Runner" },
      { id: "tundra", name: "Tundra" },
      { id: "tacoma", name: "Tacoma" },
      { id: "land-cruiser", name: "Land Cruiser" },
      { id: "supra", name: "Supra" },
    ],
  },
  {
    id: "ford",
    name: "Ford",
    models: [
      { id: "f150", name: "F-150" },
      { id: "mustang", name: "Mustang" },
      { id: "explorer", name: "Explorer" },
      { id: "bronco", name: "Bronco" },
      { id: "expedition", name: "Expedition" },
      { id: "ranger", name: "Ranger" },
      { id: "edge", name: "Edge" },
    ],
  },
  {
    id: "chevrolet",
    name: "Chevrolet",
    models: [
      { id: "silverado", name: "Silverado" },
      { id: "tahoe", name: "Tahoe" },
      { id: "suburban", name: "Suburban" },
      { id: "camaro", name: "Camaro" },
      { id: "corvette", name: "Corvette" },
      { id: "traverse", name: "Traverse" },
      { id: "equinox", name: "Equinox" },
    ],
  },
  {
    id: "dodge",
    name: "Dodge",
    models: [
      { id: "charger", name: "Charger" },
      { id: "challenger", name: "Challenger" },
      { id: "durango", name: "Durango" },
      { id: "ram-1500", name: "RAM 1500" },
      { id: "ram-2500", name: "RAM 2500" },
    ],
  },
  {
    id: "gmc",
    name: "GMC",
    models: [
      { id: "sierra", name: "Sierra" },
      { id: "yukon", name: "Yukon" },
      { id: "denali", name: "Denali" },
      { id: "terrain", name: "Terrain" },
      { id: "canyon", name: "Canyon" },
    ],
  },
  {
    id: "bmw",
    name: "BMW",
    models: [
      { id: "3-series", name: "3 Series" },
      { id: "5-series", name: "5 Series" },
      { id: "7-series", name: "7 Series" },
      { id: "x3", name: "X3" },
      { id: "x5", name: "X5" },
      { id: "x7", name: "X7" },
      { id: "m3", name: "M3" },
      { id: "m5", name: "M5" },
    ],
  },
  {
    id: "mercedes",
    name: "Mercedes-Benz",
    models: [
      { id: "c-class", name: "C-Class" },
      { id: "e-class", name: "E-Class" },
      { id: "s-class", name: "S-Class" },
      { id: "gle", name: "GLE" },
      { id: "gls", name: "GLS" },
      { id: "g-class", name: "G-Class" },
      { id: "amg-gt", name: "AMG GT" },
    ],
  },
  {
    id: "lexus",
    name: "Lexus",
    models: [
      { id: "es", name: "ES" },
      { id: "is", name: "IS" },
      { id: "ls", name: "LS" },
      { id: "rx", name: "RX" },
      { id: "gx", name: "GX" },
      { id: "lx", name: "LX" },
      { id: "lc", name: "LC" },
    ],
  },
  {
    id: "porsche",
    name: "Porsche",
    models: [
      { id: "911", name: "911" },
      { id: "cayenne", name: "Cayenne" },
      { id: "macan", name: "Macan" },
      { id: "panamera", name: "Panamera" },
      { id: "taycan", name: "Taycan" },
    ],
  },
  {
    id: "tesla",
    name: "Tesla",
    models: [
      { id: "model-3", name: "Model 3" },
      { id: "model-y", name: "Model Y" },
      { id: "model-s", name: "Model S" },
      { id: "model-x", name: "Model X" },
      { id: "cybertruck", name: "Cybertruck" },
    ],
  },
  {
    id: "nissan",
    name: "Nissan",
    models: [
      { id: "patrol", name: "Patrol" },
      { id: "altima", name: "Altima" },
      { id: "pathfinder", name: "Pathfinder" },
      { id: "gtr", name: "GT-R" },
      { id: "armada", name: "Armada" },
    ],
  },
  {
    id: "jeep",
    name: "Jeep",
    models: [
      { id: "wrangler", name: "Wrangler" },
      { id: "grand-cherokee", name: "Grand Cherokee" },
      { id: "gladiator", name: "Gladiator" },
      { id: "compass", name: "Compass" },
    ],
  },
];

export const currentYear = new Date().getFullYear();
export const vehicleYears = Array.from({ length: 10 }, (_, i) => currentYear - i);
