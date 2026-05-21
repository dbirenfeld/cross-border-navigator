import { destinationCountries, originCountries } from "./countries";
import { shippingRoutes } from "./rates";
import { vehicleMakes } from "./vehicles";

export const platformStats = {
  get destinationCountries() {
    return Object.keys(destinationCountries).length;
  },
  get originCountries() {
    return Object.keys(originCountries).length;
  },
  get totalCountries() {
    return this.destinationCountries + this.originCountries;
  },
  get shippingRoutes() {
    return shippingRoutes.length;
  },
  get vehicleBrands() {
    return vehicleMakes.filter((m) => m.id !== "other").length;
  },
  get totalModels() {
    return vehicleMakes.reduce((sum, m) => sum + m.models.length, 0);
  },
  get destinationCountryNames() {
    return Object.values(destinationCountries).map((c) => c.name);
  },
  get originCountryNames() {
    return Object.values(originCountries).map((c) => c.name);
  },
};
