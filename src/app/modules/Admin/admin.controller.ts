import { Request, Response } from "express";
import { AdminService } from "./admin.service";

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    const result = await AdminService.getAllFromDB(req.body);
    res.status(200).json({
      success: true,
      message: "Admins fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.name || "Failed to fetch admins",
      error: error,
    });
  }
};

export const AdminController = {
  getAllFromDB,
};
