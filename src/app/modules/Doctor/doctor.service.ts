import prisma from "../../../Shared/prisma";

const updateIntoDB = async (id: string, payload: any) => {
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: { id },
  });

  const updatedDoctorData = await prisma.doctor.update({
    where: { id },
    data: payload,
    include: {
        doctorSpecialties: true,
    }
  });
  return updatedDoctorData;
};

export const DoctorService = {
  updateIntoDB,
};
