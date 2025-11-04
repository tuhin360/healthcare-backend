import express, { Router } from "express";
import { scheduleController } from "./schedule.controller";
import { UserRole } from "../../../generated/prisma";
import auth from "../../middlewares/auth";

const router: Router = express.Router();

router.post(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  scheduleController.insertIntoDB
);

export const ScheduleRoutes: Router = router;
