import { CalculationInput, CalculationResult, CostLineItem } from "@/types";
import { calculateCIF, calculateCustomsDuty, calculateVAT } from "./duties";
import { estimateShipping } from "./shipping";
import { estimateModificationCost } from "./modifications";
import { getCoastForRegion } from "@/lib/data/countries";
import { PORT_HANDLING_FEE, DOCUMENTATION_FEE } from "@/lib/data/rates";

export function calculateLandedCost(input: CalculationInput): CalculationResult {
  const coast = getCoastForRegion(input.originCountry, input.originRegion);

  const shipping = estimateShipping(
    coast,
    input.destinationCountry,
    input.shippingMethod
  );

  const { cif, insurance } = calculateCIF(input.itemValue, shipping.cost);

  const customsDuty = calculateCustomsDuty(cif, input.destinationCountry);

  const vat = calculateVAT(cif, customsDuty, input.destinationCountry);

  const modifications = estimateModificationCost(
    input.itemType,
    input.destinationCountry
  );

  const modificationLineItems: CostLineItem[] = modifications.items.map((item) => ({
    label: item.name,
    amount: item.cost,
    isSubItem: true,
  }));

  const totalLandedCost =
    input.itemValue +
    shipping.cost +
    insurance +
    customsDuty +
    vat +
    PORT_HANDLING_FEE +
    modifications.total +
    DOCUMENTATION_FEE;

  return {
    input,
    breakdown: {
      basePrice: input.itemValue,
      shipping: shipping.cost,
      insurance,
      customsDuty,
      vat,
      portHandling: PORT_HANDLING_FEE,
      modifications: modificationLineItems,
      documentation: DOCUMENTATION_FEE,
    },
    totalLandedCost,
    cifValue: cif,
    estimatedTransitDays: shipping.transitDays,
    disclaimer:
      "This estimate is for informational purposes only. Actual costs may vary based on current exchange rates, regulatory changes, and specific item characteristics. Consult a licensed customs broker for binding quotes.",
  };
}
