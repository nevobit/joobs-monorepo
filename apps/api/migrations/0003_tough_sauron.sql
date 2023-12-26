CREATE TABLE IF NOT EXISTS "blocks" (
	"sender_id" uuid NOT NULL,
	"receiver_id" uuid NOT NULL,
	"status" varchar(256),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT blocks_sender_id_receiver_id PRIMARY KEY("sender_id","receiver_id")
);
