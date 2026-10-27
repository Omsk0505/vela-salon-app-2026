import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const bookings = sqliteTable("bookings", {
  id: text("id").primaryKey(),
  clientName: text("client_name").notNull(),
  clientPhone: text("client_phone").notNull(),
  service: text("service").notNull(),
  staff: text("staff").notNull(),
  bookingDate: text("booking_date").notNull(),
  bookingTime: text("booking_time").notNull(),
  source: text("source").notNull().default("manual"),
  status: text("status").notNull().default("confirmed"),
  amount: integer("amount").notNull().default(0),
  createdAt: text("created_at").notNull(),
});
