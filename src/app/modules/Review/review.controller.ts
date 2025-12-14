import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../Shared/catchAsync";
import { IAuthUser } from "../../interfaces/common";
import sendResponse from "../../../Shared/sendResponse";
import { ReviewService } from "./review.service";

const insertIntoDB = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await ReviewService.insertIntoDB(user as IAuthUser, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Review created successfully",
      data: result,
    });
  }
);


export const ReviewController = {
  insertIntoDB,
};