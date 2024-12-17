"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getCapsules_controller_1 = require("../controllers/getCapsules.controller");
const router = express_1.default.Router();
router.get("/capsules", getCapsules_controller_1.capsules);
router.get("/capsule", getCapsules_controller_1.capsule);
exports.default = router;
