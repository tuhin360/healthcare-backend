import { Request, Response } from "express";
import catchAsync from "../../../Shared/catchAsync";
import sendResponse from "../../../Shared/sendResponse";
import status from "http-status";
import { specialtiesService } from "./specialties.service";

// Create specialties
const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await specialtiesService.insertIntoDB(req);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Specialties created successfully!",
    data: result,
  });
});

// Get all specialties
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await specialtiesService.getAllFromDB(req);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Specialties fetched successfully!",
    data: result,
  });
});

// Delete single specialties by id
const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await specialtiesService.deleteFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Specialties deleted successfully!",
    data: result,
  });
});

export const specialtiesController = {
  insertIntoDB,
  getAllFromDB,
  deleteFromDB,
};
