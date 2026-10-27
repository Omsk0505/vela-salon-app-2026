CREATE TABLE `bookings` (
	`id` text PRIMARY KEY NOT NULL,
	`client_name` text NOT NULL,
	`client_phone` text NOT NULL,
	`service` text NOT NULL,
	`staff` text NOT NULL,
	`booking_date` text NOT NULL,
	`booking_time` text NOT NULL,
	`source` text DEFAULT 'manual' NOT NULL,
	`status` text DEFAULT 'confirmed' NOT NULL,
	`amount` integer DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_bookings_date_time` ON `bookings` (`booking_date`,`booking_time`);
--> statement-breakpoint
CREATE INDEX `idx_bookings_staff_date` ON `bookings` (`staff`,`booking_date`);
