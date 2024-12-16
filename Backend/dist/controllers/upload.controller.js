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
        const { capsuleId } = req.body;
        if (!capsuleId) {
            res.status(400).json({ error: "capsuleId is required" });
            return;
        }
        const uploadedFiles = req.files;
        if (!uploadedFiles || uploadedFiles.length === 0) {
            res.status(400).json({ error: "No files were uploaded" });
            return;
        }
        const insertedImages = yield Promise.all(uploadedFiles.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            const newImage = {
                id: (0, uuid_1.v4)(),
                capsuleId,
                image: file.buffer.toString("base64"),
                createdAt: new Date(),
            };
            yield db_1.db.insert(schema_1.images).values(newImage);
            return newImage;
        })));
        res.status(201).json({
            message: "Images uploaded and saved as binary successfully",
            images: insertedImages.map(({ id, capsuleId, createdAt }) => ({
                id,
                capsuleId,
                createdAt,
            })),
        });
    }
    catch (error) {
        console.error("Error uploading images:", error);
        res
            .status(500)
            .json({ error: "An unexpected error occurred. Please try again later." });
    }
});
exports.uploader = uploader;
