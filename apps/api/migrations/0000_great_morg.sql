CREATE TABLE IF NOT EXISTS "applications" (
	"user_id" uuid NOT NULL,
	"work_id" uuid NOT NULL,
	"proof_of_work" varchar(256),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT applications_user_id_work_id PRIMARY KEY("user_id","work_id")
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

CREATE TABLE IF NOT EXISTS "comments" (
	"id" uuid DEFAULT gen_random_uuid(),
	"text" text,
	"user_id" uuid,
	"discussion_id" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT comments_id PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS "discussions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(256),
	"description" text,
	"images" varchar(256)[],
	"link" varchar(256),
	"status" varchar(256),
	"user_id" uuid,
	"club_id" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "dislikes" (
	"user_id" uuid,
	"discussion_id" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT dislikes_user_id_discussion_id PRIMARY KEY("user_id","discussion_id")
);

CREATE TABLE IF NOT EXISTS "likes" (
	"user_id" uuid,
	"discussion_id" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT likes_user_id_discussion_id PRIMARY KEY("user_id","discussion_id")
);

CREATE TABLE IF NOT EXISTS "participants" (
	"user_id" uuid NOT NULL,
	"project_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT participants_user_id_project_id PRIMARY KEY("user_id","project_id")
);

CREATE TABLE IF NOT EXISTS "projects" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(256) NOT NULL,
	"status" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"description" text,
	"stages" jsonb[],
	"skills" varchar[],
	"difficulty" varchar(256),
	"duration" varchar(256),
	"reward" varchar(256),
	"submission" varchar(256),
	"prerequisites" varchar(256)
);

CREATE TABLE IF NOT EXISTS "usersOnClub" (
	"user_id" uuid NOT NULL,
	"work_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT usersOnClub_user_id_work_id PRIMARY KEY("user_id","work_id")
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
	"college" varchar(256),
	"icebreaker" text[],
	"instagram" varchar(256),
	"facebook" varchar(256),
	"linkedin" varchar(256),
	"twitter" varchar(256),
	"graduation_year" varchar(256),
	"headline" varchar(256),
	"username" varchar(256),
	"company_website" varchar(256),
	"company_logo" varchar(256),
	"company_description" varchar(256),
	"proof_of_work" jsonb[],
	"about" text,
	"born_date" varchar(256),
	"code" integer,
	"gender" varchar(256),
	"email" varchar(256) NOT NULL,
	"last_login" varchar(256) NOT NULL,
	"status" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT users_id PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS "works" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(256) NOT NULL,
	"skills" text[],
	"role" varchar(256),
	"location" jsonb,
	"remuneration" jsonb,
	"user_id" uuid,
	"description" varchar,
	"status" varchar(256),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "connections" (
	"sender_id" uuid NOT NULL,
	"receiver_id" uuid NOT NULL,
	"status" varchar(256),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT connections_sender_id_receiver_id PRIMARY KEY("sender_id","receiver_id")
);

CREATE TABLE IF NOT EXISTS "saved" (
	"user_id" uuid NOT NULL,
	"discussion_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT saved_user_id_discussion_id PRIMARY KEY("user_id","discussion_id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "clubs_id_index" ON "clubs" ("id");
CREATE UNIQUE INDEX IF NOT EXISTS "discussions_id_index" ON "discussions" ("id");
CREATE UNIQUE INDEX IF NOT EXISTS "projects_id_index" ON "projects" ("id");
CREATE UNIQUE INDEX IF NOT EXISTS "users_id_index" ON "users" ("id");
CREATE UNIQUE INDEX IF NOT EXISTS "works_id_index" ON "works" ("id");