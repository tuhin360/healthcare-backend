import { Request, Response } from "express";
import catchAsync from "../../../Shared/catchAsync";
import sendResponse from "../../../Shared/sendResponse";
import status from "http-status";
import { scheduleService } from "./schedule.service";
import pick from "../../../Shared/pick";
import { IAuthUser } from "../../interfaces/common";

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

const getAllFromDB = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const filters = pick(req.query, ["startDate", "endDate"]);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const user = req.user;
    const result = await scheduleService.getAllFromDB(
      filters,
      options,
      user as IAuthUser
    );

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Schedule fetched successfully!",
      data: result,
    });
  }
);

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await scheduleService.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Schedule retrieval successfully",
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await scheduleService.deleteFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Schedule deleted successfully",
    data: result,
  });
});

export const scheduleController = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  deleteFromDB,
};
