import express, { Request, Response, Router } from "express";
import { AdminController } from "./admin.controller";

const router: Router = express.Router();

router.get("/", AdminController.getAllFromDB);

router.get("/:id", AdminController.getByIdFromDB);

export const AdminRoutes: Router = router;
