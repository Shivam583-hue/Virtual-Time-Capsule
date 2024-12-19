ALTER TABLE "time_capsules" ADD COLUMN "notes" text NOT NULL;--> statement-breakpoint
ALTER TABLE "time_capsules" ADD COLUMN "released" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "time_capsules" DROP COLUMN IF EXISTS "description";