CREATE TABLE IF NOT EXISTS "messages" (
	"id" uuid DEFAULT gen_random_uuid(),
	"text" text,
	"receiver_id" uuid,
	"sender_id" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT messages_id PRIMARY KEY("id")
);
