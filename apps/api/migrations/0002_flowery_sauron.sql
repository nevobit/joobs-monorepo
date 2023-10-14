CREATE TABLE IF NOT EXISTS "projects" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(256) NOT NULL,
	"status" varchar(256) NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "projects_id_index" ON "projects" ("id");