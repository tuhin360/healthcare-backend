import express, { NextFunction, Request, Response, Router } from "express";
import { specialtiesController } from "./specialties.controller";
import { fileUploader } from "../../../helpers/fileUploader";
import { specialtiesValidation } from "./specialties.validation";

const router: Router = express.Router();

router.get("/", specialtiesController.getAllFromDB);

router.post(
  "/",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = specialtiesValidation.create.parse(JSON.parse(req.body.data));
    return specialtiesController.insertIntoDB(req, res, next);
  }
);

router.delete("/:id", specialtiesController.deleteFromDB);

export const SpecialtiesRoutes: Router = router;
