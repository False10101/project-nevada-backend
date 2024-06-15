import express from "express";
import { addChore } from "../controllers/chores/addChores.js";
import { checkAuth } from "../controllers/auth/jwt.js";
import { getAllChores } from "../controllers/chores/getAllChores.js";
import { editChore } from "../controllers/chores/editChores.js";
import { deleteChores } from "../controllers/chores/deleteChores.js";

const choreRouter = express.Router();

choreRouter.get("/", checkAuth, getAllChores);
choreRouter.post("/addChore", checkAuth, addChore);
choreRouter.patch("/editChore", checkAuth, editChore);
choreRouter.delete("/deleteChore", checkAuth, deleteChores);


export default choreRouter;