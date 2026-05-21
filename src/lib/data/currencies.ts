import { DestinationCountry } from "@/types";

export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
  rateToUsd: number; // How many local currency units per 1 USD
}

export const destinationCurrencies: Record<DestinationCountry, CurrencyInfo> = {
  AE: { code: "AED", symbol: "د.إ", name: "UAE Dirham", rateToUsd: 3.67 },
  SA: { code: "SAR", symbol: "﷼", name: "Saudi Riyal", rateToUsd: 3.75 },
  KW: { code: "KWD", symbol: "د.ك", name: "Kuwaiti Dinar", rateToUsd: 0.31 },
  QA: { code: "QAR", symbol: "﷼", name: "Qatari Riyal", rateToUsd: 3.64 },
  BH: { code: "BHD", symbol: "BD", name: "Bahraini Dinar", rateToUsd: 0.376 },
  OM: { code: "OMR", symbol: "﷼", name: "Omani Rial", rateToUsd: 0.385 },
  IL: { code: "ILS", symbol: "₪", name: "Israeli Shekel", rateToUsd: 3.65 },
};

export function convertToLocal(usdAmount: number, country: DestinationCountry): {
  amount: number;
  formatted: string;
  currency: CurrencyInfo;
} {
  const currency = destinationCurrencies[country];
  const amount = Math.round(usdAmount * currency.rateToUsd);
  return {
    amount,
    formatted: `${currency.symbol}${amount.toLocaleString()}`,
    currency,
  };
}
