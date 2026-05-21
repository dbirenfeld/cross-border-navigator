import { DestinationCountry, VehicleFuelType } from "@/types";
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

/**
 * Resolves the effective purchase tax percentage based on destination,
 * vehicle fuel type, and oleh (new immigrant) status.
 */
export function getEffectivePurchaseTaxPercent(
  destination: DestinationCountry,
  fuelType?: VehicleFuelType,
  isOleh?: boolean
): number {
  const rate = dutyRates[destination];
  if (!rate.purchaseTaxPercent) return 0;

  if (destination === "IL") {
    let basePurchaseTax = rate.purchaseTaxPercent; // 83% default for gasoline/diesel

    if (fuelType === "electric") {
      basePurchaseTax = 52;
    } else if (fuelType === "plugin_hybrid") {
      basePurchaseTax = 55;
    } else if (fuelType === "hybrid") {
      basePurchaseTax = 60;
    }

    if (isOleh) {
      // Olim receive approximately 50% purchase tax instead of the standard rate
      basePurchaseTax = Math.min(basePurchaseTax, 50);
    }

    return basePurchaseTax;
  }

  return rate.purchaseTaxPercent;
}

export function calculatePurchaseTax(
  cifValue: number,
  customsDuty: number,
  destination: DestinationCountry,
  fuelType?: VehicleFuelType,
  isOleh?: boolean
): number {
  const effectiveRate = getEffectivePurchaseTaxPercent(destination, fuelType, isOleh);
  if (effectiveRate === 0) return 0;
  return Math.round((cifValue + customsDuty) * (effectiveRate / 100));
}

export function calculateVAT(
  cifValue: number,
  customsDuty: number,
  purchaseTax: number,
  destination: DestinationCountry
): number {
  const rate = dutyRates[destination];
  return Math.round((cifValue + customsDuty + purchaseTax) * (rate.vatPercent / 100));
}

export function getDutyInfo(destination: DestinationCountry) {
  return dutyRates[destination];
}
