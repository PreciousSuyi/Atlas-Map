import { desc } from "drizzle-orm";
import { db } from "../../db/index.js";
import { activity } from "../../db/schema.js";

const HEADERS = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };
const MAX_ENTRIES = 40;

export default async (req) => {
  try {
    if (req.method === "GET") {
      const recent = await db.select().from(activity).orderBy(desc(activity.at)).limit(MAX_ENTRIES);
      return new Response(JSON.stringify(recent), { headers: HEADERS });
    }

    if (req.method === "POST") {
      const entry = await req.json();
      const [inserted] = await db
        .insert(activity)
        .values({
          name: entry.name || "Someone",
          action: entry.action,
          type: entry.type,
          label: entry.label || "",
          at: entry.at || Date.now(),
        })
        .returning();
      return new Response(JSON.stringify(inserted), { headers: HEADERS });
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: HEADERS });
  } catch (err) {
    return new Response(JSON.stringify({ error: String((err && err.message) || err) }), { status: 500, headers: HEADERS });
  }
};
