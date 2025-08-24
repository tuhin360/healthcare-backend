import { Request, Response } from "express";
import catchAsync from "../../../Shared/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../../Shared/sendResponse";
import status from "http-status";
import { access } from "fs";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);

  const { refreshToken } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: false,  // TODO: set secure to true when in production
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      accessToken: result.accessToken,
      needPasswordChange: result.needPasswordChange,
    },
  });
});

export const AuthController = {
  loginUser,
};
