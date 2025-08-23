import express, { NextFunction, Request, Response, Router } from "express";
import { AdminController } from "./admin.controller";
import * as z from "zod";
import { ZodObject } from "zod";

const router: Router = express.Router();

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    contactNumber: z.string().optional(),
  }),
});

const validateRequest =
  (schema: ZodObject<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });
      return next();
    } catch (error) {
      next(error);
    }
  };

router.get("/", AdminController.getAllFromDB);

router.get("/:id", AdminController.getByIdFromDB);

router.patch("/:id", validateRequest(update), AdminController.updateIntoDB);

router.delete("/:id", AdminController.deleteFromDB);

router.delete("/soft/:id", AdminController.softDeleteFromDB);

export const AdminRoutes: Router = router;
