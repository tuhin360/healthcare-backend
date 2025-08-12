// service: handle data process, query

import { PrismaClient, UserRole } from "../../../generated/prisma";

const prisma = new PrismaClient();

const createAdmin = async (data: any) => {
  console.log(data);

  // Prepare user data for creation
  const userData = {
    email: data.admin.email,
    password: data.password,
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
