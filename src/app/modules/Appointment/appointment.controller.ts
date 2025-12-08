import { Request, Response } from "express";
import sendResponse from "../../../Shared/sendResponse";
import status from "http-status";
import catchAsync from "../../../Shared/catchAsync";
import { AppointmentService } from "./appointment.service";
import { IAuthUser } from "../../interfaces/common";
import pick from "../../../Shared/pick";
import { appointmentFilterableFields } from "./appointment.constant";

const createAppointment = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;

    const result = await AppointmentService.createAppointment(
      user as IAuthUser,
      req.body
    );

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Appointment booked successfully",
      data: result,
    });
  }
);

const getMyAppointment = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const filters = pick(req.query, ["status", "paymentStatus"]);

    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const result = await AppointmentService.getMyAppointment(
      user as IAuthUser,
      filters,
      options
    );

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "My appointment retrieve successfully",
      data: result,
    });
  }
);

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, appointmentFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await AppointmentService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Appointment retrieval successfully",
    meta: result.meta,
    data: result.data,
  });
});

const changeAppointmentStatus = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const { id } = req.params;
    const { status: appointmentStatus } = req.body;
    const user = req.user;

    const result = await AppointmentService.changeAppointmentStatus(
      id,
      appointmentStatus,
      user
    );

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Appointment status changed successfully",
      data: result,
    });
  }
);

export const AppointmentController = {
  createAppointment,
  getMyAppointment,
  getAllFromDB,
  changeAppointmentStatus,
};
