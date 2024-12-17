import express from "express";
import { capsule, capsules } from "../controllers/getCapsules.controller";

const router = express.Router();

router.get("/capsules", capsules);
router.get("/capsule", capsule);

export default router;
