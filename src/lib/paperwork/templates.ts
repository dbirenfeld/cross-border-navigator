import { DestinationCountry } from "@/types";

export interface FormTemplate {
  id: string;
  name: string;
  country: DestinationCountry;
  description: string;
  requiredFields: string[];
}

export const declarationTemplates: FormTemplate[] = [
  {
    id: "uae-customs-declaration",
    name: "UAE Customs Declaration Form",
    country: "AE",
    description: "Standard customs declaration for importing goods into the United Arab Emirates via Dubai Customs / Federal Customs Authority.",
    requiredFields: [
      "importerName", "importerAddress", "importerPhone", "importerId",
      "itemDescription", "hsCode", "quantity", "totalValue", "currency",
      "countryOfOrigin", "shippingMethod", "portOfDestination",
    ],
  },
  {
    id: "sa-customs-declaration",
    name: "Saudi Customs Declaration Form",
    country: "SA",
    description: "Saudi Zakat, Tax and Customs Authority (ZATCA) import declaration form. Requires SASO conformity certificate for vehicles.",
    requiredFields: [
      "importerName", "importerAddress", "importerPhone", "importerId",
      "itemDescription", "hsCode", "quantity", "totalValue", "currency",
      "countryOfOrigin", "shippingMethod", "portOfDestination", "manufacturer",
    ],
  },
  {
    id: "kw-customs-declaration",
    name: "Kuwait Customs Declaration Form",
    country: "KW",
    description: "Kuwait General Administration of Customs import declaration.",
    requiredFields: [
      "importerName", "importerAddress", "importerPhone", "importerId",
      "itemDescription", "hsCode", "quantity", "totalValue", "currency",
      "countryOfOrigin", "shippingMethod", "portOfDestination",
    ],
  },
  {
    id: "qa-customs-declaration",
    name: "Qatar Customs Declaration Form",
    country: "QA",
    description: "Qatar General Authority of Customs import declaration.",
    requiredFields: [
      "importerName", "importerAddress", "importerPhone", "importerId",
      "itemDescription", "hsCode", "quantity", "totalValue", "currency",
      "countryOfOrigin", "shippingMethod", "portOfDestination",
    ],
  },
  {
    id: "bh-customs-declaration",
    name: "Bahrain Customs Declaration Form",
    country: "BH",
    description: "Bahrain Customs Affairs import declaration form.",
    requiredFields: [
      "importerName", "importerAddress", "importerPhone", "importerId",
      "itemDescription", "hsCode", "quantity", "totalValue", "currency",
      "countryOfOrigin", "shippingMethod", "portOfDestination",
    ],
  },
  {
    id: "om-customs-declaration",
    name: "Oman Customs Declaration Form",
    country: "OM",
    description: "Royal Oman Police / Oman Customs import declaration form.",
    requiredFields: [
      "importerName", "importerAddress", "importerPhone", "importerId",
      "itemDescription", "hsCode", "quantity", "totalValue", "currency",
      "countryOfOrigin", "shippingMethod", "portOfDestination",
    ],
  },
  {
    id: "il-customs-declaration",
    name: "Israel Customs Declaration Form",
    country: "IL",
    description: "Israel Tax Authority (Rashut HaMisim) customs import declaration. Requires Teudat Zehut or passport, and vehicle must pass MOT inspection.",
    requiredFields: [
      "importerName", "importerAddress", "importerPhone", "importerId",
      "itemDescription", "hsCode", "quantity", "totalValue", "currency",
      "countryOfOrigin", "shippingMethod", "portOfDestination", "manufacturer",
    ],
  },
];

export function getTemplateForCountry(country: DestinationCountry): FormTemplate {
  return declarationTemplates.find((t) => t.country === country) ?? declarationTemplates[0];
}
