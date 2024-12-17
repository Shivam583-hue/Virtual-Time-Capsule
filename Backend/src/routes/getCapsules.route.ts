import express from "express";
import {
  capsules,
  getOpenedCapsule,
} from "../controllers/getCapsules.controller";

const router = express.Router();

router.get("/capsules", capsules);
router.get("/capsule/:id", getOpenedCapsule);

export default router;
