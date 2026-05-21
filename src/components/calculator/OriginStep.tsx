"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { originCountries } from "@/lib/data/countries";
import { OriginCountry, ShippingMethod } from "@/types";
import { cn } from "@/lib/utils";
import { Ship, Container } from "lucide-react";

interface OriginStepProps {
  originCountry: OriginCountry | "";
  originRegion: string;
  shippingMethod: ShippingMethod;
  onChange: (field: string, value: string) => void;
}

export function OriginStep({
  originCountry,
  originRegion,
  shippingMethod,
  onChange,
}: OriginStepProps) {
  const regions = originCountry ? originCountries[originCountry].regions : [];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Where is it shipping from?</h2>
        <p className="text-muted-foreground mt-1">
          Select the origin country and state/province
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        <div className="space-y-2">
          <Label>Origin Country</Label>
          <Select
            value={originCountry || undefined}
            onValueChange={(v) => {
              if (v) {
                onChange("originCountry", v);
                onChange("originRegion", "");
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="US">United States</SelectItem>
              <SelectItem value="CA">Canada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>State / Province</Label>
          <Select
            value={originRegion || undefined}
            onValueChange={(v) => { if (v) onChange("originRegion", v); }}
            disabled={!originCountry}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select state/province" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 pt-4">
          <Label>Shipping Method</Label>
          <div className="grid grid-cols-2 gap-3">
            <Card
              className={cn(
                "p-4 cursor-pointer transition-all text-center",
                shippingMethod === "roro"
                  ? "ring-2 ring-primary bg-primary/5"
                  : "hover:border-primary/50"
              )}
              onClick={() => onChange("shippingMethod", "roro")}
            >
              <Ship className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="font-medium text-sm">RoRo</p>
              <p className="text-xs text-muted-foreground">Roll-on/Roll-off</p>
              <p className="text-xs text-muted-foreground mt-1">More affordable</p>
            </Card>
            <Card
              className={cn(
                "p-4 cursor-pointer transition-all text-center",
                shippingMethod === "container"
                  ? "ring-2 ring-primary bg-primary/5"
                  : "hover:border-primary/50"
              )}
              onClick={() => onChange("shippingMethod", "container")}
            >
              <Container className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="font-medium text-sm">Container</p>
              <p className="text-xs text-muted-foreground">Enclosed 20/40ft</p>
              <p className="text-xs text-muted-foreground mt-1">More protection</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
