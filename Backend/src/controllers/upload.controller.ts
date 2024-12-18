import { Request, Response } from "express";
import express from "express";
import { db } from "../db";
import { images, InsertCapsule, timeCapsules } from "../schema";
import { v4 as uuidv4 } from "uuid";

export const uploader: express.RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { notes, userId, days, title, images: imageArray } = req.body;

    if (!notes || !days || !title || !userId) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required." });
      return;
    }

    if (!Array.isArray(imageArray) || imageArray.length === 0) {
      res
        .status(400)
        .json({ success: false, message: "At least one image is required." });
      return;
    }

    const capsuleId = uuidv4();

    const capsuleData: InsertCapsule = {
      id: capsuleId,
      title: title,
      notes: notes,
      createdAt: new Date(),
      ownerId: userId,
      released: false,
      releaseDate: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
    };

    await db.insert(timeCapsules).values(capsuleData);

    const imagePromises = imageArray.map((image: string) => {
      const imageData = {
        id: uuidv4(),
        capsuleId: capsuleId,
        image: image,
        createdAt: new Date(),
      };
      return db.insert(images).values(imageData);
    });

    await Promise.all(imagePromises);

    res
      .status(201)
      .json({ success: true, message: "Time capsule created successfully." });
  } catch (error) {
    console.error("Error uploading time capsule:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
