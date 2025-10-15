import { Request, Response } from "express";
import catchAsync from "../../../Shared/catchAsync";
import sendResponse from "../../../Shared/sendResponse";
import status from "http-status";
import { SpecialtiesService } from "./specialties.service";
 

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
 
    const result = await SpecialtiesService.insertIntoDB(req);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Specialties created successfully!",
    data:  result,
  });
});

export const SpecialtiesController = {
  insertIntoDB,
};
