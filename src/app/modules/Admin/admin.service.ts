import { Admin, Prisma, UserStatus } from "../../../generated/prisma";
import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../Shared/prisma";
import { adminSearchableFields } from "./admin.constant";

const getAllFromDB = async (params: any, options: any) => {
  // Destructure searchTerm and remaining filter data from params
  const { searchTerm, ...filterData } = params;

  // Destructure limit and page from options
  const { page, limit, skip } = paginationHelper.calculatePagination(options);

  // Array for storing all filter conditions
  const andConditions: Prisma.AdminWhereInput[] = [];

  console.log(filterData); // For debugging: shows exact filter inputs

  // 1️⃣ Search by keyword in specific fields (name, email)
  if (searchTerm) {
    andConditions.push({
      OR: adminSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm, // partial match
          mode: "insensitive", // ignore case (uppercase/lowercase)
        },
      })),
    });
  }

  // 2️⃣ Search by exact match in specific fields (from filterData)
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key], // strict match
        },
      })),
    });
  }

  andConditions.push({
    isDeleted: false,
  });

  // 3️⃣ Merge all search and filter conditions
  const whereConditions: Prisma.AdminWhereInput = {
    AND: andConditions,
  };

  // 4️⃣ Fetch data from DB according to the conditions
  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.admin.count({ where: whereConditions });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }; // Return final result
};

const getByIdFromDB = async (id: string) : Promise<Admin | null> => {
  const result = await prisma.admin.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });

  return result;
};

const updateIntoDB = async (id: string, data: Partial<Admin>): Promise<Admin> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  const result = await prisma.admin.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteFromDB = async (id: string): Promise<Admin> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDeletedData = await transactionClient.admin.delete({
      where: {
        id,
      },
    });

    await transactionClient.user.delete({
      where: {
        email: adminDeletedData.email,
      },
    });

    return adminDeletedData;
  });

  return result;
};

const softDeleteFromDB = async (id: string) : Promise<Admin> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDeletedData = await transactionClient.admin.update({
      where: {
        id,
        isDeleted: false,
      },
      data: {
        isDeleted: true,
      },
    });

    await transactionClient.user.update({
      where: {
        email: adminDeletedData.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });

    return adminDeletedData;
  });

  return result;
};

export const AdminService = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
