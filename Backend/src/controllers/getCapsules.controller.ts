import { db } from "../db";
import { eq } from "drizzle-orm";
import express from "express";
import { Request, Response } from "express";
import { images, timeCapsules } from "../schema";

export const capsules: express.RequestHandler = async (
  req,
  res,
): Promise<void> => {
  try {
    const { userId } = req.body;

    if (!userId) {
      res.status(400).json({ success: false, msg: "User ID is required." });
      return;
    }

    const userCapsules = await db
      .select({
        id: timeCapsules.id,
        title: timeCapsules.title,
        createdAt: timeCapsules.createdAt,
        releaseDate: timeCapsules.releaseDate,
      })
      .from(timeCapsules)
      .where(eq(timeCapsules.ownerId, userId));

    res.status(200).json({ success: true, data: userCapsules });
    return;
  } catch (error) {
    console.error("Error fetching user capsules:", error);
    res.status(500).json({
      success: false,
      msg: "An error occurred while fetching user capsules.",
    });
    return;
  }
};

const helperFunction = async (id: string) => {
  try {
    const capsuleContent = await db
      .select({
        id: timeCapsules.id,
        title: timeCapsules.title,
        notes: timeCapsules.notes,
        releaseDate: timeCapsules.releaseDate,
        images: images.image,
      })
      .from(timeCapsules)
      .leftJoin(images, eq(images.capsuleId, timeCapsules.id))
      .where(eq(timeCapsules.id, id));

    return capsuleContent;
  } catch (error) {
    console.error("Error fetching capsule with images:", error);
    throw error;
  }
};

export const capsule = (async (
  req: Request,
  res: Response,
) => {}) as express.RequestHandler;
