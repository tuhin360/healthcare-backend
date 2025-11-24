import { Request, Response } from "express";
import sendResponse from "../../../Shared/sendResponse";
import status from "http-status";
import catchAsync from "../../../Shared/catchAsync";
import { AppointmentService } from "./appointment.service";
import { IAuthUser } from "../../interfaces/common";

const createAppointment = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;

    const result = await AppointmentService.createAppointment(
      user as IAuthUser, req.body
    );

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Appointment booked successfully",
      data: result,
    });
  }
);

export const AppointmentController = {
  createAppointment,
};
