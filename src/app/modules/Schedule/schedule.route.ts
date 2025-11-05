import express, { Router } from "express";
import { scheduleController } from "./schedule.controller";
import { UserRole } from "../../../generated/prisma";
import auth from "../../middlewares/auth";

const router: Router = express.Router();


router.get(
  "/", 
  auth(UserRole.DOCTOR),
  scheduleController.getAllFromDB
);

router.post(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  scheduleController.insertIntoDB
);


export const ScheduleRoutes: Router = router;
