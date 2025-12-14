import httpStatus from "http-status";
import prisma from "../../../Shared/prisma";
import ApiError from "../../errors/ApiErrors";
import { IAuthUser } from "../../interfaces/common";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { Prisma } from "../../../generated/prisma";

const insertIntoDB = async (user: IAuthUser, payload: any) => {
  const patientData = await prisma.patient.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const appointmentData = await prisma.appointment.findUniqueOrThrow({
    where: {
      id: payload.appointmentId,
    },
  });

  // console.log(patientData, appointmentData);

  if (appointmentData.patientId !== patientData.id) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You are not authorized to review for this appointment"
    );
  }

  return await prisma.$transaction(async (tx) => {
    const result = await tx.review.create({
      data: {
        appointmentId: appointmentData.id,
        doctorId: appointmentData.doctorId,
        patientId: appointmentData.patientId,
        rating: payload.rating,
        comment: payload.comment,
      },
    });

    const averageRating = await tx.review.aggregate({
      _avg: {
        rating: true,
      },
    });

    await tx.doctor.update({
      where: {
        id: result.doctorId,
      },
      data: {
        averageRating: averageRating._avg.rating as number,
      },
    });

    return result;
  });
};

const getAllFromDB = async (
  filters: {
    patientEmail?: string;
    doctorEmail?: string;
  },
  options: IPaginationOptions
) => {
  const { limit, page, skip } =
    paginationHelper.calculatePagination(options);

  const andConditions: Prisma.ReviewWhereInput[] = [];

  if (filters.patientEmail) {
    andConditions.push({
      patient: {
        email: filters.patientEmail,
      },
    });
  }

  if (filters.doctorEmail) {
    andConditions.push({
      doctor: {
        email: filters.doctorEmail,
      },
    });
  }

  const whereConditions: Prisma.ReviewWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const sortBy = options.sortBy ?? 'createdAt';
  const sortOrder = options.sortOrder ?? 'desc';

  const result = await prisma.review.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      doctor: true,
      patient: true,
    },
  });

  const total = await prisma.review.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};


export const ReviewService = {
  insertIntoDB,
  getAllFromDB,
};
