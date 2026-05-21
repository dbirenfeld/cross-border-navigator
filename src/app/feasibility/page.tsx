"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VinInput } from "@/components/feasibility/VinInput";
import { VehicleSpecCard } from "@/components/feasibility/VehicleSpecCard";
import { ComplianceReport } from "@/components/feasibility/ComplianceReport";
import { VinDecodedResult, checkImportLegality } from "@/lib/feasibility/vin-decoder";
import { runComplianceScan, ComplianceItem } from "@/lib/feasibility/compliance";
import { destinationCountries } from "@/lib/data/countries";
import { DestinationCountry } from "@/types";
import { ScanLine, ShieldCheck } from "lucide-react";

export default function FeasibilityPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [vehicle, setVehicle] = useState<VinDecodedResult | null>(null);
  const [destination, setDestination] = useState<DestinationCountry | "">("");
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>([]);
  const [legality, setLegality] = useState<{ allowed: boolean; warnings: string[]; notes: string } | null>(null);
  const [error, setError] = useState("");

  const handleDecode = async (vin: string) => {
    setIsLoading(true);
    setError("");
    setVehicle(null);
    setComplianceItems([]);
    setLegality(null);

    try {
      const response = await fetch(`/api/vin?vin=${vin}`);
      if (!response.ok) throw new Error("Failed to decode VIN");
      const data: VinDecodedResult = await response.json();

      if (data.errorCode) {
        setError(data.errorCode);
        return;
      }

      setVehicle(data);

      if (destination) {
        runChecks(data, destination);
      }
    } catch {
      setError("Failed to decode VIN. Please check the number and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const runChecks = (v: VinDecodedResult, dest: DestinationCountry) => {
    const items = runComplianceScan(v, dest);
    setComplianceItems(items);
    const legalResult = checkImportLegality(v.year, dest);
    setLegality(legalResult);
  };

  const handleDestinationChange = (value: string) => {
    const dest = value as DestinationCountry;
    setDestination(dest);
    if (vehicle) {
      runChecks(vehicle, dest);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <ScanLine className="h-4 w-4" />
            Feasibility Analysis
          </div>
          <h1 className="text-3xl font-bold">Can You Import This Vehicle?</h1>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Decode any VIN to instantly check specifications, compliance requirements,
            and import legality for your destination country.
          </p>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <VinInput onDecode={handleDecode} isLoading={isLoading} />
          </Card>

          {error && (
            <Card className="p-4 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30">
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            </Card>
          )}

          {vehicle && (
            <>
              <VehicleSpecCard vehicle={vehicle} />

              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold text-lg">Compliance & Legality Check</h2>
                </div>
                <div className="space-y-2">
                  <Label>Destination Country</Label>
                  <Select
                    value={destination || undefined}
                    onValueChange={(v) => { if (v) handleDestinationChange(v); }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination country" />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.entries(destinationCountries) as [DestinationCountry, { name: string }][]).map(
                        ([code, { name }]) => (
                          <SelectItem key={code} value={code}>{name}</SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </Card>

              {legality && complianceItems.length > 0 && (
                <ComplianceReport items={complianceItems} legalityResult={legality} />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
