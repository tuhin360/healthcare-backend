import express, { Router } from "express";
import { AuthController } from "./auth.controller";

const router: Router = express.Router();

router.post("/login", AuthController.loginUser);

router.post("/refresh-token", AuthController.refreshToken);

export const AuthRoutes: Router = router;
