CREATE TABLE IF NOT EXISTS "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"hsn_sac_code" text NOT NULL,
	"stock" numeric(10, 0) NOT NULL,
	"unit" text NOT NULL,
	"rate" numeric(10, 2) NOT NULL,
	"taxable_amount" numeric(10, 2) NOT NULL,
	"gst" numeric(5, 2) NOT NULL,
	"cgst" numeric(5, 2) NOT NULL,
	"sgst" numeric(5, 2) NOT NULL,
	"igst" numeric(5, 2) NOT NULL,
	"total_gst" numeric(10, 2) NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
