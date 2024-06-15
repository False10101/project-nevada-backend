import express from "express";
import authRouter from "./authRoute.js";
import userRouter from "./userRoute.js";
import noteRouter from "./noteRoute.js";
import choreRouter from "./choreRoute.js";
import assignmentRouter from "./assignmentRoute.js";
import expenseTrackerRouter from "./expenseTrackerRoute.js";
import examRouter from "./examRoute.js";
import calendarRouter from "./calendarEventRoute.js";

const mainRouter = express.Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/notes", noteRouter);
mainRouter.use("/chores", choreRouter);
mainRouter.use("/assignments", assignmentRouter);
mainRouter.use("/expense_tracker", expenseTrackerRouter);
mainRouter.use("/exam_history", examRouter);
mainRouter.use("/calendar_events", calendarRouter);

export default mainRouter;