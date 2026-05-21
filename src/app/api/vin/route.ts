import { NextRequest, NextResponse } from "next/server";
import { VinDecodedResult } from "@/lib/feasibility/vin-decoder";

export async function GET(request: NextRequest) {
  const vin = request.nextUrl.searchParams.get("vin");

  if (!vin || !/^[A-Z0-9]{17}$/i.test(vin)) {
    return NextResponse.json({ error: "Invalid VIN" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`,
      { next: { revalidate: 86400 } }
    );

    if (!response.ok) {
      throw new Error(`NHTSA API returned ${response.status}`);
    }

    const data = await response.json();
    const results: Array<{ Variable: string; Value: string | null }> = data.Results ?? [];

    const get = (name: string): string => {
      const item = results.find((r) => r.Variable === name);
      return item?.Value?.trim() || "";
    };

    const decoded: VinDecodedResult = {
      vin: vin.toUpperCase(),
      year: parseInt(get("Model Year")) || null,
      make: get("Make"),
      model: get("Model"),
      trim: get("Trim"),
      bodyClass: get("Body Class"),
      driveType: get("Drive Type"),
      fuelType: get("Fuel Type - Primary"),
      engineCylinders: get("Engine Number of Cylinders"),
      engineDisplacement: get("Displacement (L)"),
      horsepower: get("Engine Brake (hp) From"),
      transmissionType: get("Transmission Style"),
      plantCountry: get("Plant Country"),
      plantCity: get("Plant City"),
      vehicleType: get("Vehicle Type"),
      gvwr: get("Gross Vehicle Weight Rating From"),
      doors: get("Doors"),
      errorCode: get("Error Code") === "0" ? null : get("Error Text"),
      raw: Object.fromEntries(
        results
          .filter((r) => r.Value && r.Value.trim())
          .map((r) => [r.Variable, r.Value!.trim()])
      ),
    };

    return NextResponse.json(decoded);
  } catch {
    return NextResponse.json(
      { error: "Failed to decode VIN. Please try again." },
      { status: 502 }
    );
  }
}
