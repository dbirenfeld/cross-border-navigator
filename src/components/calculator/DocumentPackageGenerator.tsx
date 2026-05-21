"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalculationResult } from "@/types";
import { DeclarationPdf } from "@/lib/paperwork/generate-pdf";
import { CommercialInvoicePdf } from "@/lib/paperwork/commercial-invoice";
import { originCountries, destinationCountries } from "@/lib/data/countries";
import { FileText, Download, Loader2, X, Package } from "lucide-react";

interface DocumentPackageGeneratorProps {
  result: CalculationResult;
  onClose: () => void;
}

export function DocumentPackageGenerator({ result, onClose }: DocumentPackageGeneratorProps) {
  const [generating, setGenerating] = useState("");
  const [form, setForm] = useState({
    importerName: "",
    importerAddress: "",
    importerPhone: "",
    importerEmail: "",
    importerId: "",
  });

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isValid = form.importerName && form.importerId;

  const originName = originCountries[result.input.originCountry]?.name ?? "";
  const destName = destinationCountries[result.input.destinationCountry]?.name ?? "";

  const getDeclarationData = () => ({
    ...form,
    itemDescription: result.input.itemType === "vehicle"
      ? `${result.input.vehicleYear ?? ""} ${result.input.vehicleMake ?? ""} ${result.input.vehicleModel ?? ""} ${result.input.vehicleTrim ?? ""}`.trim()
      : `${result.input.itemType} - imported goods`,
    itemType: result.input.itemType.charAt(0).toUpperCase() + result.input.itemType.slice(1),
    hsCode: result.input.itemType === "vehicle" ? "8703.24" : "8479.89",
    quantity: 1,
    unitValue: result.input.itemValue,
    totalValue: result.input.itemValue,
    currency: "USD",
    countryOfOrigin: originName,
    manufacturer: result.input.vehicleMake ?? "",
    vehicleVin: "",
    vehicleYear: result.input.vehicleYear,
    vehicleMake: result.input.vehicleMake,
    vehicleModel: result.input.vehicleModel,
    vehicleColor: "",
    vehicleEngine: "",
    vehicleMileage: undefined,
    shippingMethod: result.input.shippingMethod === "roro" ? "Roll-on/Roll-off (RoRo)" : "Container (20ft/40ft)",
    vesselName: "",
    billOfLading: "",
    portOfOrigin: `${result.input.originRegion}, ${originName}`,
    portOfDestination: `${result.input.destinationCity}, ${destName}`,
    estimatedArrival: "",
    destinationCountry: destName,
    declarationDate: new Date().toISOString().split("T")[0],
  });

  const downloadDeclaration = async () => {
    setGenerating("declaration");
    try {
      const data = getDeclarationData();
      const blob = await pdf(
        <DeclarationPdf data={data} destinationCountryCode={result.input.destinationCountry} />
      ).toBlob();
      downloadBlob(blob, `customs-declaration-${result.input.destinationCountry}.pdf`);
    } finally {
      setGenerating("");
    }
  };

  const downloadInvoice = async () => {
    setGenerating("invoice");
    try {
      const blob = await pdf(
        <CommercialInvoicePdf result={result} importerName={form.importerName} importerAddress={form.importerAddress} />
      ).toBlob();
      downloadBlob(blob, `commercial-invoice-${result.input.destinationCountry}.pdf`);
    } finally {
      setGenerating("");
    }
  };

  const downloadAll = async () => {
    await downloadDeclaration();
    await downloadInvoice();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4 overflow-y-auto">
      <Card className="p-6 w-full sm:max-w-lg rounded-t-xl sm:rounded-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Generate Document Package</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Enter your personal details below. The system will auto-fill everything
          else from your calculation (item, value, origin, destination, shipping method).
        </p>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Full Name *</Label>
              <Input
                value={form.importerName}
                onChange={(e) => update("importerName", e.target.value)}
                placeholder="John Smith"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">ID / Passport *</Label>
              <Input
                value={form.importerId}
                onChange={(e) => update("importerId", e.target.value)}
                placeholder="Passport number"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Address</Label>
            <Input
              value={form.importerAddress}
              onChange={(e) => update("importerAddress", e.target.value)}
              placeholder="Full mailing address"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Phone</Label>
              <Input
                value={form.importerPhone}
                onChange={(e) => update("importerPhone", e.target.value)}
                placeholder="+1 555 123 4567"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Email</Label>
              <Input
                value={form.importerEmail}
                onChange={(e) => update("importerEmail", e.target.value)}
                placeholder="you@example.com"
              />
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Documents Included
          </p>
          <div className="grid grid-cols-1 gap-2">
            <DocItem
              title="Customs Declaration"
              description={`Pre-filled ${destName} import declaration form`}
              onClick={downloadDeclaration}
              loading={generating === "declaration"}
              disabled={!isValid}
            />
            <DocItem
              title="Commercial Invoice"
              description="Seller-to-buyer invoice with complete transaction details"
              onClick={downloadInvoice}
              loading={generating === "invoice"}
              disabled={!isValid}
            />
          </div>
        </div>

        <Separator className="my-4" />

        <Button
          onClick={downloadAll}
          disabled={!isValid || !!generating}
          className="w-full"
        >
          {generating ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Package className="h-4 w-4 mr-2" />
          )}
          Download Full Document Package
        </Button>

        {!isValid && (
          <p className="text-xs text-muted-foreground text-center mt-2">
            Fill in your name and ID to generate documents
          </p>
        )}
      </Card>
    </div>
  );
}

function DocItem({
  title,
  description,
  onClick,
  loading,
  disabled,
}: {
  title: string;
  description: string;
  onClick: () => void;
  loading: boolean;
  disabled: boolean;
}) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Button size="sm" variant="ghost" onClick={onClick} disabled={disabled || loading}>
        {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
      </Button>
    </div>
  );
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
