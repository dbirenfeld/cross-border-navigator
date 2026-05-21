import { ShippingMethod, DestinationCountry } from "@/types";
import { shippingRoutes } from "@/lib/data/rates";
import { destinationPorts } from "@/lib/data/countries";

export function getDestinationPortCode(country: DestinationCountry): string {
  const port = destinationPorts.find((p) => p.country === country);
  return port?.code ?? "AEJEA";
}

export function estimateShipping(
  originCoast: "east" | "west" | "gulf",
  destinationCountry: DestinationCountry,
  method: ShippingMethod
): { cost: number; transitDays: { min: number; max: number } } {
  const portCode = getDestinationPortCode(destinationCountry);

  const route = shippingRoutes.find(
    (r) => r.originCoast === originCoast && r.destinationPort === portCode
  );

  if (!route) {
    // Fallback to average if exact route not found
    const fallbackRoutes = shippingRoutes.filter((r) => r.originCoast === originCoast);
    if (fallbackRoutes.length === 0) {
      return { cost: 3000, transitDays: { min: 30, max: 45 } };
    }
    const avg = fallbackRoutes.reduce(
      (acc, r) => ({
        cost: acc.cost + r[method],
        minDays: acc.minDays + r.transitDays.min,
        maxDays: acc.maxDays + r.transitDays.max,
      }),
      { cost: 0, minDays: 0, maxDays: 0 }
    );
    return {
      cost: Math.round(avg.cost / fallbackRoutes.length),
      transitDays: {
        min: Math.round(avg.minDays / fallbackRoutes.length),
        max: Math.round(avg.maxDays / fallbackRoutes.length),
      },
    };
  }

  return {
    cost: route[method],
    transitDays: route.transitDays,
  };
}
