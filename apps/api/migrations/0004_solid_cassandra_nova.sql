ALTER TABLE "works" ADD COLUMN "remuneration" jsonb;
ALTER TABLE "works" ADD COLUMN "created_at" timestamp DEFAULT now();
ALTER TABLE "works" ADD COLUMN "updated_at" timestamp DEFAULT now();