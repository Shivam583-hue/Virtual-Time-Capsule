"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagesRelations = exports.timeCapsulesRelations = exports.images = exports.timeCapsules = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_2 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.varchar)("id", { length: 255 }).primaryKey(),
    googleId: (0, pg_core_1.text)("google_id").notNull(),
    email: (0, pg_core_1.text)("email"),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    profilePicture: (0, pg_core_1.text)("profile_picture"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.timeCapsules = (0, pg_core_1.pgTable)("time_capsules", {
    id: (0, pg_core_1.varchar)("id", { length: 255 }).primaryKey(),
    title: (0, pg_core_1.varchar)("title", { length: 255 }).notNull(),
    notes: (0, pg_core_1.text)("notes").notNull(),
    releaseDate: (0, pg_core_1.timestamp)("release_date").notNull(),
    released: (0, pg_core_2.boolean)().default(false),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
    ownerId: (0, pg_core_1.varchar)("ownerId", { length: 255 })
        .references(() => exports.users.id)
        .notNull(),
});
exports.images = (0, pg_core_1.pgTable)("images", {
    id: (0, pg_core_1.varchar)("id", { length: 255 }).primaryKey(),
    capsuleId: (0, pg_core_1.varchar)("capsule_id", { length: 255 })
        .references(() => exports.timeCapsules.id)
        .notNull(),
    image: (0, pg_core_1.text)("image").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
exports.timeCapsulesRelations = (0, drizzle_orm_1.relations)(exports.timeCapsules, ({ many }) => ({
    images: many(exports.images),
}));
exports.imagesRelations = (0, drizzle_orm_1.relations)(exports.images, ({ one }) => ({
    capsule: one(exports.timeCapsules, {
        fields: [exports.images.capsuleId],
        references: [exports.timeCapsules.id],
    }),
}));
