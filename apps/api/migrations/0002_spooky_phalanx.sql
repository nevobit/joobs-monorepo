CREATE TABLE IF NOT EXISTS "likes" (
	"user_id" uuid,
	"discussion_id" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT likes_user_id_discussion_id PRIMARY KEY("user_id","discussion_id")
);
