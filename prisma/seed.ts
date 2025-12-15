import prisma from "../src/Shared/prisma";
import { UserRole } from "../src/generated/prisma";
import bcrypt from "bcrypt";

export const seedSuperAdmin = async () => {
  try {
    const isExistSuperAdmin = await prisma.user.findFirst({
      where: {
        role: UserRole.SUPER_ADMIN,
      },
    });

    if (isExistSuperAdmin) {
      console.log("Super admin already exists!");
      return;
    }

    const hashedPassword = await bcrypt.hash("superadmin", 12);

    const superAdminData = await prisma.user.create({
      data: {
        email: "super@admin.com",
        password: hashedPassword,
        role: UserRole.SUPER_ADMIN,
        admin: {
          create: {
            name: "Super Admin",
            contactNumber: "01234567890",
          },
        },
      },
    });

    console.log("Super Admin Created Successfully!");
  } catch (error) {
    console.error("Super Admin Seed Error:", error);
  }
};
