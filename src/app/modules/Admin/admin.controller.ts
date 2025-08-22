import { NextFunction, Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../../Shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../../Shared/sendResponse";
import status from "http-status";

const getAllFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

const getByIdFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(req.params.id);`
  const { id } = req.params;
  try {
    const result = await AdminService.getByIdFromDB(id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin fetched by Id successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateIntoDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const result = await AdminService.updateIntoDB(id, req.body); // only once

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin data updated successfully",
      data: result,
    });
  } catch (error) {
    next(error); // pass to global error handler
  }
};


const deleteFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const result = await AdminService.deleteFromDB(id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin data deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const softDeleteFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  console.log(id);

  try {
    const result = await AdminService.softDeleteFromDB(id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin data deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Export controller so it can be used in routes
export const AdminController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
