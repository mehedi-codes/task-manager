CREATE TABLE "rate_limits" (
	"count" integer NOT NULL,
	"id" text PRIMARY KEY,
	"key" text NOT NULL UNIQUE,
	"last_request" bigint NOT NULL
);
