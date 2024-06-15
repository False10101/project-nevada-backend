import express from "express";
import { getAllNotes } from "../controllers/notes/getAllNotes.js";
import { checkAuth } from "../controllers/auth/jwt.js";
import { addNote } from "../controllers/notes/addNotes.js";
import { editNote } from "../controllers/notes/editNotes.js";
import { deleteNote } from "../controllers/notes/deleteNotes.js";

const noteRouter = express.Router();

noteRouter.get("/", checkAuth, getAllNotes);
noteRouter.post("/addNote", checkAuth, addNote);
noteRouter.patch("/editNote", checkAuth, editNote);
noteRouter.delete("/deleteNote", checkAuth, deleteNote);

export default noteRouter;