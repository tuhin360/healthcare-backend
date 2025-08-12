// routes: handle routing

import express, { Router } from "express";
import { userController } from "./user.controller";

const router: Router = express.Router();

router.post("/", userController.createAdmin);

export const userRoutes: Router = router;
