import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { presence } from "../../db/schema.js";

const HEADERS = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };

export default async (req) => {
  try {
    if (req.method === "GET") {
      const rows = await db.select().from(presence);
      const people = {};
      rows.forEach((row) => {
        people[row.name] = row.lastSeen;
      });
      return new Response(JSON.stringify(people), { headers: HEADERS });
    }

    if (req.method === "POST") {
      const { name } = await req.json();
      if (!name) return new Response(JSON.stringify({ error: "name required" }), { status: 400, headers: HEADERS });
      await db
        .insert(presence)
        .values({ name, lastSeen: Date.now() })
        .onConflictDoUpdate({ target: presence.name, set: { lastSeen: Date.now() } });
      return new Response(JSON.stringify({ ok: true }), { headers: HEADERS });
    }

    if (req.method === "DELETE") {
      const { name } = await req.json();
      await db.delete(presence).where(eq(presence.name, name));
      return new Response(JSON.stringify({ ok: true }), { headers: HEADERS });
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: HEADERS });
  } catch (err) {
    return new Response(JSON.stringify({ error: String((err && err.message) || err) }), { status: 500, headers: HEADERS });
  }
};
