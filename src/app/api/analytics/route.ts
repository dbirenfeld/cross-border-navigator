import { NextRequest, NextResponse } from "next/server";
import { appendFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const dataDir = join(process.cwd(), "data");
    if (!existsSync(dataDir)) {
      mkdirSync(dataDir, { recursive: true });
    }

    const entry = JSON.stringify({
      ...body,
      ip: request.headers.get("x-forwarded-for") ?? "unknown",
      userAgent: request.headers.get("user-agent") ?? "unknown",
      receivedAt: new Date().toISOString(),
    });

    appendFileSync(join(dataDir, "analytics.jsonl"), entry + "\n");

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true }); // Never fail analytics
  }
}
