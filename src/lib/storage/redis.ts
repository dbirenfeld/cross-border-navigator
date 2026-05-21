import { Redis } from "@upstash/redis";

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) return null;

  redis = new Redis({ url, token });
  return redis;
}

export async function kvAppendToList(key: string, value: unknown): Promise<boolean> {
  const client = getRedis();
  if (!client) return false;

  try {
    await client.lpush(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error("KV write failed:", e);
    return false;
  }
}

export async function kvGetList(key: string, start = 0, end = -1): Promise<string[]> {
  const client = getRedis();
  if (!client) return [];

  try {
    return await client.lrange(key, start, end);
  } catch {
    return [];
  }
}

export async function kvIncrement(key: string): Promise<number> {
  const client = getRedis();
  if (!client) return 0;

  try {
    return await client.incr(key);
  } catch {
    return 0;
  }
}

export function isKvAvailable(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}
