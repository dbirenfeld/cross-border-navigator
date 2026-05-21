export interface DeclarationData {
  // Importer Info
  importerName: string;
  importerAddress: string;
  importerPhone: string;
  importerEmail: string;
  importerId: string; // National ID or passport

  // Item Info
  itemDescription: string;
  itemType: string;
  hsCode: string;
  quantity: number;
  unitValue: number;
  totalValue: number;
  currency: string;
  countryOfOrigin: string;
  manufacturer: string;

  // Vehicle-specific
  vehicleVin?: string;
  vehicleYear?: number;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleColor?: string;
  vehicleEngine?: string;
  vehicleMileage?: number;

  // Shipping Info
  shippingMethod: string;
  vesselName?: string;
  billOfLading?: string;
  portOfOrigin: string;
  portOfDestination: string;
  estimatedArrival?: string;

  // Destination
  destinationCountry: string;
  declarationDate: string;
}

export interface HsCode {
  code: string;
  description: string;
  applicableTo: string[];
}

export const commonHsCodes: HsCode[] = [
  { code: "8703.23", description: "Motor vehicles for transport of persons (1500-3000cc)", applicableTo: ["vehicle"] },
  { code: "8703.24", description: "Motor vehicles for transport of persons (>3000cc)", applicableTo: ["vehicle"] },
  { code: "8703.32", description: "Motor vehicles, diesel (1500-2500cc)", applicableTo: ["vehicle"] },
  { code: "8703.33", description: "Motor vehicles, diesel (>2500cc)", applicableTo: ["vehicle"] },
  { code: "8703.80", description: "Electric motor vehicles for transport of persons", applicableTo: ["vehicle"] },
  { code: "8704.21", description: "Motor vehicles for transport of goods (GVW <= 5 tonnes)", applicableTo: ["vehicle"] },
  { code: "8471.30", description: "Portable automatic data processing machines (laptops)", applicableTo: ["electronics"] },
  { code: "8528.72", description: "Television receivers / monitors", applicableTo: ["electronics"] },
  { code: "8479.89", description: "Machines and mechanical appliances, other", applicableTo: ["machinery"] },
  { code: "8422.30", description: "Machinery for filling, closing, sealing containers", applicableTo: ["machinery"] },
];
