import { controllerB, controllerC } from "../controllers/auth.controller";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import express from "express";
import { v4 as uuidv4 } from "uuid";
import passport from "passport";
import cookieParser from "cookie-parser";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { upsertUser, getUserByID } from "../DatabaseCalls";
import { InsertUserType } from "../schema";

const router = express.Router();
const app = express();

app.use(cookieParser());
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userToInsert: InsertUserType = {
          id: uuidv4(),
          googleId: profile.id,
          email: profile.emails?.[0]?.value || "",
          name: profile.displayName || "Unknown",
          profilePicture: profile.photos?.[0]?.value || "",
          createdAt: new Date(),
        };

        const user = await upsertUser(userToInsert);
        done(null, user);
      } catch (error) {
        done(error);
      }
    },
  ),
);

passport.serializeUser((user: any, done: (err: any, id?: any) => void) => {
  done(null, user.id);
});

passport.deserializeUser(
  async (id: string, done: (err: any, id?: any) => void) => {
    try {
      const user = await getUserByID(id);
      done(null, user || null);
    } catch (error) {
      done(error, null);
    }
  },
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  controllerB,
);
router.get("/logout", controllerC);

router.get("/user/me", (async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await getUserByID(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}) as express.RequestHandler);

export default router;
