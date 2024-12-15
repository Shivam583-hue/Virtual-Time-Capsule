CREATE TABLE IF NOT EXISTS "images" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"capsule_id" varchar(255) NOT NULL,
	"image" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "time_capsules" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"release_date" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"ownerId" varchar(255) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "images" ADD CONSTRAINT "images_capsule_id_time_capsules_id_fk" FOREIGN KEY ("capsule_id") REFERENCES "public"."time_capsules"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "time_capsules" ADD CONSTRAINT "time_capsules_ownerId_users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
