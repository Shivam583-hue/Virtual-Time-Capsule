"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertUser = upsertUser;
exports.getUserByID = getUserByID;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("./db");
const schema_1 = require("./schema");
function upsertUser(profile) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield db_1.db
            .select()
            .from(schema_1.users)
            .where((0, drizzle_orm_1.eq)(schema_1.users.googleId, profile.googleId))
            .limit(1);
        if (existingUser.length > 0) {
            return existingUser[0];
        }
        const [newUser] = yield db_1.db.insert(schema_1.users).values(profile).returning();
        return newUser;
    });
}
function getUserByID(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield db_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, id)).limit(1);
        return user[0] || null;
    });
}
