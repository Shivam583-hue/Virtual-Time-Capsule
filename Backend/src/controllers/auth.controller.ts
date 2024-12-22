import { Request, Response } from "express";
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const controllerB = ((req: Request, res: Response) => {
  const user = req.user as any;
  if (!user) {
    return res.status(401).send("Authentication failed");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
  
  res
    .cookie("token", token, { httpOnly: true ,secure:true,sameSite:"none"})
    .redirect(process.env.FRONTEND_URL!);
}) as express.RequestHandler;

export const controllerC = (req: Request, res: Response) => {
  res.clearCookie("token").send("Logged out");
};
