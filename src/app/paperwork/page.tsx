"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { DeclarationData, commonHsCodes } from "@/lib/paperwork/types";
import { DeclarationPdf } from "@/lib/paperwork/generate-pdf";
import { destinationCountries } from "@/lib/data/countries";
import { DestinationCountry } from "@/types";
import { Download, FileText, Loader2 } from "lucide-react";

export default function PaperworkPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [destinationCountryCode, setDestinationCountryCode] = useState<DestinationCountry>("AE");

  const [form, setForm] = useState<DeclarationData>({
    importerName: "",
    importerAddress: "",
    importerPhone: "",
    importerEmail: "",
    importerId: "",
    itemDescription: "",
    itemType: "Vehicle",
    hsCode: "8703.24",
    quantity: 1,
    unitValue: 0,
    totalValue: 0,
    currency: "USD",
    countryOfOrigin: "United States",
    manufacturer: "",
    vehicleVin: "",
    vehicleYear: undefined,
    vehicleMake: "",
    vehicleModel: "",
    vehicleColor: "",
    vehicleEngine: "",
    vehicleMileage: undefined,
    shippingMethod: "Roll-on/Roll-off (RoRo)",
    vesselName: "",
    billOfLading: "",
    portOfOrigin: "",
    portOfDestination: "",
    estimatedArrival: "",
    destinationCountry: "United Arab Emirates",
    declarationDate: new Date().toISOString().split("T")[0],
  });

  const updateField = (field: keyof DeclarationData, value: string | number) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "unitValue") {
        updated.totalValue = (value as number) * prev.quantity;
      }
      if (field === "quantity") {
        updated.totalValue = prev.unitValue * (value as number);
      }
      return updated;
    });
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const blob = await pdf(
        <DeclarationPdf data={form} destinationCountryCode={destinationCountryCode} />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `customs-declaration-${destinationCountryCode}-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to generate declaration:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <FileText className="h-4 w-4" />
            Automated Paperwork
          </div>
          <h1 className="text-3xl font-bold">Customs Declaration Generator</h1>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Fill in your details below and generate a pre-filled customs declaration
            form ready for submission to your destination country&apos;s customs authority.
          </p>
        </div>

        <div className="space-y-6">
          {/* Destination Country */}
          <Card className="p-6">
            <h2 className="font-semibold text-lg mb-4">Destination Country</h2>
            <Select
              value={destinationCountryCode}
              onValueChange={(v) => {
                if (v) {
                  setDestinationCountryCode(v as DestinationCountry);
                  updateField("destinationCountry", destinationCountries[v as DestinationCountry].name);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.entries(destinationCountries) as [DestinationCountry, { name: string }][]).map(
                  ([code, { name }]) => (
                    <SelectItem key={code} value={code}>
                      {name}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </Card>

          {/* Importer Information */}
          <Card className="p-6">
            <h2 className="font-semibold text-lg mb-4">Importer Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  value={form.importerName}
                  onChange={(e) => updateField("importerName", e.target.value)}
                  placeholder="John Smith"
                />
              </div>
              <div className="space-y-2">
                <Label>ID / Passport Number</Label>
                <Input
                  value={form.importerId}
                  onChange={(e) => updateField("importerId", e.target.value)}
                  placeholder="Passport or national ID"
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={form.importerPhone}
                  onChange={(e) => updateField("importerPhone", e.target.value)}
                  placeholder="+1 555 123 4567"
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={form.importerEmail}
                  onChange={(e) => updateField("importerEmail", e.target.value)}
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Address</Label>
                <Input
                  value={form.importerAddress}
                  onChange={(e) => updateField("importerAddress", e.target.value)}
                  placeholder="Full mailing address"
                />
              </div>
            </div>
          </Card>

          {/* Item Details */}
          <Card className="p-6">
            <h2 className="font-semibold text-lg mb-4">Item Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2 sm:col-span-2">
                <Label>Description of Goods</Label>
                <Input
                  value={form.itemDescription}
                  onChange={(e) => updateField("itemDescription", e.target.value)}
                  placeholder="e.g. 2024 Ford Mustang GT, 5.0L V8, Red"
                />
              </div>
              <div className="space-y-2">
                <Label>HS Code</Label>
                <Select
                  value={form.hsCode}
                  onValueChange={(v) => { if (v) updateField("hsCode", v); }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {commonHsCodes.map((hs) => (
                      <SelectItem key={hs.code} value={hs.code}>
                        {hs.code} - {hs.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Country of Origin</Label>
                <Select
                  value={form.countryOfOrigin}
                  onValueChange={(v) => { if (v) updateField("countryOfOrigin", v); }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Unit Value (USD)</Label>
                <Input
                  type="number"
                  value={form.unitValue || ""}
                  onChange={(e) => updateField("unitValue", Number(e.target.value))}
                  placeholder="45000"
                />
              </div>
              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input
                  type="number"
                  value={form.quantity}
                  onChange={(e) => updateField("quantity", Number(e.target.value))}
                  min={1}
                />
              </div>
              <div className="space-y-2">
                <Label>Manufacturer</Label>
                <Input
                  value={form.manufacturer}
                  onChange={(e) => updateField("manufacturer", e.target.value)}
                  placeholder="e.g. Ford Motor Company"
                />
              </div>
              <div className="space-y-2">
                <Label>Total Value (USD)</Label>
                <Input
                  type="number"
                  value={form.totalValue || ""}
                  disabled
                />
              </div>
            </div>
          </Card>

          {/* Vehicle Details (optional) */}
          <Card className="p-6">
            <h2 className="font-semibold text-lg mb-1">Vehicle Details</h2>
            <p className="text-sm text-muted-foreground mb-4">Optional — fill if importing a vehicle</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2 sm:col-span-2">
                <Label>VIN (Vehicle Identification Number)</Label>
                <Input
                  value={form.vehicleVin}
                  onChange={(e) => updateField("vehicleVin", e.target.value)}
                  placeholder="17-character VIN"
                  maxLength={17}
                />
              </div>
              <div className="space-y-2">
                <Label>Year</Label>
                <Input
                  type="number"
                  value={form.vehicleYear || ""}
                  onChange={(e) => updateField("vehicleYear", Number(e.target.value))}
                  placeholder="2024"
                />
              </div>
              <div className="space-y-2">
                <Label>Make</Label>
                <Input
                  value={form.vehicleMake}
                  onChange={(e) => updateField("vehicleMake", e.target.value)}
                  placeholder="Ford"
                />
              </div>
              <div className="space-y-2">
                <Label>Model</Label>
                <Input
                  value={form.vehicleModel}
                  onChange={(e) => updateField("vehicleModel", e.target.value)}
                  placeholder="Mustang GT"
                />
              </div>
              <div className="space-y-2">
                <Label>Color</Label>
                <Input
                  value={form.vehicleColor}
                  onChange={(e) => updateField("vehicleColor", e.target.value)}
                  placeholder="Race Red"
                />
              </div>
              <div className="space-y-2">
                <Label>Engine</Label>
                <Input
                  value={form.vehicleEngine}
                  onChange={(e) => updateField("vehicleEngine", e.target.value)}
                  placeholder="5.0L V8"
                />
              </div>
              <div className="space-y-2">
                <Label>Mileage (km)</Label>
                <Input
                  type="number"
                  value={form.vehicleMileage || ""}
                  onChange={(e) => updateField("vehicleMileage", Number(e.target.value))}
                  placeholder="15000"
                />
              </div>
            </div>
          </Card>

          {/* Shipping Information */}
          <Card className="p-6">
            <h2 className="font-semibold text-lg mb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Shipping Method</Label>
                <Select
                  value={form.shippingMethod}
                  onValueChange={(v) => { if (v) updateField("shippingMethod", v); }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Roll-on/Roll-off (RoRo)">RoRo (Roll-on/Roll-off)</SelectItem>
                    <SelectItem value="Container (20ft/40ft)">Container (20ft/40ft)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Vessel / Flight Name</Label>
                <Input
                  value={form.vesselName}
                  onChange={(e) => updateField("vesselName", e.target.value)}
                  placeholder="Optional"
                />
              </div>
              <div className="space-y-2">
                <Label>Bill of Lading Number</Label>
                <Input
                  value={form.billOfLading}
                  onChange={(e) => updateField("billOfLading", e.target.value)}
                  placeholder="Optional"
                />
              </div>
              <div className="space-y-2">
                <Label>Estimated Arrival Date</Label>
                <Input
                  type="date"
                  value={form.estimatedArrival}
                  onChange={(e) => updateField("estimatedArrival", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Port of Loading</Label>
                <Input
                  value={form.portOfOrigin}
                  onChange={(e) => updateField("portOfOrigin", e.target.value)}
                  placeholder="e.g. Port Newark, NJ"
                />
              </div>
              <div className="space-y-2">
                <Label>Port of Discharge</Label>
                <Input
                  value={form.portOfDestination}
                  onChange={(e) => updateField("portOfDestination", e.target.value)}
                  placeholder="e.g. Jebel Ali, Dubai"
                />
              </div>
            </div>
          </Card>

          <Separator />

          {/* Generate Button */}
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={handleGenerate}
              disabled={isGenerating || !form.importerName || !form.itemDescription}
              className="px-8"
            >
              {isGenerating ? (
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <Download className="h-5 w-5 mr-2" />
              )}
              {isGenerating ? "Generating Declaration..." : "Generate Customs Declaration PDF"}
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            This generates a pre-filled customs declaration form. You must review, sign,
            and submit it along with required supporting documents to the relevant customs authority.
          </p>
        </div>
      </main>
    </div>
  );
}
