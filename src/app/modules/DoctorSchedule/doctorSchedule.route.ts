import express, { Router } from "express";
import { DoctorScheduleController } from "./doctorSchedule.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma";

const router: Router = express.Router();

router.post(
    "/", 
    auth(UserRole.DOCTOR),
    DoctorScheduleController.insertIntoDB
);

export const DoctorScheduleRoutes: Router = router;
