import express from "express";

import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma";
import { ReviewController } from "./review.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ReviewValidation } from "./review.validation";

const router = express.Router();

router.get(
    "/", 
    ReviewController.getAllFromDB);

router.post(
  "/",
  auth(UserRole.PATIENT),
  validateRequest(ReviewValidation.create),
  ReviewController.insertIntoDB
);

export const ReviewRoutes: express.Router = router;
