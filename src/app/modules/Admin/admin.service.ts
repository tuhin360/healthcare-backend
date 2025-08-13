import { Prisma, PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

const getAllFromDB = async (params: any) => {
  console.log({ params });
  const andConditions: Prisma.AdminWhereInput[] = [];

  //1. If a search term is given
  const adminSearchableFields = ["name", "email"];
  if (params.searchTerm) {
    andConditions.push({
      OR: adminSearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  // 2. Adding all the conditions together
  const whereConditions: Prisma.AdminWhereInput = {
    AND: andConditions,
  };

  // 3. Fetch data from database
  const result = await prisma.admin.findMany({
    where: whereConditions,
  });
  return result;
};

export const AdminService = {
  getAllFromDB,
};
