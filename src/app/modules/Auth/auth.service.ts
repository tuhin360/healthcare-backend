import bcrypt from "bcrypt";
import prisma from "../../../Shared/prisma";
import jwt from "jsonwebtoken";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

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

  if (!isCorrectPassword) throw new Error("Invalid password");

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefgh",
    "5m"
  );

  //   console.log(accessToken);

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefghijklmn",
    "30d"
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
};
