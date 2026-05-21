import { DutyRate, DestinationCountry, ShippingRoute } from "@/types";

export const dutyRates: Record<DestinationCountry, DutyRate> = {
  AE: {
    country: "AE",
    customsDutyPercent: 5,
    vatPercent: 5,
    notes: "Free zones may have different rates. Duty calculated on CIF value.",
  },
  SA: {
    country: "SA",
    customsDutyPercent: 5,
    vatPercent: 15,
    notes: "SASO conformity certificate required. Vehicles must not exceed 5 years of age.",
  },
  KW: {
    country: "KW",
    customsDutyPercent: 5,
    vatPercent: 0,
    notes: "Vehicles older than 5 years from manufacture date are not permitted.",
  },
  QA: {
    country: "QA",
    customsDutyPercent: 5,
    vatPercent: 0,
    notes: "Qatar Standards (QS) compliance required for all vehicles.",
  },
  BH: {
    country: "BH",
    customsDutyPercent: 5,
    vatPercent: 10,
    notes: "Duty calculated on CIF value.",
  },
  OM: {
    country: "OM",
    customsDutyPercent: 5,
    vatPercent: 5,
    notes: "Royal Oman Police clearance required for vehicle registration.",
  },
  IL: {
    country: "IL",
    customsDutyPercent: 7,
    purchaseTaxPercent: 83,
    vatPercent: 18,
    notes: "Purchase tax (83%) applied on CIF + duty for gasoline/diesel vehicles. Electric vehicles: 52% purchase tax. VAT (18%, raised from 17% in Jan 2025) applied on CIF + duty + purchase tax. Olim receive reduced purchase tax (50% instead of 83%). Additional Green Tax levy applies based on pollution grade.",
  },
};

export const shippingRoutes: ShippingRoute[] = [
  // East Coast to Middle East
  { originCoast: "east", destinationPort: "AEJEA", roro: 2800, container: 4200, transitDays: { min: 28, max: 38 } },
  { originCoast: "east", destinationPort: "AEAUH", roro: 2900, container: 4300, transitDays: { min: 30, max: 40 } },
  { originCoast: "east", destinationPort: "SADAM", roro: 3000, container: 4400, transitDays: { min: 30, max: 42 } },
  { originCoast: "east", destinationPort: "SAJED", roro: 3200, container: 4600, transitDays: { min: 25, max: 35 } },
  { originCoast: "east", destinationPort: "KWSHU", roro: 3100, container: 4500, transitDays: { min: 32, max: 44 } },
  { originCoast: "east", destinationPort: "QADOH", roro: 3000, container: 4400, transitDays: { min: 30, max: 42 } },
  { originCoast: "east", destinationPort: "BHKBS", roro: 3050, container: 4450, transitDays: { min: 31, max: 43 } },
  { originCoast: "east", destinationPort: "OMSOH", roro: 2950, container: 4350, transitDays: { min: 29, max: 39 } },

  // West Coast to Middle East (via Pacific/Suez - longer route)
  { originCoast: "west", destinationPort: "AEJEA", roro: 3400, container: 5000, transitDays: { min: 35, max: 50 } },
  { originCoast: "west", destinationPort: "AEAUH", roro: 3500, container: 5100, transitDays: { min: 37, max: 52 } },
  { originCoast: "west", destinationPort: "SADAM", roro: 3600, container: 5200, transitDays: { min: 38, max: 53 } },
  { originCoast: "west", destinationPort: "SAJED", roro: 3300, container: 4900, transitDays: { min: 33, max: 48 } },
  { originCoast: "west", destinationPort: "KWSHU", roro: 3700, container: 5300, transitDays: { min: 40, max: 55 } },
  { originCoast: "west", destinationPort: "QADOH", roro: 3600, container: 5200, transitDays: { min: 38, max: 53 } },
  { originCoast: "west", destinationPort: "BHKBS", roro: 3650, container: 5250, transitDays: { min: 39, max: 54 } },
  { originCoast: "west", destinationPort: "OMSOH", roro: 3550, container: 5150, transitDays: { min: 37, max: 52 } },

  // Gulf Coast to Middle East
  { originCoast: "gulf", destinationPort: "AEJEA", roro: 2600, container: 3900, transitDays: { min: 26, max: 36 } },
  { originCoast: "gulf", destinationPort: "AEAUH", roro: 2700, container: 4000, transitDays: { min: 28, max: 38 } },
  { originCoast: "gulf", destinationPort: "SADAM", roro: 2800, container: 4100, transitDays: { min: 28, max: 40 } },
  { originCoast: "gulf", destinationPort: "SAJED", roro: 2500, container: 3800, transitDays: { min: 23, max: 33 } },
  { originCoast: "gulf", destinationPort: "KWSHU", roro: 2900, container: 4200, transitDays: { min: 30, max: 42 } },
  { originCoast: "gulf", destinationPort: "QADOH", roro: 2800, container: 4100, transitDays: { min: 28, max: 40 } },
  { originCoast: "gulf", destinationPort: "BHKBS", roro: 2850, container: 4150, transitDays: { min: 29, max: 41 } },
  { originCoast: "gulf", destinationPort: "OMSOH", roro: 2750, container: 4050, transitDays: { min: 27, max: 37 } },

  // East Coast to Israel (Mediterranean - shorter than Gulf)
  { originCoast: "east", destinationPort: "ILASH", roro: 2400, container: 3800, transitDays: { min: 18, max: 25 } },
  { originCoast: "east", destinationPort: "ILHFA", roro: 2450, container: 3850, transitDays: { min: 18, max: 25 } },

  // West Coast to Israel (via Panama Canal or Pacific/Suez)
  { originCoast: "west", destinationPort: "ILASH", roro: 3600, container: 5200, transitDays: { min: 35, max: 50 } },
  { originCoast: "west", destinationPort: "ILHFA", roro: 3650, container: 5250, transitDays: { min: 35, max: 50 } },

  // Gulf Coast to Israel
  { originCoast: "gulf", destinationPort: "ILASH", roro: 2600, container: 4000, transitDays: { min: 22, max: 30 } },
  { originCoast: "gulf", destinationPort: "ILHFA", roro: 2650, container: 4050, transitDays: { min: 22, max: 30 } },
];

export const INSURANCE_RATE = 0.015; // 1.5% of CIF
export const PORT_HANDLING_FEE = 350;
export const DOCUMENTATION_FEE = 250;

export const HIDDEN_FEES = {
  portStoragePerDay: 75,
  estimatedStorageDays: 4,
  customsXrayFee: 150,
  brokerDisbursement: 200,
};

export const TOTAL_HIDDEN_FEES =
  HIDDEN_FEES.portStoragePerDay * HIDDEN_FEES.estimatedStorageDays +
  HIDDEN_FEES.customsXrayFee +
  HIDDEN_FEES.brokerDisbursement;
