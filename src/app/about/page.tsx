import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Calculator,
  Search,
  ClipboardList,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how CrossBorder Navigator calculates your complete import cost breakdown — duties, shipping, insurance, modifications, and more.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold">How It Works</h1>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              CrossBorder Navigator removes the guesswork from international
              importing by calculating every cost before you commit.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="space-y-8">
              <StepCard
                number={1}
                icon={<Search className="h-6 w-6" />}
                title="Tell Us What You're Importing"
                description="Select your item type — vehicle, electronics, machinery, or other goods. For vehicles, specify the year, make, and model for the most accurate estimate."
              />
              <StepCard
                number={2}
                icon={<ClipboardList className="h-6 w-6" />}
                title="Specify Origin & Destination"
                description="Choose where the item is coming from (US state or Canadian province) and where it's going (any of the 6 GCC countries). We'll automatically determine the best shipping route and port."
              />
              <StepCard
                number={3}
                icon={<TrendingUp className="h-6 w-6" />}
                title="Get Your Complete Breakdown"
                description="Instantly see every cost component: shipping, insurance, customs duties, VAT, port handling fees, required modifications, and documentation charges."
              />
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold text-center mb-8">
              What&apos;s Included in Your Estimate
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Base item/vehicle price",
                "International ocean freight (RoRo or Container)",
                "Marine cargo insurance",
                "Customs duty (calculated on CIF)",
                "Value Added Tax (VAT)",
                "Port handling and clearance fees",
                "GCC-spec modification costs",
                "Documentation and processing fees",
                "Estimated transit time",
                "Country-specific compliance notes",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Supported Countries */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl font-bold mb-8">Supported Corridors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-3">Origins</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>United States (all 50 states)</li>
                  <li>Canada (all provinces & territories)</li>
                </ul>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-3">Destinations</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>United Arab Emirates</li>
                  <li>Saudi Arabia</li>
                  <li>Kuwait</li>
                  <li>Qatar</li>
                  <li>Bahrain</li>
                  <li>Oman</li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold">Ready to Find Out Your Cost?</h2>
            <p className="text-muted-foreground mt-2">
              It takes less than 2 minutes and requires no sign-up.
            </p>
            <Link href="/calculate" className="inline-block mt-6">
              <Button size="lg">
                <Calculator className="h-5 w-5 mr-2" />
                Launch Calculator
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            CrossBorder Navigator provides estimates for informational purposes
            only. Always consult a licensed customs broker for binding quotes.
          </p>
        </div>
      </footer>
    </div>
  );
}

function StepCard({
  number,
  icon,
  title,
  description,
}: {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="p-6 flex gap-4">
      <div className="shrink-0">
        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
          {number}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-primary">{icon}</span>
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
}
