import { DestinationCountry } from "@/types";
import { dutyRates, INSURANCE_RATE } from "@/lib/data/rates";

export function calculateCIF(
  itemValue: number,
  shippingCost: number
): { cif: number; insurance: number } {
  const insurance = Math.round((itemValue + shippingCost) * INSURANCE_RATE);
  const cif = itemValue + shippingCost + insurance;
  return { cif, insurance };
}

export function calculateCustomsDuty(
  cifValue: number,
  destination: DestinationCountry
): number {
  const rate = dutyRates[destination];
  return Math.round(cifValue * (rate.customsDutyPercent / 100));
}

export function calculateVAT(
  cifValue: number,
  customsDuty: number,
  destination: DestinationCountry
): number {
  const rate = dutyRates[destination];
  // VAT is typically calculated on CIF + Duty
  return Math.round((cifValue + customsDuty) * (rate.vatPercent / 100));
}

export function getDutyInfo(destination: DestinationCountry) {
  return dutyRates[destination];
}
