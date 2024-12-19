import { pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id", { length: 255 }).primaryKey(),
  googleId: text("google_id").notNull(),
  email: text("email"),
  name: varchar("name", { length: 255 }).notNull(),
  profilePicture: text("profile_picture"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const timeCapsules = pgTable("time_capsules", {
  id: varchar("id", { length: 255 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  notes: text("notes").notNull(),
  releaseDate: timestamp("release_date").notNull(),
  released: boolean().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  ownerId: varchar("ownerId", { length: 255 })
    .references(() => users.id)
    .notNull(),
});

export const images = pgTable("images", {
  id: varchar("id", { length: 255 }).primaryKey(),
  capsuleId: varchar("capsule_id", { length: 255 })
    .references(() => timeCapsules.id)
    .notNull(),
  image: text("image").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const timeCapsulesRelations = relations(timeCapsules, ({ many }) => ({
  images: many(images),
}));

export const imagesRelations = relations(images, ({ one }) => ({
  capsule: one(timeCapsules, {
    fields: [images.capsuleId],
    references: [timeCapsules.id],
  }),
}));

export type InsertUserType = typeof users.$inferInsert;
export type SelectUserType = typeof users.$inferSelect;

export type InsertCapsule = typeof timeCapsules.$inferInsert;
export type SelectCapsule = typeof timeCapsules.$inferSelect;

export type InsertImage = typeof images.$inferInsert;
export type SelectImage = typeof images.$inferSelect;
