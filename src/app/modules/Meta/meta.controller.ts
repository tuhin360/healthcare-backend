import { Request, Response } from "express";
import catchAsync from "../../../Shared/catchAsync";
import { MetaService } from "./meta.service";
import { IAuthUser } from "../../interfaces/common";
import httpStatus from "http-status";
import sendResponse from "../../../Shared/sendResponse";

const fetchDashboardMetaData = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await MetaService.fetchDashboardMetaData(user as IAuthUser);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Meta data retrieval successfully!",
      data: result,
    });
  }
);

export const MetaController = {
  fetchDashboardMetaData,
};
