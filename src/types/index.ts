export type ItemType = "vehicle" | "electronics" | "machinery" | "other";

export type VehicleFuelType = "gasoline" | "diesel" | "hybrid" | "plugin_hybrid" | "electric";

export type ShippingMethod = "roro" | "container";

export type OriginCountry = "US" | "CA";

export type DestinationCountry = "AE" | "SA" | "KW" | "QA" | "BH" | "OM" | "IL";

export interface Port {
  code: string;
  name: string;
  city: string;
  country: OriginCountry | DestinationCountry;
  coast?: "east" | "west" | "gulf";
}

export interface VehicleMake {
  id: string;
  name: string;
  models: VehicleModel[];
}

export interface VehicleModel {
  id: string;
  name: string;
}

export interface DutyRate {
  country: DestinationCountry;
  customsDutyPercent: number;
  purchaseTaxPercent?: number;
  vatPercent: number;
  notes: string;
}

export interface ShippingRoute {
  originCoast: "east" | "west" | "gulf";
  destinationPort: string;
  roro: number;
  container: number;
  transitDays: { min: number; max: number };
}

export interface ModificationRequirement {
  id: string;
  name: string;
  description: string;
  estimatedCostMin: number;
  estimatedCostMax: number;
  applicableTo: ItemType[];
  requiredIn: DestinationCountry[];
}

export interface CalculationInput {
  itemType: ItemType;
  itemValue: number;
  vehicleYear?: number;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleTrim?: string;
  vehicleFuelType?: VehicleFuelType;
  isOleh?: boolean;
  originCountry: OriginCountry;
  originRegion: string;
  destinationCountry: DestinationCountry;
  destinationCity: string;
  shippingMethod: ShippingMethod;
}

export interface CostLineItem {
  label: string;
  amount: number;
  description?: string;
  isSubItem?: boolean;
}

export interface HiddenFees {
  portStorage: number;
  customsXray: number;
  brokerDisbursement: number;
  total: number;
}

export interface CalculationResult {
  input: CalculationInput;
  breakdown: {
    basePrice: number;
    shipping: number;
    insurance: number;
    customsDuty: number;
    purchaseTax: number;
    vat: number;
    portHandling: number;
    modifications: CostLineItem[];
    documentation: number;
    hiddenFees: HiddenFees;
  };
  totalLandedCost: number;
  cifValue: number;
  estimatedTransitDays: { min: number; max: number };
  homologationWarnings: {
    id: string;
    severity: "critical" | "warning" | "info";
    category: string;
    title: string;
    description: string;
    action: string;
    estimatedCost?: { min: number; max: number };
  }[];
  disclaimer: string;
}
