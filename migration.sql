CREATE TABLE "activity" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"action" text NOT NULL,
	"type" text NOT NULL,
	"label" text DEFAULT '' NOT NULL,
	"at" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pins" (
	"id" text PRIMARY KEY,
	"type" text NOT NULL,
	"color" text NOT NULL,
	"lat" real NOT NULL,
	"lng" real NOT NULL,
	"label" text DEFAULT '' NOT NULL,
	"added_by" text NOT NULL,
	"added_at" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "presence" (
	"name" text PRIMARY KEY,
	"last_seen" bigint NOT NULL
);
