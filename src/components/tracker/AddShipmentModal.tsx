"use client";

import { useState } from "react";
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
import { originCountries, destinationCountries } from "@/lib/data/countries";
import { OriginCountry, DestinationCountry } from "@/types";
import { Plus, X } from "lucide-react";

interface AddShipmentModalProps {
  onAdd: (data: { description: string; origin: string; destination: string }) => void;
  onClose: () => void;
}

const originOptions = (Object.entries(originCountries) as [OriginCountry, { name: string }][]).map(
  ([, { name }]) => name
);

const destinationOptions = (Object.entries(destinationCountries) as [DestinationCountry, { name: string }][]).map(
  ([, { name }]) => name
);

export function AddShipmentModal({ onAdd, onClose }: AddShipmentModalProps) {
  const [description, setDescription] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !origin || !destination) return;
    onAdd({ description, origin, destination });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4">
      <Card className="p-6 w-full sm:max-w-md rounded-t-xl sm:rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Add Shipment</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Description</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. 2024 Ford Mustang GT"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Origin</Label>
            <Select
              value={origin || undefined}
              onValueChange={(v) => { if (v) setOrigin(v); }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select origin country" />
              </SelectTrigger>
              <SelectContent>
                {originOptions.map((name) => (
                  <SelectItem key={name} value={name}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Destination</Label>
            <Select
              value={destination || undefined}
              onValueChange={(v) => { if (v) setDestination(v); }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select destination country" />
              </SelectTrigger>
              <SelectContent>
                {destinationOptions.map((name) => (
                  <SelectItem key={name} value={name}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full" disabled={!description || !origin || !destination}>
            <Plus className="h-4 w-4 mr-2" />
            Add Shipment
          </Button>
        </form>
      </Card>
    </div>
  );
}
