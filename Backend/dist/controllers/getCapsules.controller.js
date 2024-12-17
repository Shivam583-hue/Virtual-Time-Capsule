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
exports.getOpenedCapsule = exports.helperFunction = exports.capsules = void 0;
const db_1 = require("../db");
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../schema");
const capsules = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        if (!userId) {
            res.status(400).json({ success: false, msg: "User ID is required." });
            return;
        }
        const userCapsules = yield db_1.db
            .select({
            id: schema_1.timeCapsules.id,
            title: schema_1.timeCapsules.title,
            createdAt: schema_1.timeCapsules.createdAt,
            releaseDate: schema_1.timeCapsules.releaseDate,
        })
            .from(schema_1.timeCapsules)
            .where((0, drizzle_orm_1.eq)(schema_1.timeCapsules.ownerId, userId));
        res.status(200).json({ success: true, data: userCapsules });
        return;
    }
    catch (error) {
        console.error("Error fetching user capsules:", error);
        res.status(500).json({
            success: false,
            msg: "An error occurred while fetching user capsules.",
        });
        return;
    }
});
exports.capsules = capsules;
const helperFunction = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const capsuleContent = yield db_1.db
            .select({
            id: schema_1.timeCapsules.id,
            title: schema_1.timeCapsules.title,
            notes: schema_1.timeCapsules.notes,
            releaseDate: schema_1.timeCapsules.releaseDate,
            image: schema_1.images.image,
        })
            .from(schema_1.timeCapsules)
            .leftJoin(schema_1.images, (0, drizzle_orm_1.eq)(schema_1.images.capsuleId, schema_1.timeCapsules.id))
            .where((0, drizzle_orm_1.eq)(schema_1.timeCapsules.id, id));
        if (capsuleContent.length === 0) {
            throw new Error("Capsule not found");
        }
        const formattedCapsule = {
            id: capsuleContent[0].id,
            title: capsuleContent[0].title,
            notes: capsuleContent[0].notes,
            releaseDate: capsuleContent[0].releaseDate,
            images: capsuleContent
                .map((row) => row.image)
                .filter((image) => image !== null),
        };
        return formattedCapsule;
    }
    catch (error) {
        console.error("Error fetching capsule with images:", error);
        throw error;
    }
});
exports.helperFunction = helperFunction;
const getOpenedCapsule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const capsuleContent = yield (0, exports.helperFunction)(id); // Fetch the capsule content
        res.status(200).json({ success: true, data: capsuleContent });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, msg: "Error fetching capsule content" });
    }
});
exports.getOpenedCapsule = getOpenedCapsule;
