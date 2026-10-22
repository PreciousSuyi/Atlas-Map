import { pgTable, text, real, bigint, serial } from "drizzle-orm/pg-core";

export const pins = pgTable("pins", {
  id: text().primaryKey(),
  type: text().notNull(),
  color: text().notNull(),
  lat: real().notNull(),
  lng: real().notNull(),
  label: text().notNull().default(""),
  addedBy: text("added_by").notNull(),
  addedAt: bigint("added_at", { mode: "number" }).notNull(),
});

export const activity = pgTable("activity", {
  id: serial().primaryKey(),
  name: text().notNull(),
  action: text().notNull(),
  type: text().notNull(),
  label: text().notNull().default(""),
  at: bigint({ mode: "number" }).notNull(),
});

export const presence = pgTable("presence", {
  name: text().primaryKey(),
  lastSeen: bigint("last_seen", { mode: "number" }).notNull(),
});
