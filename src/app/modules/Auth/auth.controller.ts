import { Request, Response } from "express";
import catchAsync from "../../../Shared/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../../Shared/sendResponse";
import status from "http-status";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

export const AuthController = {
  loginUser,
};
