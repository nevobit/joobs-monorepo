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
	"description" varchar,
	"skills" varchar,
	"difficulty" varchar(256),
	"duration" varchar(256),
	"reward" varchar(256),
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

CREATE TABLE IF NOT EXISTS "user_clubs" (
	"id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "works" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(256) NOT NULL,
	"skills" varchar(256)[],
	"role" varchar(256),
	"location" jsonb,
	"remuneration" jsonb,
	"user" uuid NOT NULL,
	"description" varchar,
	"status" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "clubs" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256),
	"description" text,
	"icon" varchar(256),
	"status" varchar(256),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS "discussions_id_index" ON "discussions" ("id");
CREATE UNIQUE INDEX IF NOT EXISTS "projects_id_index" ON "projects" ("id");
CREATE UNIQUE INDEX IF NOT EXISTS "users_id_index" ON "users" ("id");
CREATE UNIQUE INDEX IF NOT EXISTS "works_id_index" ON "works" ("id");
CREATE UNIQUE INDEX IF NOT EXISTS "clubs_id_index" ON "clubs" ("id");
DO $$ BEGIN
 ALTER TABLE "discussions" ADD CONSTRAINT "discussions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "user_clubs" ADD CONSTRAINT "user_clubs_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "user_clubs" ADD CONSTRAINT "user_clubs_id_clubs_id_fk" FOREIGN KEY ("id") REFERENCES "clubs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
