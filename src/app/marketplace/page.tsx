"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { serviceProviders, partCategories } from "@/lib/marketplace/providers";
import { destinationCountries } from "@/lib/data/countries";
import { DestinationCountry } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Wrench, Store, Star, CheckCircle2, Package, MapPin } from "lucide-react";

export default function MarketplacePage() {
  const [selectedCountry, setSelectedCountry] = useState<DestinationCountry | "all">("all");

  const filteredProviders = selectedCountry === "all"
    ? serviceProviders
    : serviceProviders.filter((p) => p.country === selectedCountry);

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Store className="h-4 w-4" />
            Post-Arrival Marketplace
          </div>
          <h1 className="text-3xl font-bold">Localization Services</h1>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Find vetted technicians for compliance modifications and source
            the parts needed to make your import street-legal.
          </p>
        </div>

        {/* Technician Directory */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Technician Directory
            </h2>
            <Select
              value={selectedCountry}
              onValueChange={(v) => { if (v) setSelectedCountry(v as DestinationCountry | "all"); }}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {(Object.entries(destinationCountries) as [DestinationCountry, { name: string }][]).map(
                  ([code, { name }]) => (
                    <SelectItem key={code} value={code}>{name}</SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {filteredProviders.map((provider) => (
              <Card key={provider.id} className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{provider.name}</h3>
                      {provider.verified && (
                        <CheckCircle2 className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {provider.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                      <span className="text-sm font-medium">{provider.rating}</span>
                    </div>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {provider.category}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {provider.services.map((service) => (
                    <Badge key={service} variant="outline" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t">
                  <span className="text-sm text-muted-foreground">
                    Price range: {formatCurrency(provider.priceRange.min)} - {formatCurrency(provider.priceRange.max)}
                  </span>
                  <Button size="sm" variant="outline">Contact</Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Parts Sourcing */}
        <section>
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
            <Package className="h-5 w-5" />
            Compliance Parts Sourcing
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Source OEM and aftermarket parts needed for regional compliance modifications.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {partCategories.map((cat) => (
              <Card key={cat.id} className="p-5">
                <h3 className="font-semibold">{cat.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{cat.description}</p>
                <div className="mt-3 space-y-2">
                  {cat.items.map((item) => (
                    <div key={item.name} className="flex justify-between text-sm">
                      <span>{item.name}</span>
                      <span className="text-muted-foreground text-xs">{item.priceRange}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
