#!/usr/bin/env node

/**
 * Analytics Reader — Pull stats from Upstash Redis
 * 
 * Usage:
 *   node scripts/read-analytics.mjs              # Summary dashboard
 *   node scripts/read-analytics.mjs events 20    # Last 20 raw events
 *   node scripts/read-analytics.mjs waitlist     # All waitlist signups
 */

import { Redis } from "@upstash/redis";
import { config } from "dotenv";

config({ path: ".env.local" });

const url = process.env.KV_REST_API_URL;
const token = process.env.KV_REST_API_TOKEN;

if (!url || !token) {
  console.error("\n❌ Missing KV_REST_API_URL or KV_REST_API_TOKEN in .env.local");
  console.error("   Add your Upstash Redis credentials to use this script.\n");
  process.exit(1);
}

const redis = new Redis({ url, token });

const command = process.argv[2] || "summary";
const limit = parseInt(process.argv[3]) || 50;

async function printSummary() {
  console.log("\n╔══════════════════════════════════════════╗");
  console.log("║   CrossBorder Navigator — Analytics      ║");
  console.log("╚══════════════════════════════════════════╝\n");

  const keys = [
    "analytics:count:page_view",
    "analytics:count:calculator_started",
    "analytics:count:calculator_step_completed",
    "analytics:count:calculator_completed",
    "analytics:count:pdf_downloaded",
    "analytics:count:declaration_generated",
    "analytics:count:waitlist_signup",
  ];

  const counters = await Promise.all(keys.map((k) => redis.get(k)));

  const rows = [
    ["Page Views", counters[0] || 0],
    ["Calculator Started", counters[1] || 0],
    ["Steps Completed", counters[2] || 0],
    ["Calculations Finished", counters[3] || 0],
    ["PDFs Downloaded", counters[4] || 0],
    ["Declarations Generated", counters[5] || 0],
    ["Waitlist Signups", counters[6] || 0],
  ];

  console.log("  Event                    Count");
  console.log("  ─────────────────────────────────");
  for (const [label, count] of rows) {
    console.log(`  ${String(label).padEnd(25)} ${count}`);
  }

  const waitlistSize = await redis.llen("waitlist");
  const eventsSize = await redis.llen("analytics:events");

  console.log("\n  ─────────────────────────────────");
  console.log(`  Total events stored:     ${eventsSize}`);
  console.log(`  Waitlist entries:         ${waitlistSize}`);
  console.log("");
}

async function printEvents(count) {
  console.log(`\n📊 Last ${count} analytics events:\n`);

  const events = await redis.lrange("analytics:events", 0, count - 1);

  if (!events.length) {
    console.log("  No events recorded yet.\n");
    return;
  }

  for (const event of events) {
    const e = typeof event === "string" ? JSON.parse(event) : event;
    const time = e.receivedAt ? new Date(e.receivedAt).toLocaleString() : "?";
    console.log(`  [${time}] ${e.event || "unknown"} — ${e.url || ""}`);
    if (e.properties) {
      const props = Object.entries(e.properties)
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}=${v}`)
        .join(", ");
      if (props) console.log(`    └─ ${props}`);
    }
  }
  console.log("");
}

async function printWaitlist() {
  console.log("\n📧 Waitlist signups:\n");

  const entries = await redis.lrange("waitlist", 0, -1);

  if (!entries.length) {
    console.log("  No signups yet.\n");
    return;
  }

  console.log("  Email                              Date");
  console.log("  ───────────────────────────────────────────────");

  for (const entry of entries) {
    const e = typeof entry === "string" ? JSON.parse(entry) : entry;
    const date = e.timestamp ? new Date(e.timestamp).toLocaleDateString() : "?";
    console.log(`  ${String(e.email).padEnd(35)} ${date}`);
  }

  console.log(`\n  Total: ${entries.length} signups\n`);
}

switch (command) {
  case "summary":
    await printSummary();
    break;
  case "events":
    await printEvents(limit);
    break;
  case "waitlist":
    await printWaitlist();
    break;
  default:
    console.log("\nUsage:");
    console.log("  node scripts/read-analytics.mjs              # Summary dashboard");
    console.log("  node scripts/read-analytics.mjs events 20    # Last 20 events");
    console.log("  node scripts/read-analytics.mjs waitlist     # Waitlist signups\n");
}
