import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { calculateLandedCost } from "@/lib/calculator/engine";
import { CalculationInput } from "@/types";

const calculationSchema = z.object({
  itemType: z.enum(["vehicle", "electronics", "machinery", "other"]),
  itemValue: z.number().min(100).max(10000000),
  vehicleYear: z.number().min(2000).max(new Date().getFullYear() + 1).optional(),
  vehicleMake: z.string().optional(),
  vehicleModel: z.string().optional(),
  vehicleTrim: z.string().optional(),
  originCountry: z.enum(["US", "CA"]),
  originRegion: z.string().min(1),
  destinationCountry: z.enum(["AE", "SA", "KW", "QA", "BH", "OM", "IL"]),
  destinationCity: z.string().min(1),
  shippingMethod: z.enum(["roro", "container"]),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = calculationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const input: CalculationInput = parsed.data;
    const result = calculateLandedCost(input);

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
