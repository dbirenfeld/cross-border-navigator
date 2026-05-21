"use client";

import { Shipment, STAGES, ShipmentStage } from "@/lib/tracker/types";
import { ShipmentCard } from "./ShipmentCard";
import { Badge } from "@/components/ui/badge";

interface PipelineBoardProps {
  shipments: Shipment[];
  onAdvance: (id: string) => void;
  onDelete: (id: string) => void;
}

export function PipelineBoard({ shipments, onAdvance, onDelete }: PipelineBoardProps) {
  return (
    <div className="space-y-6">
      {STAGES.map((stage) => {
        const stageShipments = shipments.filter((s) => s.stage === stage.id);
        return (
          <div key={stage.id} className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-sm">{stage.label}</h3>
              <Badge variant="secondary" className="text-xs">
                {stageShipments.length}
              </Badge>
              <span className="text-xs text-muted-foreground ml-auto hidden sm:inline">
                {stage.description}
              </span>
            </div>
            <div className="min-h-[60px] rounded-lg border border-dashed p-2 space-y-2">
              {stageShipments.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-4">
                  No shipments in this stage
                </p>
              ) : (
                stageShipments.map((shipment) => (
                  <ShipmentCard
                    key={shipment.id}
                    shipment={shipment}
                    onAdvance={onAdvance}
                    onDelete={onDelete}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
