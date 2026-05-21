"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VinDecodedResult } from "@/lib/feasibility/vin-decoder";
import { Car, Fuel, Gauge, MapPin, Calendar, Cog } from "lucide-react";

interface VehicleSpecCardProps {
  vehicle: VinDecodedResult;
}

export function VehicleSpecCard({ vehicle }: VehicleSpecCardProps) {
  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          {vehicle.trim && (
            <p className="text-muted-foreground">{vehicle.trim}</p>
          )}
        </div>
        <Badge variant="secondary" className="font-mono text-xs self-start">
          {vehicle.vin}
        </Badge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {vehicle.bodyClass && <SpecItem icon={<Car className="h-4 w-4" />} label="Body" value={vehicle.bodyClass} />}
        {vehicle.driveType && <SpecItem icon={<Cog className="h-4 w-4" />} label="Drive" value={vehicle.driveType} />}
        {vehicle.fuelType && <SpecItem icon={<Fuel className="h-4 w-4" />} label="Fuel" value={vehicle.fuelType} />}
        {(vehicle.engineDisplacement || vehicle.engineCylinders) && (
          <SpecItem
            icon={<Gauge className="h-4 w-4" />}
            label="Engine"
            value={
              vehicle.engineDisplacement
                ? `${vehicle.engineDisplacement}L ${vehicle.engineCylinders ? vehicle.engineCylinders + "-cyl" : ""}`
                : `${vehicle.engineCylinders}-cyl`
            }
          />
        )}
        {vehicle.plantCountry && <SpecItem icon={<MapPin className="h-4 w-4" />} label="Origin" value={vehicle.plantCountry} />}
        {vehicle.year && <SpecItem icon={<Calendar className="h-4 w-4" />} label="Year" value={vehicle.year.toString()} />}
      </div>

      {vehicle.horsepower && (
        <p className="text-sm text-muted-foreground mt-4">
          Power: {vehicle.horsepower} hp | Transmission: {vehicle.transmissionType || "N/A"}
        </p>
      )}

      {vehicle.raw?.["Manufacturer"] && (
        <p className="text-sm text-muted-foreground mt-2">
          Manufacturer: {vehicle.raw["Manufacturer"]}
        </p>
      )}
    </Card>
  );
}

function SpecItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-muted-foreground mt-0.5">{icon}</span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value || "N/A"}</p>
      </div>
    </div>
  );
}
