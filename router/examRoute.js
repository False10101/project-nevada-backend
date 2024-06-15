import express from "express";
import { checkAuth } from "../controllers/auth/jwt.js";
import { getAllExams } from "../controllers/exam_history/getAllExams.js";
import { addExam } from "../controllers/exam_history/addExam.js";
import { editExam } from "../controllers/exam_history/editExam.js";
import { removeExam } from "../controllers/exam_history/removeExam.js";



const examRouter = express.Router();

examRouter.get("/", checkAuth, getAllExams);
examRouter.post("/addExam", checkAuth, addExam);
examRouter.patch("/editExam", checkAuth, editExam);
examRouter.delete("/deleteExam", checkAuth, removeExam);

export default examRouter;