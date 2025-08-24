import bcrypt from "bcrypt";
import prisma from "../../../Shared/prisma";
import jwt from "jsonwebtoken";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

const loginUser = async (payload: { email: string; password: string }) => {
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

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwt.verify(token, "abcdefghijklmn");
    console.log(decodedData);
  } catch (error) {
    throw new Error("You are not authorized");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData?.email,
    },
  });

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefgh",
    "5m"
  );
  return {
    accessToken,

    needPasswordChange: userData.needPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
  refreshToken,
};
