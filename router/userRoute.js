import express from "express";
import {getUserProfile} from "../controllers/user/getUserProfile.js";
import { getUsername } from "../controllers/user/getUsername.js";
import { checkAuth } from "../controllers/auth/jwt.js";
import { checkPin } from "../controllers/user/checkPin.js";
import { getThemeConfig } from "../controllers/user/getThemeConfig.js";

const userRouter = express.Router();

userRouter.get("/", checkAuth, getUserProfile);
userRouter.get("/getUsername",checkAuth, getUsername);
userRouter.get("/getTheme",checkAuth, getThemeConfig);
userRouter.post("/checkPin", checkPin);

export default userRouter;