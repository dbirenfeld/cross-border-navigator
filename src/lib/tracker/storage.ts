import { Shipment, ShipmentStage } from "./types";

const STORAGE_KEY = "cbn_shipments";

export function getShipments(): Shipment[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveShipments(shipments: Shipment[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(shipments));
}

export function addShipment(shipment: Omit<Shipment, "id" | "createdAt" | "updatedAt">): Shipment {
  const shipments = getShipments();
  const newShipment: Shipment = {
    ...shipment,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  shipments.push(newShipment);
  saveShipments(shipments);
  return newShipment;
}

export function updateShipmentStage(id: string, stage: ShipmentStage): Shipment | null {
  const shipments = getShipments();
  const index = shipments.findIndex((s) => s.id === id);
  if (index === -1) return null;
  shipments[index].stage = stage;
  shipments[index].updatedAt = new Date().toISOString();
  saveShipments(shipments);
  return shipments[index];
}

export function deleteShipment(id: string) {
  const shipments = getShipments().filter((s) => s.id !== id);
  saveShipments(shipments);
}
