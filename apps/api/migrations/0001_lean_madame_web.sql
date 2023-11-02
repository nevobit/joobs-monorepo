ALTER TABLE "comments" DROP CONSTRAINT "comments_user_id_discussion_id";
ALTER TABLE "comments" ADD COLUMN "id" uuid DEFAULT gen_random_uuid();
ALTER TABLE "comments" ADD CONSTRAINT "comments_id" PRIMARY KEY("id");