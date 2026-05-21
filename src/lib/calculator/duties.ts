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

export function calculatePurchaseTax(
  cifValue: number,
  customsDuty: number,
  destination: DestinationCountry
): number {
  const rate = dutyRates[destination];
  if (!rate.purchaseTaxPercent) return 0;
  // Purchase tax is applied on CIF + customs duty
  return Math.round((cifValue + customsDuty) * (rate.purchaseTaxPercent / 100));
}

export function calculateVAT(
  cifValue: number,
  customsDuty: number,
  purchaseTax: number,
  destination: DestinationCountry
): number {
  const rate = dutyRates[destination];
  // VAT is calculated on CIF + Duty + Purchase Tax (for countries like Israel)
  return Math.round((cifValue + customsDuty + purchaseTax) * (rate.vatPercent / 100));
}

export function getDutyInfo(destination: DestinationCountry) {
  return dutyRates[destination];
}
