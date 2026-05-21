"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shipment, STAGES, ShipmentStage } from "@/lib/tracker/types";
import { ArrowRight, Trash2, MapPin } from "lucide-react";

interface ShipmentCardProps {
  shipment: Shipment;
  onAdvance: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ShipmentCard({ shipment, onAdvance, onDelete }: ShipmentCardProps) {
  const currentIdx = STAGES.findIndex((s) => s.id === shipment.stage);
  const canAdvance = currentIdx < STAGES.length - 1;
  const nextStage = canAdvance ? STAGES[currentIdx + 1] : null;

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium text-sm">{shipment.description}</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{shipment.origin} → {shipment.destination}</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(shipment.id)}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground shrink-0">
          {new Date(shipment.updatedAt).toLocaleDateString()}
        </p>
        {canAdvance && nextStage && (
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-7 shrink-0"
            onClick={() => onAdvance(shipment.id)}
          >
            <span className="hidden sm:inline">Move to </span>{nextStage.label}
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        )}
        {!canAdvance && (
          <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs">
            Complete
          </Badge>
        )}
      </div>
    </Card>
  );
}
