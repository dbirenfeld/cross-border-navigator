"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plus, X } from "lucide-react";

interface AddShipmentModalProps {
  onAdd: (data: { description: string; origin: string; destination: string }) => void;
  onClose: () => void;
}

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
            <Input
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="e.g. Los Angeles, CA, USA"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Destination</Label>
            <Input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Tel Aviv, Israel"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Shipment
          </Button>
        </form>
      </Card>
    </div>
  );
}
