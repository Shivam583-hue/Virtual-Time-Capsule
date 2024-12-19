import cors from "cors";
import client from "prom-client";
import { metricsMiddleware } from "./metrics";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route";
import uploadRoute from "./routes/upload.route";
import getCapsulesRoute from "./routes/getCapsules.route";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(metricsMiddleware);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cookie",
      "Origin",
      "Accept",
    ],
    exposedHeaders: ["set-cookie"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);
app.use("/api", authRoute);
app.use("/api", uploadRoute);
app.use("/api/get", getCapsulesRoute);

app.get("/metrics", async (req, res) => {
  const metrics = await client.register.metrics();
  res.set("Content-Type", client.register.contentType);
  res.end(metrics);
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
