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
exports.uploader = void 0;
const db_1 = require("../db");
const schema_1 = require("../schema");
const uuid_1 = require("uuid");
const uploader = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { notes, userId, days, title, images: imageArray } = req.body;
        if (!notes || !days || !title || !userId) {
            res
                .status(400)
                .json({
                success: false,
                message: "Notes, title, days, and userId are required.",
            });
            return;
        }
        const capsuleId = (0, uuid_1.v4)();
        const capsuleData = {
            id: capsuleId,
            title: title,
            notes: notes,
            createdAt: new Date(),
            ownerId: userId,
            released: false,
            releaseDate: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
        };
        yield db_1.db.insert(schema_1.timeCapsules).values(capsuleData);
        if (Array.isArray(imageArray) && imageArray.length > 0) {
            const imagePromises = imageArray.map((image) => {
                const imageData = {
                    id: (0, uuid_1.v4)(),
                    capsuleId: capsuleId,
                    image: image,
                    createdAt: new Date(),
                };
                return db_1.db.insert(schema_1.images).values(imageData);
            });
            yield Promise.all(imagePromises);
        }
        res
            .status(201)
            .json({ success: true, message: "Time capsule created successfully." });
    }
    catch (error) {
        console.error("Error uploading time capsule:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});
exports.uploader = uploader;
