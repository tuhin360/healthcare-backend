import { Admin } from './../../../generated/prisma/index.d';
import { get } from "http";
import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();
const getAllFromDB = async (data: any) => {
  const result = await prisma.admin.findMany();
  return result;
};

export const AdminService = {
  getAllFromDB,
};
