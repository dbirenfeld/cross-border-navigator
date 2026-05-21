import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CrossBorder Navigator - Import Cost Calculator",
    template: "%s | CrossBorder Navigator",
  },
  description:
    "Calculate the true landed cost of importing vehicles and goods from North America to the Middle East. Instant duty, shipping, and modification estimates.",
  keywords: [
    "import cost calculator",
    "customs duty calculator",
    "car import middle east",
    "shipping cost USA to Dubai",
    "landed cost calculator",
    "GCC import duties",
    "import car to UAE",
    "import vehicle to Saudi Arabia",
    "customs declaration generator",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "CrossBorder Navigator",
    title: "CrossBorder Navigator - Know Your True Import Cost",
    description:
      "The TurboTax for international importing. Calculate duties, shipping, and modification costs for importing from North America to the Gulf region.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CrossBorder Navigator - Import Cost Calculator",
    description:
      "Calculate the true landed cost of importing vehicles from USA/Canada to the Middle East in under 2 minutes.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <AnalyticsProvider>{children}</AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
