# CrossBorder Navigator - Import Cost Calculator

A "TurboTax for International Importing" — calculate the true landed cost of importing vehicles and goods from North America to the Middle East.

## Features

- **Landed Cost Calculator**: Complete cost breakdown including base price, shipping, insurance, customs duties, VAT, port handling, required modifications, and documentation fees
- **Multi-step wizard UI**: Intuitive form flow guiding users through item details, origin, and destination
- **6 GCC destinations**: UAE, Saudi Arabia, Kuwait, Qatar, Bahrain, Oman
- **2 origin countries**: United States (all 50 states) and Canada (all provinces)
- **Shipping method comparison**: RoRo vs Container shipping with transit time estimates
- **Modification awareness**: Automatically includes GCC-spec modification costs (radar, navigation, climate, etc.)

## Tech Stack

- **Next.js 16** (App Router) with TypeScript
- **Tailwind CSS** + shadcn/ui components
- **Zod** for API input validation
- **React Hook Form** for form state management

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Landing page
│   ├── calculate/          # Calculator wizard
│   ├── about/              # How it works page
│   └── api/calculate/      # Cost calculation API endpoint
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── calculator/         # Calculator step components
│   ├── CostBreakdown.tsx   # Results display
│   └── Header.tsx          # Navigation header
├── lib/
│   ├── calculator/         # Calculation engine
│   │   ├── engine.ts       # Core orchestration
│   │   ├── duties.ts       # Duty & tax calculations
│   │   ├── shipping.ts     # Shipping cost estimation
│   │   └── modifications.ts # GCC modification requirements
│   ├── data/               # Reference data
│   │   ├── countries.ts    # Countries, ports, regions
│   │   ├── rates.ts        # Duty rates & shipping routes
│   │   └── vehicles.ts     # Vehicle makes & models
│   └── utils.ts            # Utilities (formatting, cn)
└── types/
    └── index.ts            # TypeScript interfaces
```

## Supported Import Corridors

| Origin | Destination | Customs Duty | VAT |
|--------|-------------|-------------|-----|
| US/Canada | UAE | 5% CIF | 5% |
| US/Canada | Saudi Arabia | 5% CIF | 15% |
| US/Canada | Kuwait | 5% CIF | 0% |
| US/Canada | Qatar | 5% CIF | 0% |
| US/Canada | Bahrain | 5% CIF | 10% |
| US/Canada | Oman | 5% CIF | 5% |

## Disclaimer

All estimates are for informational purposes only. Actual costs may vary based on current exchange rates, regulatory changes, and specific item characteristics. Consult a licensed customs broker for binding quotes.

## License

Private - All rights reserved.
