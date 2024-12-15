import express from "express";
import { uploader } from "../controllers/upload.controller";

const router = express.Router();

router.post("/upload-capsule", uploader);

export default router;
