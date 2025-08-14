import { Prisma, PrismaClient } from "../../../generated/prisma";
import { adminSearchableFields } from "./admin.constant";

const prisma = new PrismaClient();

const getAllFromDB = async (params: any, options: any) => {
  // Destructure searchTerm and remaining filter data from params
  const { searchTerm, ...filterData } = params;

  // Destructure limit and page from options
  const { limit, page } = options;

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

  // 3️⃣ Merge all search and filter conditions
  const whereConditions: Prisma.AdminWhereInput = {
    AND: andConditions,
  };

  // 4️⃣ Fetch data from DB according to the conditions
  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip: (Number(page) - 1) * limit, // Pagination
    take: Number(limit), // Pagination
  });

  return result; // Return final result
};

export const AdminService = {
  getAllFromDB,
};
