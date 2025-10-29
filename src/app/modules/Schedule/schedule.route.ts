import express, { Router } from "express";
import { scheduleController } from "./schedule.controller";

const router: Router = express.Router();

router.post("/", scheduleController.insertIntoDB);

export const ScheduleRoutes: Router = router;
