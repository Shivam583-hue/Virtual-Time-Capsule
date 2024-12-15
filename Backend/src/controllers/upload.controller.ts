import { Request, Response } from "express";
import express from "express";
import { db } from "../db";
import { images } from "../schema";
import { v4 as uuidv4 } from "uuid";

export const uploader: express.RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { capsuleId } = req.body;

    if (!capsuleId) {
      res.status(400).json({ error: "capsuleId is required" });
      return;
    }

    const uploadedFiles = req.files as Express.Multer.File[] | undefined;
    if (!uploadedFiles || uploadedFiles.length === 0) {
      res.status(400).json({ error: "No files were uploaded" });
      return;
    }

    const insertedImages = await Promise.all(
      uploadedFiles.map(async (file) => {
        const newImage = {
          id: uuidv4(),
          capsuleId,
          image: file.buffer.toString("base64"),
          createdAt: new Date(),
        };

        await db.insert(images).values(newImage);
        return newImage;
      }),
    );

    res.status(201).json({
      message: "Images uploaded and saved as binary successfully",
      images: insertedImages.map(({ id, capsuleId, createdAt }) => ({
        id,
        capsuleId,
        createdAt,
      })),
    });
  } catch (error) {
    console.error("Error uploading images:", error);
    res
      .status(500)
      .json({ error: "An unexpected error occurred. Please try again later." });
  }
};
