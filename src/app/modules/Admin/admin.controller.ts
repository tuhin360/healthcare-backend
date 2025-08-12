import { Request, Response } from "express";
import { AdminService } from "./admin.service";

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    console.log(req.query);
    const result = await AdminService.getAllFromDB(req.query);
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
