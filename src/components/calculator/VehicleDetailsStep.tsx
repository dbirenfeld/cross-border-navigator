"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { vehicleMakes, vehicleYears } from "@/lib/data/vehicles";
import { ItemType } from "@/types";

interface VehicleDetailsStepProps {
  itemType: ItemType;
  itemValue: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleTrim: string;
  onChange: (field: string, value: string) => void;
}

export function VehicleDetailsStep({
  itemType,
  itemValue,
  vehicleYear,
  vehicleMake,
  vehicleModel,
  vehicleTrim,
  onChange,
}: VehicleDetailsStepProps) {
  const selectedMake = vehicleMakes.find((m) => m.id === vehicleMake);
  const models = selectedMake?.models ?? [];

  const isVehicle = itemType === "vehicle";

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">
          {isVehicle ? "Vehicle Details" : "Item Details"}
        </h2>
        <p className="text-muted-foreground mt-1">
          {isVehicle
            ? "Tell us about the vehicle you want to import"
            : "Provide the estimated value of your item"}
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        <div className="space-y-2">
          <Label htmlFor="itemValue">Estimated Value (USD)</Label>
          <Input
            id="itemValue"
            type="number"
            placeholder="e.g. 45000"
            value={itemValue}
            onChange={(e) => onChange("itemValue", e.target.value)}
            min={100}
          />
        </div>

        {isVehicle && (
          <>
            <div className="space-y-2">
              <Label htmlFor="vehicleYear">Year</Label>
              <Select
                value={vehicleYear || undefined}
                onValueChange={(v) => { if (v) onChange("vehicleYear", v); }}
              >
                <SelectTrigger id="vehicleYear">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {vehicleYears.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleMake">Make</Label>
              <Select
                value={vehicleMake || undefined}
                onValueChange={(v) => {
                  if (v) {
                    onChange("vehicleMake", v);
                    onChange("vehicleModel", "");
                  }
                }}
              >
                <SelectTrigger id="vehicleMake">
                  <SelectValue placeholder="Select make" />
                </SelectTrigger>
                <SelectContent>
                  {vehicleMakes.map((make) => (
                    <SelectItem key={make.id} value={make.id}>
                      {make.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleModel">Model</Label>
              <Select
                value={vehicleModel || undefined}
                onValueChange={(v) => { if (v) onChange("vehicleModel", v); }}
                disabled={!vehicleMake}
              >
                <SelectTrigger id="vehicleModel">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {models.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleTrim">Trim (Optional)</Label>
              <Input
                id="vehicleTrim"
                placeholder="e.g. Sport, Limited, GT"
                value={vehicleTrim}
                onChange={(e) => onChange("vehicleTrim", e.target.value)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
