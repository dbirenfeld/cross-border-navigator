"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { destinationCountries } from "@/lib/data/countries";
import { dutyRates } from "@/lib/data/rates";
import { DestinationCountry } from "@/types";
import { Badge } from "@/components/ui/badge";

interface DestinationStepProps {
  destinationCountry: DestinationCountry | "";
  destinationCity: string;
  onChange: (field: string, value: string) => void;
}

export function DestinationStep({
  destinationCountry,
  destinationCity,
  onChange,
}: DestinationStepProps) {
  const cities = destinationCountry
    ? destinationCountries[destinationCountry].cities
    : [];
  const dutyInfo = destinationCountry ? dutyRates[destinationCountry] : null;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Where is it going?</h2>
        <p className="text-muted-foreground mt-1">
          Select the destination country and city
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        <div className="space-y-2">
          <Label>Destination Country</Label>
          <Select
            value={destinationCountry || undefined}
            onValueChange={(v) => {
              if (v) {
                onChange("destinationCountry", v);
                onChange("destinationCity", "");
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {(Object.entries(destinationCountries) as [DestinationCountry, { name: string; cities: string[] }][]).map(
                ([code, { name }]) => (
                  <SelectItem key={code} value={code}>
                    {name}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>City</Label>
          <Select
            value={destinationCity || undefined}
            onValueChange={(v) => { if (v) onChange("destinationCity", v); }}
            disabled={!destinationCountry}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {dutyInfo && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg space-y-2">
            <p className="text-sm font-medium">Import rates for this destination:</p>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary">
                Customs: {dutyInfo.customsDutyPercent}% CIF
              </Badge>
              {dutyInfo.purchaseTaxPercent && (
                <Badge variant="secondary">
                  Purchase Tax: {dutyInfo.purchaseTaxPercent}%
                </Badge>
              )}
              <Badge variant="secondary">
                VAT: {dutyInfo.vatPercent}%
              </Badge>
            </div>
            {dutyInfo.notes && (
              <p className="text-xs text-muted-foreground mt-2">{dutyInfo.notes}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
