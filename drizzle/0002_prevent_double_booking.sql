DELETE FROM `bookings`
WHERE rowid NOT IN (
  SELECT MIN(rowid) FROM `bookings` GROUP BY `staff`,`booking_date`,`booking_time`
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `idx_bookings_unique_staff_slot`
ON `bookings` (`staff`,`booking_date`,`booking_time`);
