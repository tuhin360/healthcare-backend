import express, { Router } from "express";
import { AppointmentController } from "./appointment.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma";

const router: Router = express.Router();


router.get(
    '/my-appointment',
    auth(UserRole.PATIENT, UserRole.DOCTOR),
    AppointmentController.getMyAppointment
)

router.post(
    "/",
    auth(UserRole.PATIENT), 
    AppointmentController.createAppointment
);

export const AppointmentRoutes: Router = router;
