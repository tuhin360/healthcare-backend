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

/**
 * API ENDPOINT: /schedule/:id
 * 
 * Get schedule data by id
 */
router.get(
    '/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
    scheduleController.getByIdFromDB
);


router.post(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  scheduleController.insertIntoDB
);

/**
 * API ENDPOINT: /schdeule/:id
 * 
 * Delete schedule data by id
 */
router.delete(
    '/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    scheduleController.deleteFromDB
);


export const ScheduleRoutes: Router = router;
