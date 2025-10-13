// controller: handle request, response

import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../../Shared/catchAsync";
import pick from "../../../Shared/pick";
import { userFilterableFields } from "./user.constant";
import sendResponse from "../../../Shared/sendResponse";
import status from "http-status";

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    
  try {
    const result = await userService.createAdmin(req);
    res.status(200).json({
      success: true,
      message: "Admin created successfully",
      data: result,
    });
  } catch (error: any) {
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.name || "Failed to create doctor",
      error: error,
    });
  }
};
const createPatient = async (req: Request, res: Response, next: NextFunction) => {
    
  try {
    const result = await userService.createPatient(req);
    res.status(200).json({
      success: true,
      message: "Patient created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.name || "Failed to create patient",
      error: error,
    });
  }
};

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]); // Pagination
  console.log("options", options);

  const result = await userService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Users data fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await userService.changeProfileStatus(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Users profile status changed successfully",
    data: result,
  });
  
});

export const userController = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllFromDB,
  changeProfileStatus
};
