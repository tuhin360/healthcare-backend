import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../../Shared/pick";
import { adminFilterableFields } from "./admin.constant";

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]); // Pagination
    console.log("options", options);

    // console.log(req.query);

    const result = await AdminService.getAllFromDB(filters, options);

    res.status(200).json({
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
    res.status(200).json({
      success: true,
      message: "Admin data fetched by Id successfully",
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

const updateIntoDB = async(req: Request, res: Response)=> {
   const { id } = req.params;
  //  console.log(id);
  //  console.log("data", req.body);
  try {
    await AdminService.updateIntoDB(id, req.body);
    res.status(200).json({
      success: true,
      message: "Admin data updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error)?.name || "Failed to update admin",
      error: error,
    });
  }
}

// Export controller so it can be used in routes
export const AdminController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
};
