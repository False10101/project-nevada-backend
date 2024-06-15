import express from "express";
import { checkAuth } from "../controllers/auth/jwt.js";
import { addAssignment } from "../controllers/assignments/addAssignments.js";
import { getAllAssignments } from "../controllers/assignments/getAllAssignments.js";
import { editAssignment } from "../controllers/assignments/editAssignments.js";
import { deleteAssignments } from "../controllers/assignments/deleteAssignment.js";

const assignmentRouter = express.Router();

assignmentRouter.get("/", checkAuth, getAllAssignments);
assignmentRouter.post("/addAssignment", checkAuth, addAssignment);
assignmentRouter.patch("/editAssignment", checkAuth, editAssignment);
assignmentRouter.delete("/deleteAssignment", checkAuth, deleteAssignments);


export default assignmentRouter;