import express from "express";
import debtRouter from "./debtRoute.js";
import expenseRoute from "./expenseRoute.js";
import { totalDebt } from "../controllers/expense_tracker/debts/totalDebt.js";
import { checkAuth } from "../controllers/auth/jwt.js";
import { totalMoneyLeft } from "../controllers/expense_tracker/expenses/totalMoneyLeft.js";

const expenseTrackerRouter = express.Router();

expenseTrackerRouter.use("/debt", debtRouter);
expenseTrackerRouter.use("/expense", expenseRoute);
expenseTrackerRouter.use("/totalDebt", checkAuth, totalDebt);
expenseTrackerRouter.use("/totalMoneyLeft", checkAuth, totalMoneyLeft);

export default expenseTrackerRouter;