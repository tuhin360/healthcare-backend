import bcrypt from "bcrypt";
import prisma from "../../../Shared/prisma";
import jwt from "jsonwebtoken";

const loginUser = async (payload: { email: string; password: string }) => {
  // console.log("user logged in", payload);
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  const accessToken = jwt.sign(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefg",
    {
      algorithm: "HS256",
      expiresIn: "15m",
    }
  );
  console.log(accessToken);

  return userData;
};

export const AuthServices = {
  loginUser,
};
