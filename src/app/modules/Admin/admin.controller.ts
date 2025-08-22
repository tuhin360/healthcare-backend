import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../../Shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../../Shared/sendResponse";



const getAllFromDB = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]); // Pagination
    console.log("options", options);

    // console.log(req.query);

    const result = await AdminService.getAllFromDB(filters, options);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admins data fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error)?.name || "Failed to fetch admins",
      error: error,
    });
  }
};

const getByIdFromDB = async (req: Request, res: Response) => {
  // console.log(req.params.id);`
  const { id } = req.params;
  try {
    const result = await AdminService.getByIdFromDB(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin fetched by Id successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error)?.name || "Failed to fetch admin by Id",
      error: error,
    });
  }
};

const updateIntoDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  //  console.log(id);
  //  console.log("data", req.body);
  const result = await AdminService.updateIntoDB(id, req.body);
  try {
    await AdminService.updateIntoDB(id, req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin data updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error)?.name || "Failed to update admin",
      error: error,
    });
  }
};

const deleteFromDB = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await AdminService.deleteFromDB(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin data deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error)?.name || "Failed to delete admin by Id",
      error: error,
    });
  }
};

const softDeleteFromDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);

  try {
    const result = await AdminService.softDeleteFromDB(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin data deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error)?.name || "Failed to delete admin by Id",
      error: error,
    });
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
