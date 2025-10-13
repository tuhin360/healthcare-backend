import z from "zod";
import { Gender } from "../../../generated/prisma";

const createAdmin = z.object({
  password: z.string().nonempty({ message: "Password is required" }),
  admin: z.object({
    name: z.string().nonempty({ message: "Name is required" }),
    email: z.string().nonempty({ message: "Email is required" }),
    contactNumber: z
      .string()
      .nonempty({ message: "Contact number is required" }),
  }),
});

const createDoctor = z.object({
  password: z.string().nonempty({ message: "Password is required" }),
  doctor: z.object({
    name: z.string().nonempty({ message: "Name is required" }),
    email: z.string().nonempty({ message: "Email is required" }),
    contactNumber: z
      .string()
      .nonempty({ message: "Contact number is required" }),
    address: z.string().optional(),
    registrationNumber: z.string().nonempty({ message: "Registration number is required" }),
    experience: z.number().optional(),
    gender: z.enum([Gender.MALE, Gender.FEMALE]),
    appointmentFee: z.number({
      error: "Appointment fee is required",
    }),
    qualification: z.string({
      error: "Qualification is required",
    }),
    currentWorkingPlace: z.string({
      error: "Current working place is required",
    }),
    designation: z.string({
      error: "Designation is required",
    }),

  }),

});


export const userValidation = {
  createAdmin,
  createDoctor
};