CREATE TABLE "feeds" (
	"id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"url" text,
	CONSTRAINT "feeds_name_unique" UNIQUE("name"),
	CONSTRAINT "feeds_url_unique" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "users_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "feeds" ADD CONSTRAINT "user_id_fk" FOREIGN KEY ("id") REFERENCES "public"."feeds"("id") ON DELETE cascade ON UPDATE no action;