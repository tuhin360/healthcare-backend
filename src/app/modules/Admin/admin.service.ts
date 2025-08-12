import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

const getAllFromDB = async (params: any) => {
  console.log({ params });
  const result = await prisma.admin.findMany({
    where: {
      OR: [
        {
          name: {
            contains: params.searchTerm,
            mode: "insensitive", // বড়হাতের বা ছোটহাতের অক্ষরে পার্থক্য করবে না সার্চ করার জন্য।
          },
        },
        {
          email: {
            contains: params.searchTerm,
            mode: "insensitive",
          },
        },
      ],
    },
  });
  return result;
};

export const AdminService = {
  getAllFromDB,
};
