import express from "express";
import { checkAuth } from "../controllers/auth/jwt.js";
import { getAllDebt } from "../controllers/expense_tracker/debts/getAllDebt.js";
import { addDebt } from "../controllers/expense_tracker/debts/addDebt.js";
import { editDebt } from "../controllers/expense_tracker/debts/editDebt.js";
import { removeDebt } from "../controllers/expense_tracker/debts/removeDebt.js";


const debtRouter = express.Router();

debtRouter.get("/", checkAuth, getAllDebt);
debtRouter.post("/addDebt", checkAuth, addDebt);
debtRouter.patch("/editDebt", checkAuth, editDebt);
debtRouter.delete("/deleteDebt", checkAuth, removeDebt);

export default debtRouter;