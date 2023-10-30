CREATE TABLE IF NOT EXISTS "discussions" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(256),
	"description" text,
	"images" varchar(256)[],
	"link" varchar(256),
	"status" varchar(256),
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "projects" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(256) NOT NULL,
	"status" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"user" varchar(256)
);

CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256),
	"phone" varchar(256),
	"photo" varchar(256),
	"location" jsonb,
	"images" varchar(256)[],
	"method" varchar(256),
	"company_name" varchar(256),
	"headline" varchar(256),
	"username" varchar(256),
	"about" text,
	"born_date" varchar(256),
	"code" integer,
	"gender" varchar(256),
	"email" varchar(256) NOT NULL,
	"last_login" varchar(256) NOT NULL,
	"status" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT users_id PRIMARY KEY("id"),
	CONSTRAINT "users_id_unique" UNIQUE("id")
);

CREATE TABLE IF NOT EXISTS "works" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(256) NOT NULL,
	"skills" text,
	"role" varchar(256),
	"location" jsonb,
	"remuneration" jsonb,
	"user" varchar(256),
	"description" varchar,
	"status" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "works_id_unique" UNIQUE("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "discussions_id_index" ON "discussions" ("id");
CREATE UNIQUE INDEX IF NOT EXISTS "projects_id_index" ON "projects" ("id");
CREATE UNIQUE INDEX IF NOT EXISTS "users_id_index" ON "users" ("id");
CREATE UNIQUE INDEX IF NOT EXISTS "works_id_index" ON "works" ("id");
DO $$ BEGIN
 ALTER TABLE "discussions" ADD CONSTRAINT "discussions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
