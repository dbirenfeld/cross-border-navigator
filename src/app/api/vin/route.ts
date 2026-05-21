import { NextRequest, NextResponse } from "next/server";
import { VinDecodedResult } from "@/lib/feasibility/vin-decoder";

async function decodeWithNhtsa(vin: string): Promise<VinDecodedResult | null> {
  const response = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`,
    { next: { revalidate: 86400 } }
  );

  if (!response.ok) return null;

  const data = await response.json();
  const results: Array<{ Variable: string; Value: string | null }> = data.Results ?? [];

  const get = (name: string): string => {
    const item = results.find((r) => r.Variable === name);
    return item?.Value?.trim() || "";
  };

  const errorCode = get("Error Code");
  const make = get("Make");

  // If NHTSA can't identify the manufacturer, return null to try fallback
  if (!make && errorCode.includes("7")) {
    return null;
  }

  return {
    vin: vin.toUpperCase(),
    year: parseInt(get("Model Year")) || null,
    make,
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
    errorCode: errorCode === "0" || errorCode === "1" ? null : errorCode,
    raw: Object.fromEntries(
      results
        .filter((r) => r.Value && r.Value.trim())
        .map((r) => [r.Variable, r.Value!.trim()])
    ),
  };
}

async function decodeWithAutodev(vin: string): Promise<VinDecodedResult | null> {
  const apiKey = process.env.AUTODEV_API_KEY;
  if (!apiKey) return null;

  try {
    const response = await fetch(
      `https://api.auto.dev/vin/${vin}`,
      {
        headers: { "x-api-key": apiKey },
        next: { revalidate: 86400 },
      }
    );

    if (!response.ok) return null;

    const data = await response.json();

    if (!data.make) return null;

    return {
      vin: vin.toUpperCase(),
      year: data.years?.[0] ?? (data.vehicle?.year || null),
      make: data.make ?? data.vehicle?.make ?? "",
      model: data.vehicle?.model ?? "",
      trim: "",
      bodyClass: data.type ?? "",
      driveType: "",
      fuelType: "",
      engineCylinders: "",
      engineDisplacement: "",
      horsepower: "",
      transmissionType: "",
      plantCountry: data.origin ?? "",
      plantCity: "",
      vehicleType: data.type ?? "",
      gvwr: "",
      doors: "",
      errorCode: null,
      raw: {
        "Manufacturer": data.vehicle?.manufacturer ?? "",
        "Origin": data.origin ?? "",
        "WMI": data.wmi ?? "",
        "Type": data.type ?? "",
        "Decoded Source": "auto.dev Global VIN Database",
      },
    };
  } catch {
    return null;
  }
}

async function decodeWithLocalParsing(vin: string): Promise<VinDecodedResult> {
  const { parseVinLocally } = await import("@/lib/feasibility/vin-decoder");
  const parsed = parseVinLocally(vin);

  return {
    vin: vin.toUpperCase(),
    year: parsed.year,
    make: "",
    model: "",
    trim: "",
    bodyClass: "",
    driveType: "",
    fuelType: "",
    engineCylinders: "",
    engineDisplacement: "",
    horsepower: "",
    transmissionType: "",
    plantCountry: parsed.country,
    plantCity: "",
    vehicleType: "",
    gvwr: "",
    doors: "",
    errorCode: "local_only",
    raw: { "Decoded Source": "Local VIN structure parsing (limited data)" },
  };
}

export async function GET(request: NextRequest) {
  const vin = request.nextUrl.searchParams.get("vin");

  if (!vin || !/^[A-HJ-NPR-Z0-9]{17}$/i.test(vin)) {
    return NextResponse.json({ error: "Invalid VIN" }, { status: 400 });
  }

  try {
    // Strategy: NHTSA (free, US/CA) -> auto.dev (freemium, global) -> local parsing (fallback)
    const nhtsaResult = await decodeWithNhtsa(vin);
    if (nhtsaResult) {
      return NextResponse.json(nhtsaResult);
    }

    const autodevResult = await decodeWithAutodev(vin);
    if (autodevResult) {
      return NextResponse.json(autodevResult);
    }

    // Final fallback: extract what we can from VIN structure
    const localResult = await decodeWithLocalParsing(vin);
    return NextResponse.json(localResult);
  } catch {
    return NextResponse.json(
      { error: "Failed to decode VIN. Please try again." },
      { status: 502 }
    );
  }
}
