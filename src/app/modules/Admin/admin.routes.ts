import express, { Request, Response, Router } from "express";
import { AdminController } from "./admin.controller";

const router: Router = express.Router();

router.get("/", AdminController.getAllFromDB);

router.get("/:id", AdminController.getByIdFromDB);

router.patch("/:id", AdminController.updateIntoDB);

router.delete("/:id", AdminController.deleteFromDB);

router.delete("/soft/:id", AdminController.softDeleteFromDB);

export const AdminRoutes: Router = router;
