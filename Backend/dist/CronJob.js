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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const db_1 = require("./db");
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("./schema");
node_cron_1.default.schedule("0 * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const now = new Date();
        const releasedCapsules = yield db_1.db
            .select()
            .from(schema_1.timeCapsules)
            .where((0, drizzle_orm_1.lte)(schema_1.timeCapsules.releaseDate, now));
        for (const capsule of releasedCapsules) {
            console.log(`Capsule ${capsule.id} is now released!`);
            yield db_1.db
                .update(schema_1.timeCapsules)
                .set({ released: true })
                .where((0, drizzle_orm_1.eq)(schema_1.timeCapsules.id, capsule.id));
        }
    }
    catch (error) {
        console.error("Error processing time capsules:", error);
    }
}));
