import express from "express";
import { checkAuth } from "../controllers/auth/jwt.js";
import { getAllExpense } from "../controllers/expense_tracker/expenses/getAllExpense.js";
import { addExpense } from "../controllers/expense_tracker/expenses/addExpense.js";
import { editExpense } from "../controllers/expense_tracker/expenses/editExpense.js";
import { removeExpense } from "../controllers/expense_tracker/expenses/removeExpense.js";



const expenseRoute = express.Router();

expenseRoute.get("/", checkAuth, getAllExpense);
expenseRoute.post("/addExpense", checkAuth, addExpense);
expenseRoute.patch("/editExpense", checkAuth, editExpense);
expenseRoute.delete("/deleteExpense", checkAuth, removeExpense);

export default expenseRoute;