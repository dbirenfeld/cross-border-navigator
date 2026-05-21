import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { kvAppendToList, isKvAvailable } from "@/lib/storage/redis";

const schema = z.object({
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const entry = {
      email: parsed.data.email,
      timestamp: new Date().toISOString(),
      ip: request.headers.get("x-forwarded-for") ?? "unknown",
    };

    if (isKvAvailable()) {
      await kvAppendToList("waitlist", entry);
    } else {
      // Local dev fallback: log to console
      console.log("[waitlist]", entry);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to save" },
      { status: 500 }
    );
  }
}
