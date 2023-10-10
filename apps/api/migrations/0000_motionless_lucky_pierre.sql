CREATE TABLE IF NOT EXISTS "works" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(256) NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "works_id_index" ON "works" ("id");