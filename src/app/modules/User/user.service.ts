// service: handle data process, query

import {
  Admin,
  Doctor,
  Patient,
  Prisma,
  UserRole,
  UserStatus,
} from "../../../generated/prisma";
import bcrypt from "bcrypt";
import prisma from "../../../Shared/prisma";
import { fileUploader } from "../../../helpers/fileUploader";
import { IFile } from "../../interfaces/file";
import e, { Request } from "express";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { userSearchableFields } from "./user.constant";

const createAdmin = async (req: Request): Promise<Admin> => {
  const file = req.file as IFile;

  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.admin.profilePhoto = uploadToCloudinary?.secure_url;
  }

  // Hash password
  const hashedPassword: string = await bcrypt.hash(req.body.password, 10);

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

const createDoctor = async (req: Request): Promise<Doctor> => {
  const file = req.file as IFile;

  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.doctor.profilePhoto = uploadToCloudinary?.secure_url;
  }

  // Hash password
  const hashedPassword: string = await bcrypt.hash(req.body.password, 10);

  // Prepare user data for creation
  const userData = {
    email: req.body.doctor.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };

  // Create user and doctor in a single transaction
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdDoctorData = await transactionClient.doctor.create({
      data: req.body.doctor,
    });

    return createdDoctorData; // Return doctor record
  });

  return result;
};

const createPatient = async (req: Request): Promise<Patient> => {
  const file = req.file as IFile;

  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.patient.profilePhoto = uploadToCloudinary?.secure_url;
  }

  // Hash password
  const hashedPassword: string = await bcrypt.hash(req.body.password, 10);

  // Prepare user data for creation
  const userData = {
    email: req.body.patient.email,
    password: hashedPassword,
    role: UserRole.PATIENT,
  };

  // Create user and patient in a single transaction
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdPatientData = await transactionClient.patient.create({
      data: req.body.patient,
    });

    return createdPatientData; // Return patient record
  });

  return result;
};

const getAllFromDB = async (params: any, options: IPaginationOptions) => {
  console.log(options);
  // Destructure searchTerm and remaining filter data from params
  const { searchTerm, ...filterData } = params;

  // Destructure limit, skip and page from options
  const { page, limit, skip } = paginationHelper.calculatePagination(
    options as any
  );

  // Array for storing all filter conditions
  const andConditions: Prisma.UserWhereInput[] = [];

  console.log(filterData); // For debugging: shows exact filter inputs

  // 1️⃣ Search by keyword in specific fields (name, email)
  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map((field) => ({
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
  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // 4️⃣ Fetch data from DB according to the conditions
  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: "desc",
          },
    select: {
      id: true,
      email: true,
      role: true,
      needPasswordChange: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      admin: true,
      doctor: true,
      patient: true,
    },
  });

  const total = await prisma.user.count({ where: whereConditions });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }; // Return final result
};

const changeProfileStatus = async (id: string, status: UserStatus) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: { id },
  });

  const updateUserStatus = await prisma.user.update({
    where: { id },
    data: status,
  });

  return updateUserStatus;
};

const getMyProfile = async (user) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
    select: {
      id: true,
      email: true,
      needPasswordChange: true,
      role: true,
      status: true,
    },
  });

  let profileInfo;
  if (userInfo.role === UserRole.SUPER_ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: { email: userInfo.email },
    });
  } else if (userInfo.role === UserRole.ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: { email: userInfo.email },
    });
  } else if (userInfo.role === UserRole.DOCTOR) {
    profileInfo = await prisma.doctor.findUnique({
      where: { email: userInfo.email },
    });
  } else if (userInfo.role === UserRole.PATIENT) {
    profileInfo = await prisma.patient.findUnique({
      where: { email: userInfo.email },
    });
  }

  return { ...userInfo, ...profileInfo };
};

export const userService = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllFromDB,
  changeProfileStatus,
  getMyProfile,
};
