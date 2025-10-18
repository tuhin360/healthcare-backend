import {Request, RequestHandler, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../../Shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../../Shared/sendResponse";
import status from "http-status";
import catchAsync from "../../../Shared/catchAsync";


const getAllFromDB: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]); // Pagination
  console.log("options", options);

  const result = await AdminService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admins data fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin fetched by Id successfully",
    data: result,
  });
};

const updateIntoDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.updateIntoDB(id, req.body); // only once
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin data updated successfully",
    data: result,
  });
};

const deleteFromDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.deleteFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin data deleted successfully",
    data: result,
  });
};

const softDeleteFromDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  const result = await AdminService.softDeleteFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin data deleted successfully",
    data: result,
  });
};

export const AdminController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
