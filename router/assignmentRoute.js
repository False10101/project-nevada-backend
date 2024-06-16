import express from "express";
import { checkAuth } from "../controllers/auth/jwt.js";
import { addAssignment } from "../controllers/assignments/addAssignments.js";
import { getAllAssignments } from "../controllers/assignments/getAllAssignments.js";
import { editAssignment } from "../controllers/assignments/editAssignments.js";
import { deleteAssignments } from "../controllers/assignments/deleteAssignment.js";
import upload from "../middleware/uploadMiddlewares.js";
import downloadAssignment from "../controllers/assignments/downloadAssignment.js";

const assignmentRouter = express.Router();

assignmentRouter.get("/", checkAuth, getAllAssignments);
assignmentRouter.get("/download/:fileName", checkAuth, downloadAssignment);
assignmentRouter.post("/addAssignment", checkAuth, upload.single('file'), addAssignment);
assignmentRouter.patch("/editAssignment", checkAuth, upload.single('file'), editAssignment);
assignmentRouter.delete("/deleteAssignment", checkAuth, deleteAssignments);


export default assignmentRouter;