CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"google_id" text NOT NULL,
	"email" text,
	"name" varchar(255) NOT NULL,
	"profile_picture" text,
	"created_at" timestamp DEFAULT now()
);
