// service: handle data process, query

import { PrismaClient, UserRole } from "../../../generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const createAdmin = async (data: any) => {
  console.log(data);

  // Hash password
  const hashedPassword: string = await bcrypt.hash(data.password, 10);
  // console.log(hashedPassword);

  // Prepare user data for creation
  const userData = {
    email: data.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  // Create user and admin in a single transaction
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdAdminData = await transactionClient.admin.create({
      data: data.admin,
    });

    return createdAdminData; // Return admin record
  });

  return result;
};

export const userService = {
  createAdmin,
};
