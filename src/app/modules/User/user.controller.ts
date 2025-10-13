// controller: handle request, response

import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    
  try {
    const result = await userService.createAdmin(req);
    res.status(200).json({
      success: true,
      message: "Admin created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.name || "Failed to create admin",
      error: error,
    });
  }
};

const createDoctor = async (req: Request, res: Response, next: NextFunction) => {
    
  try {
    const result = await userService.createDoctor(req);
    res.status(200).json({
      success: true,
      message: "Doctor created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.name || "Failed to create doctor",
      error: error,
    });
  }
};

export const userController = {
  createAdmin,
  createDoctor
};
