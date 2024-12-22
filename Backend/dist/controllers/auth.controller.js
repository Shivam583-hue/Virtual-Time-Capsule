"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerC = exports.controllerB = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.controllerB = ((req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(401).send("Authentication failed");
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    res
        .cookie("token", token, { httpOnly: true, secure: true })
        .redirect(process.env.FRONTEND_URL);
});
const controllerC = (req, res) => {
    res.clearCookie("token").send("Logged out");
};
exports.controllerC = controllerC;
