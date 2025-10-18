import { Request, Response } from "express";
import catchAsync from "../../../Shared/catchAsync";
import sendResponse from "../../../Shared/sendResponse";
import status from "http-status";
import { DoctorService } from "./doctor.service";

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DoctorService.updateIntoDB(id as string, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Doctor data updated successfully",
    data: result,
  });
});

export const DoctorController = {
  updateIntoDB,
};
