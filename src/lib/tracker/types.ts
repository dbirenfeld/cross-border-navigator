export type ShipmentStage =
  | "purchased"
  | "export_clearance"
  | "in_transit"
  | "port_unloading"
  | "customs_inspection"
  | "delivered";

export const STAGES: { id: ShipmentStage; label: string; description: string }[] = [
  { id: "purchased", label: "Purchased", description: "Asset acquired, preparing for export" },
  { id: "export_clearance", label: "Export Clearance", description: "Awaiting origin country export approval" },
  { id: "in_transit", label: "In Transit", description: "On vessel, crossing international waters" },
  { id: "port_unloading", label: "Port Unloading", description: "Arrived at destination port" },
  { id: "customs_inspection", label: "Customs Inspection", description: "Under review by customs authority" },
  { id: "delivered", label: "Cleared & Delivered", description: "Released from customs, delivered" },
];

export interface Shipment {
  id: string;
  description: string;
  origin: string;
  destination: string;
  stage: ShipmentStage;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}
