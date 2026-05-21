import { NextRequest, NextResponse } from "next/server";
import { kvAppendToList, kvIncrement, isKvAvailable } from "@/lib/storage/redis";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const entry = {
      ...body,
      ip: request.headers.get("x-forwarded-for") ?? "unknown",
      userAgent: request.headers.get("user-agent") ?? "unknown",
      receivedAt: new Date().toISOString(),
    };

    if (isKvAvailable()) {
      await kvAppendToList("analytics:events", entry);
      // Increment counters for quick stats
      if (body.event) {
        await kvIncrement(`analytics:count:${body.event}`);
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true }); // Never fail analytics
  }
}
