-- Add Usage Tracking Table
-- This migration creates the usage_tracking table to track monthly feature usage

CREATE TABLE IF NOT EXISTS "usage_tracking" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "user_id" text NOT NULL,
    "feature_type" text NOT NULL,
    "usage_count" integer NOT NULL DEFAULT 0,
    "period_start" timestamp NOT NULL,
    "period_end" timestamp NOT NULL,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "idx_usage_tracking_user_id" ON "usage_tracking"("user_id");
CREATE INDEX IF NOT EXISTS "idx_usage_tracking_user_feature" ON "usage_tracking"("user_id", "feature_type");
CREATE INDEX IF NOT EXISTS "idx_usage_tracking_period" ON "usage_tracking"("period_start", "period_end");

-- Create a unique constraint to prevent duplicate tracking periods for the same user and feature
CREATE UNIQUE INDEX IF NOT EXISTS "idx_usage_tracking_unique_period"
ON "usage_tracking"("user_id", "feature_type", "period_start", "period_end");
