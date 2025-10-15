import { Request } from "express";
import { fileUploader } from "../../../helpers/fileUploader";
import prisma from "../../../Shared/prisma";

// Insert into DB
const insertIntoDB = async (req: Request) => {
  const file = req.file;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.icon = uploadToCloudinary?.secure_url;
  }

  const result = await prisma.specialties.create({
    data: req.body,
  });
  return result;
};

// Get all data
const getAllFromDB = async (req: Request) => {
  const result = await prisma.specialties.findMany({
    orderBy: { title: "asc" },
  });
  return result;
};

// Delete single data by id
const deleteFromDB = async (id: string) => {
  const result = await prisma.specialties.delete({
    where: { id },
  });
  return result;
};

export const specialtiesService = {
  insertIntoDB,
  getAllFromDB,
  deleteFromDB,
};
