import express from "express";
import { login } from "../controllers/auth/login.js";
import { register } from "../controllers/auth/register.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);

export default authRouter;