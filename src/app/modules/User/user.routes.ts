// routes: handle routing
import express, { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma";

import { fileUploader } from "../../../helpers/fileUploader";

const router: Router = express.Router();

router.post(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  userController.createAdmin
);

export const userRoutes: Router = router;
