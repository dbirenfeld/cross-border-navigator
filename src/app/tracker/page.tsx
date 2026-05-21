"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { PipelineBoard } from "@/components/tracker/PipelineBoard";
import { AddShipmentModal } from "@/components/tracker/AddShipmentModal";
import { Shipment, STAGES } from "@/lib/tracker/types";
import { getShipments, addShipment, updateShipmentStage, deleteShipment } from "@/lib/tracker/storage";
import { Plus, Ship } from "lucide-react";

export default function TrackerPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShipments(getShipments());
  }, []);

  const handleAdd = (data: { description: string; origin: string; destination: string }) => {
    const newShipment = addShipment({ ...data, stage: "purchased" });
    setShipments((prev) => [...prev, newShipment]);
    setShowModal(false);
  };

  const handleAdvance = (id: string) => {
    const shipment = shipments.find((s) => s.id === id);
    if (!shipment) return;
    const currentIdx = STAGES.findIndex((s) => s.id === shipment.stage);
    if (currentIdx >= STAGES.length - 1) return;
    const nextStage = STAGES[currentIdx + 1].id;
    updateShipmentStage(id, nextStage);
    setShipments(getShipments());
  };

  const handleDelete = (id: string) => {
    deleteShipment(id);
    setShipments(getShipments());
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
              <Ship className="h-4 w-4" />
              Transit Tracker
            </div>
            <h1 className="text-3xl font-bold">Shipment Pipeline</h1>
            <p className="text-muted-foreground mt-1">
              Track your imports from purchase to delivery
            </p>
          </div>
          <Button onClick={() => setShowModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Shipment
          </Button>
        </div>

        {shipments.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <Ship className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-lg font-semibold">No shipments yet</h2>
            <p className="text-muted-foreground mt-1 mb-4">
              Add your first import shipment to start tracking its progress
            </p>
            <Button onClick={() => setShowModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Shipment
            </Button>
          </div>
        ) : (
          <PipelineBoard
            shipments={shipments}
            onAdvance={handleAdvance}
            onDelete={handleDelete}
          />
        )}

        {showModal && (
          <AddShipmentModal
            onAdd={handleAdd}
            onClose={() => setShowModal(false)}
          />
        )}
      </main>
    </div>
  );
}
