import z from "zod";

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


export const userValidation = {
  createAdmin,
};