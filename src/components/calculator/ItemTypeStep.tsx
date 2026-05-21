"use client";

import { ItemType } from "@/types";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Car, Cpu, Cog, Package } from "lucide-react";

interface ItemTypeStepProps {
  value: ItemType | null;
  onChange: (type: ItemType) => void;
}

const itemTypes: { type: ItemType; label: string; description: string; icon: typeof Car }[] = [
  {
    type: "vehicle",
    label: "Vehicle",
    description: "Cars, trucks, motorcycles, boats",
    icon: Car,
  },
  {
    type: "electronics",
    label: "Electronics",
    description: "Computers, audio equipment, displays",
    icon: Cpu,
  },
  {
    type: "machinery",
    label: "Machinery",
    description: "Industrial equipment, tools, generators",
    icon: Cog,
  },
  {
    type: "other",
    label: "Other",
    description: "Furniture, art, collectibles, etc.",
    icon: Package,
  },
];

export function ItemTypeStep({ value, onChange }: ItemTypeStepProps) {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">What are you importing?</h2>
        <p className="text-muted-foreground mt-1">
          Select the type of item you want to bring across borders
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {itemTypes.map(({ type, label, description, icon: Icon }) => (
          <Card
            key={type}
            className={cn(
              "p-6 cursor-pointer transition-all hover:shadow-md",
              value === type
                ? "ring-2 ring-primary bg-primary/5"
                : "hover:border-primary/50"
            )}
            onClick={() => onChange(type)}
          >
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "p-3 rounded-lg",
                  value === type ? "bg-primary text-primary-foreground" : "bg-muted"
                )}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">{label}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
