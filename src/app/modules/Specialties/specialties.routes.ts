import express, { NextFunction, Request, Response, Router } from "express";
import { SpecialtiesController } from "./specialties.controller";
import { fileUploader } from "../../../helpers/fileUploader";

const router: Router = express.Router();

router.post(
    "/", 
     fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return SpecialtiesController.insertIntoDB(req, res, next);
  }
);

export const SpecialtiesRoutes: Router = router;
