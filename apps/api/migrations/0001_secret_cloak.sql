ALTER TABLE "discussions" ADD COLUMN "isPoll" boolean DEFAULT false;
ALTER TABLE "discussions" ADD COLUMN "poll" jsonb[];
ALTER TABLE "discussions" ADD COLUMN "voters" varchar[];