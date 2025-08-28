// service: handle data process, query

import { UserRole } from "../../../generated/prisma";
import bcrypt from "bcrypt";
import prisma from "../../../Shared/prisma";
import { fileUploader } from "../../../helpers/fileUploader";

const createAdmin = async (req: any) => {
  //  console.log("file",req.file);
  //   console.log("data",req.body.data);

    const file = req.file;
    // console.log(req.body);

    if(file){
      const uploadToCloudinary = await fileUploader.uploadToCloudinary(file) as { secure_url?: string };
      // console.log("Upload to cloudinary",uploadToCloudinary);
      req.body.admin.profilePhoto = uploadToCloudinary?.secure_url ;
      console.log(req.body);
    }

  // Hash password
  const hashedPassword: string = await bcrypt.hash(req.body.password, 10);
  // console.log(hashedPassword);

  // Prepare user data for creation
  const userData = {
    email: req.body.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  // Create user and admin in a single transaction
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdAdminData = await transactionClient.admin.create({
      data: req.body.admin,
    });

    return createdAdminData; // Return admin record
  });

  return result;
};

export const userService = {
  createAdmin,
};
