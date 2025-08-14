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
      message: "Admins fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error)?.name || "Failed to fetch admins",
      error: error,
    });
  }
};

// Export controller so it can be used in routes
export const AdminController = {
  getAllFromDB,
};
