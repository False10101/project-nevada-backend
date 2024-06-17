import express from "express";
import { getAllEvents } from "../controllers/calendar_events/getAllEvents.js";
import { addEvent } from "../controllers/calendar_events/addEvent.js";
import { editEvent } from "../controllers/calendar_events/editEvent.js";
import { removeEvent } from "../controllers/calendar_events/removeEvent.js";
import { checkAuth } from "../controllers/auth/jwt.js";

const calendarRouter = express.Router();

calendarRouter.get("/:month/:year", checkAuth, getAllEvents);
calendarRouter.post("/addEvent", checkAuth, addEvent);
calendarRouter.patch("/editEvent", checkAuth, editEvent);
calendarRouter.delete("/deleteEvent", checkAuth, removeEvent);

export default calendarRouter;