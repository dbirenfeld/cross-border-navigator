import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { appendFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

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

    const dataDir = join(process.cwd(), "data");
    if (!existsSync(dataDir)) {
      mkdirSync(dataDir, { recursive: true });
    }

    const entry = `${parsed.data.email},${new Date().toISOString()}\n`;
    appendFileSync(join(dataDir, "waitlist.csv"), entry);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to save" },
      { status: 500 }
    );
  }
}
