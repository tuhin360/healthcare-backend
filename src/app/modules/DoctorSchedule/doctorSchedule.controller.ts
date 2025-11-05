import { Request, Response } from "express";
import catchAsync from "../../../Shared/catchAsync";
import sendResponse from "../../../Shared/sendResponse";
import status from "http-status";
import { DoctorScheduleService } from "./doctorSchedule.service";
import { IAuthUser } from "../../interfaces/common";
import pick from "../../../Shared/pick";

// Create doctor schedules
const insertIntoDB = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;

    const result = await DoctorScheduleService.insertIntoDB(user, req.body);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Doctor schedule created successfully!",
      data: result,
    });
  }
);

const getMySchedule = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const filters = pick(req.query, ["startDate", "endDate", "isBooked"]);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const user = req.user;
    const result = await DoctorScheduleService.getMySchedule(
      filters,
      options,
      user as IAuthUser
    );

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "My Schedule fetched successfully!",
      data: result,
    });
  }
);

export const DoctorScheduleController = {
  insertIntoDB,
  getMySchedule,
};
