CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"status" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);

ALTER TABLE "projects" ADD COLUMN "created_at" timestamp DEFAULT now();
ALTER TABLE "projects" ADD COLUMN "updated_at" timestamp DEFAULT now();
ALTER TABLE "projects" ADD COLUMN "user" varchar(256);
CREATE UNIQUE INDEX IF NOT EXISTS "projects_id_index" ON "users" ("id");