import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { pins } from "../../db/schema.js";

const HEADERS = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };

export default async (req) => {
  try {
    if (req.method === "GET") {
      const all = await db.select().from(pins);
      return new Response(JSON.stringify(all), { headers: HEADERS });
    }

    if (req.method === "POST") {
      const pin = await req.json();
      const id = pin.id || Date.now() + "_" + Math.random().toString(36).slice(2, 8);
      const [inserted] = await db
        .insert(pins)
        .values({
          id,
          type: pin.type,
          color: pin.color,
          lat: pin.lat,
          lng: pin.lng,
          label: pin.label || "",
          addedBy: pin.addedBy || "Someone",
          addedAt: pin.addedAt || Date.now(),
        })
        .returning();
      return new Response(JSON.stringify(inserted), { headers: HEADERS });
    }

    if (req.method === "DELETE") {
      const { id } = await req.json();
      await db.delete(pins).where(eq(pins.id, id));
      return new Response(JSON.stringify({ ok: true }), { headers: HEADERS });
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: HEADERS });
  } catch (err) {
    return new Response(JSON.stringify({ error: String((err && err.message) || err) }), { status: 500, headers: HEADERS });
  }
};
