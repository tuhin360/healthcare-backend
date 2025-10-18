import prisma from "../../../Shared/prisma";

const updateIntoDB = async (id: string, payload: any) => {
  const { specialties, ...doctorData } = payload;
  console.log("Specialties:", specialties);
  console.log("Doctor Data:", doctorData);

  const doctorInfo = await prisma.doctor.findUniqueOrThrow({
    where: { id },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const updatedDoctorData = await transactionClient.doctor.update({
      where: { id },
      data: doctorData,
      include: {
        doctorSpecialties: true,
      },
    });

    for (const specialtyId of specialties) {
      const createDoctorSpecialties =
        await transactionClient.doctorSpecialties.create({
          data: {
            doctorId: doctorInfo.id,
            specialtiesId: specialtyId,
          },
        });
    }
    return updatedDoctorData;
  });

  return result;
};

export const DoctorService = {
  updateIntoDB,
};
