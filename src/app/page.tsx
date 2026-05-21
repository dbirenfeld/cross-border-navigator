import Link from "next/link";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Calculator,
  Globe,
  ShieldCheck,
  Zap,
  ArrowRight,
  Ship,
  FileText,
  Wrench,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="container mx-auto px-4 py-20 sm:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Globe className="h-4 w-4" />
              North America to Middle East
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Know Your True
              <span className="text-primary block mt-2">Import Cost</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto">
              Stop guessing. Get an instant, detailed breakdown of every cost
              involved in importing vehicles and goods from North America to the
              Gulf region.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Link href="/calculate">
                <Button size="lg" className="text-base px-8 h-12">
                  <Calculator className="h-5 w-5 mr-2" />
                  Calculate Your Cost
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="text-base px-8 h-12">
                  How It Works
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Everything Calculated for You</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Our calculator factors in every cost component so there are no
              surprises when your shipment arrives.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <FeatureCard
              icon={<Ship className="h-6 w-6" />}
              title="Shipping & Insurance"
              description="Accurate estimates for RoRo and container shipping from major US and Canadian ports to Gulf destinations."
            />
            <FeatureCard
              icon={<FileText className="h-6 w-6" />}
              title="Duties & Taxes"
              description="Precise customs duty and VAT calculations based on CIF values for all GCC countries."
            />
            <FeatureCard
              icon={<Wrench className="h-6 w-6" />}
              title="Modification Costs"
              description="Required GCC-spec modifications like radar recalibration, navigation updates, and climate servicing."
            />
          </div>
        </div>
      </section>

      {/* Platform Modules */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">One Platform, Every Step</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              From feasibility check to post-arrival compliance — we cover the entire import journey.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <ModuleCard href="/feasibility" title="Feasibility" description="VIN decode, compliance scan, legality check" />
            <ModuleCard href="/calculate" title="Cost Calculator" description="Duties, shipping, taxes, hidden fees" />
            <ModuleCard href="/paperwork" title="Paperwork" description="Declaration generator, document vault" />
            <ModuleCard href="/tracker" title="Transit Tracker" description="Pipeline board from purchase to delivery" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">7</div>
                <p className="text-muted-foreground mt-1 text-sm">Countries</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">30+</div>
                <p className="text-muted-foreground mt-1 text-sm">Shipping Routes</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">40+</div>
                <p className="text-muted-foreground mt-1 text-sm">Car Brands</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">Free</div>
                <p className="text-muted-foreground mt-1 text-sm">No Sign-up</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Ready to Import?</h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Get your complete cost breakdown in under 2 minutes. No sign-up required.
          </p>
          <Link href="/calculate" className="inline-block mt-8">
            <Button size="lg" className="text-base px-8 h-12">
              <Calculator className="h-5 w-5 mr-2" />
              Start Calculating
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Ship className="h-5 w-5 text-muted-foreground" />
              <span className="font-semibold">CrossBorder Navigator</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Estimates are for informational purposes only. Consult a licensed
              broker for binding quotes.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="p-6 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground mt-2">{description}</p>
    </Card>
  );
}

function ModuleCard({ href, title, description }: { href: string; title: string; description: string }) {
  return (
    <Link href={href}>
      <Card className="p-5 h-full hover:shadow-md hover:border-primary/50 transition-all cursor-pointer">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </Card>
    </Link>
  );
}
