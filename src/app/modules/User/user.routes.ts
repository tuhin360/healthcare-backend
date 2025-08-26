// routes: handle routing
import express, { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";

const router: Router = express.Router();

router.post("/", auth("ADMIN", "SUPER_ADMIN"), userController.createAdmin);

export const userRoutes: Router = router;
