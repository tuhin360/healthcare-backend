import { z } from "zod";

const create = z.object({
  body: z.object({
    email: z.string().nonempty("Email is required"),
    name: z.string().nonempty("Name is required"),
    profilePhoto: z.string().nonempty("Profile Photo is required"),
    contactNumber: z.string().nonempty("Contact Number is required"),
    registrationNumber: z.string().nonempty("Registration Number is required"),
    experience: z
      .number()
      .refine((val) => val !== undefined && val !== null, {
        message: "Experience is required",
      }),
    gender: z.string().nonempty("Gender is required"),
    appointmentFee: z
      .number()
      .refine((val) => val !== undefined && val !== null, {
        message: "Appointment Fee is required",
      }),
    qualification: z.string().nonempty("Qualification is required"),
    currentWorkingPlace: z
      .string()
      .nonempty("Current Working Place is required"),
    designation: z.string().nonempty("Designation is required"),
  }),
});

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    profilePhoto: z.string().optional(),
    contactNumber: z.string().optional(),
    registrationNumber: z.string().optional(),
    experience: z.number().optional(),
    gender: z.string().optional(),
    appointmentFee: z.number().optional(),
    qualification: z.string().optional(),
    currentWorkingPlace: z.string().optional(),
    designation: z.string().optional(),
  }),
});

export const DoctorValidation = {
  create,
  update,
};
