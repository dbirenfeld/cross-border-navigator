import { CalculationInput, CalculationResult, CostLineItem } from "@/types";
import { calculateCIF, calculateCustomsDuty, calculatePurchaseTax, calculateVAT } from "./duties";
import { estimateShipping } from "./shipping";
import { estimateModificationCost } from "./modifications";
import { getCoastForRegion } from "@/lib/data/countries";
import { PORT_HANDLING_FEE, DOCUMENTATION_FEE, HIDDEN_FEES } from "@/lib/data/rates";

export function calculateLandedCost(input: CalculationInput): CalculationResult {
  const coast = getCoastForRegion(input.originCountry, input.originRegion);

  const shipping = estimateShipping(
    coast,
    input.destinationCountry,
    input.shippingMethod
  );

  const { cif, insurance } = calculateCIF(input.itemValue, shipping.cost);

  const customsDuty = calculateCustomsDuty(cif, input.destinationCountry);

  const purchaseTax = calculatePurchaseTax(
    cif, customsDuty, input.destinationCountry,
    input.vehicleFuelType, input.isOleh
  );

  const vat = calculateVAT(cif, customsDuty, purchaseTax, input.destinationCountry);

  const modifications = estimateModificationCost(
    input.itemType,
    input.destinationCountry,
    input.vehicleFuelType
  );

  const modificationLineItems: CostLineItem[] = modifications.items.map((item) => ({
    label: item.name,
    amount: item.cost,
    isSubItem: true,
  }));

  const hiddenFees = {
    portStorage: HIDDEN_FEES.portStoragePerDay * HIDDEN_FEES.estimatedStorageDays,
    customsXray: HIDDEN_FEES.customsXrayFee,
    brokerDisbursement: HIDDEN_FEES.brokerDisbursement,
    total:
      HIDDEN_FEES.portStoragePerDay * HIDDEN_FEES.estimatedStorageDays +
      HIDDEN_FEES.customsXrayFee +
      HIDDEN_FEES.brokerDisbursement,
  };

  const totalLandedCost =
    input.itemValue +
    shipping.cost +
    insurance +
    customsDuty +
    purchaseTax +
    vat +
    PORT_HANDLING_FEE +
    modifications.total +
    DOCUMENTATION_FEE +
    hiddenFees.total;

  return {
    input,
    breakdown: {
      basePrice: input.itemValue,
      shipping: shipping.cost,
      insurance,
      customsDuty,
      purchaseTax,
      vat,
      portHandling: PORT_HANDLING_FEE,
      modifications: modificationLineItems,
      documentation: DOCUMENTATION_FEE,
      hiddenFees,
    },
    totalLandedCost,
    cifValue: cif,
    estimatedTransitDays: shipping.transitDays,
    disclaimer:
      "This estimate is for informational purposes only. Actual costs may vary based on current exchange rates, regulatory changes, and specific item characteristics. Consult a licensed customs broker for binding quotes.",
  };
}
