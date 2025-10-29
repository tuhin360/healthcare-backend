import { Request, Response } from "express";
import catchAsync from "../../../Shared/catchAsync";
import sendResponse from "../../../Shared/sendResponse";
import status from "http-status";
import { scheduleService } from "./schedule.service";

// Create schedules
const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await scheduleService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Schedule created successfully!",
    data: result,
  });
});

export const scheduleController = {
  insertIntoDB,
};
